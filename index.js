// index.js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const express = require('express');

const COMMANDS_DIR = path.join(__dirname, 'commands');
const AUTH_DIR = path.join(__dirname, 'auth_info'); // multi-file auth folder

// Bot config
const prefix = '.';
let isPublic = true;
const ownerNumber = process.env.OWNER_NUMBER || '2349038158275@s.whatsapp.net'; // change or set env
const proactiveTarget = process.env.PROACTIVE_TARGET || null; // optional jid to message on connect
const PORT = process.env.PORT || 3000;

// ensure commands dir exists
if (!fs.existsSync(COMMANDS_DIR)) fs.mkdirSync(COMMANDS_DIR, { recursive: true });

// restore creds from SESSION_ID env var (base64 of creds.json)
function restoreCredsFromEnv() {
  if (!process.env.SESSION_ID) return false;
  try {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
    // We assume SESSION_ID contains the JSON content for creds.json, encoded in base64
    const decoded = Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8');
    // write as creds.json (Baileys' useMultiFileAuthState stores files in auth_info)
    fs.writeFileSync(path.join(AUTH_DIR, 'creds.json'), decoded, { encoding: 'utf-8' });
    console.log('Restored auth_info/creds.json from SESSION_ID env var');
    return true;
  } catch (err) {
    console.error('Failed to restore creds from SESSION_ID:', err);
    return false;
  }
}

// Load commands dynamically into a Map
const commands = new Map();
function loadCommands() {
  commands.clear();
  if (!fs.existsSync(COMMANDS_DIR)) return;
  const files = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const filePath = path.join(COMMANDS_DIR, file);
    try {
      delete require.cache[require.resolve(filePath)]; // ensure fresh load
      const cmd = require(filePath);
      if (!cmd || !cmd.name || typeof cmd.execute !== 'function') {
        console.warn(`Skipping invalid command file: ${file} (must export { name, description, execute })`);
        continue;
      }
      commands.set(cmd.name, cmd);
    } catch (e) {
      console.error('Failed to load command', file, e);
    }
  }
  console.log(`Loaded ${commands.size} commands.`);
}

// helper to build menu text
function buildMenuText() {
  const list = [];
  for (const cmd of commands.values()) {
    const desc = cmd.description ? ` — ${cmd.description}` : '';
    list.push(`${prefix}${cmd.name}${desc}`);
  }
  return `Commands (${commands.size}):\n\n` + list.join('\n');
}

// main bot starter
async function startBot() {
  try {
    // restore creds if env provided
    restoreCredsFromEnv();

    // use multi-file auth state
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    // fetch latest WA version
    const { version } = await fetchLatestBaileysVersion();
    console.log('Using WA version:', version.join('.'));

    // load commands once at start (you can call loadCommands() again to reload at runtime)
    loadCommands();

    const sock = makeWASocket({
      version,
      printQRInTerminal: !process.env.SESSION_ID, // only show QR when SESSION_ID not provided
      auth: state,
      getMessage: async (key) => {
        // fallback if a message fetch is needed
        return { conversation: '...' };
      }
    });

    // persist creds
    sock.ev.on('creds.update', saveCreds);

    // connection updates with reconnect logic
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error).output?.statusCode;
        console.warn('Connection closed. Reason:', reason);
        if (reason !== DisconnectReason.loggedOut) {
          console.log('Reconnecting in 2s...');
          setTimeout(startBot, 2000);
        } else {
          console.error('Logged out. Remove auth_info and re-authenticate manually if needed.');
        }
      } else if (connection === 'open') {
        console.log('✅ Bot connected');

        // Optionally send a proactive message once connected
        if (proactiveTarget) {
          try {
            await sock.sendMessage(proactiveTarget, { text: 'Bot is online ✅' });
            console.log('Proactive message sent to', proactiveTarget);
          } catch (e) {
            console.warn('Failed to send proactive message:', e?.message || e);
          }
        }
      }
    });

    // messages handler
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      // type can be 'notify' etc.
      const m = messages?.[0];
      if (!m || !m.message) return;
      if (m.key && m.key.remoteJid === 'status@broadcast') return; // ignore status

      // parse text content from common message types
      const msgType = Object.keys(m.message)[0];
      let text = '';
      if (msgType === 'conversation') text = m.message.conversation;
      else if (msgType === 'extendedTextMessage') text = m.message.extendedTextMessage?.text || '';
      else if (msgType === 'imageMessage') text = m.message.imageMessage?.caption || '';
      else if (msgType === 'videoMessage') text = m.message.videoMessage?.caption || '';
      else if (msgType === 'buttonsResponseMessage') text = m.message.buttonsResponseMessage?.selectedButtonId || '';
      else if (msgType === 'listResponseMessage') text = m.message.listResponseMessage?.singleSelectReply?.selectedRowId || '';
      else text = ''; // customize if you support other types

      if (!text) return;
      if (!text.startsWith(prefix)) return;

      // parse command and args
      const args = text.slice(prefix.length).trim().split(/\s+/);
      const cmdName = (args.shift() || '').toLowerCase();

      // handle dynamic reload command (owner only)
      const isGroup = (m.key.remoteJid || '').endsWith('@g.us');
      const sender = isGroup ? m.key.participant : m.key.remoteJid;
      const isOwner = sender === ownerNumber;

      if (cmdName === 'reloadcmds') {
        if (!isOwner) {
          return sock.sendMessage(m.key.remoteJid, { text: 'Only owner can reload commands.' }, { quoted: m });
        }
        loadCommands();
        return sock.sendMessage(m.key.remoteJid, { text: `Reloaded commands: ${commands.size}` }, { quoted: m });
      }

      // handle dynamic menu
      if (cmdName === 'menu') {
        const menu = buildMenuText();
        return sock.sendMessage(m.key.remoteJid, { text: menu }, { quoted: m });
      }

      // handle setmode
      if (cmdName === 'setmode') {
        if (!isOwner) return sock.sendMessage(m.key.remoteJid, { text: 'Only owner can change mode.' }, { quoted: m });
        const mode = args[0];
        if (mode === 'private') {
          isPublic = false;
          return sock.sendMessage(m.key.remoteJid, { text: 'Bot set to private (owner only).' }, { quoted: m });
        } else if (mode === 'public') {
          isPublic = true;
          return sock.sendMessage(m.key.remoteJid, { text: 'Bot set to public (everyone).' }, { quoted: m });
        } else {
          return sock.sendMessage(m.key.remoteJid, { text: 'Usage: .setmode public|private' }, { quoted: m });
        }
      }

      // block commands if private and caller not owner
      if (!isPublic && !isOwner) r


