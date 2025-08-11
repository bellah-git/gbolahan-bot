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
const pino = require('pino');

const COMMANDS_DIR = path.join(__dirname, 'commands');
const AUTH_DIR = path.join(__dirname, 'auth_info');

const prefix = '.';
let isPublic = true; // "anyone" = public by default
const ownerNumber = process.env.OWNER_NUMBER || '2349038158275@s.whatsapp.net';
const PORT = process.env.PORT || 3000;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// ensure commands dir exists
if (!fs.existsSync(COMMANDS_DIR)) fs.mkdirSync(COMMANDS_DIR, { recursive: true });

// restore creds.json if SESSION_ID provided (base64 of creds.json)
function restoreCredsFromEnv() {
  if (!process.env.SESSION_ID) return false;
  try {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
    const decoded = Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8');
    fs.writeFileSync(path.join(AUTH_DIR, 'creds.json'), decoded, 'utf-8');
    logger.info('Restored auth_info/creds.json from SESSION_ID env var');
    return true;
  } catch (e) {
    logger.error('Failed to restore creds from SESSION_ID:', e);
    return false;
  }
}

// dynamic command loader (supports run OR execute)
const commands = new Map();
function loadCommands() {
  commands.clear();
  if (!fs.existsSync(COMMANDS_DIR)) return;
  const files = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const full = path.join(COMMANDS_DIR, file);
    try {
      delete require.cache[require.resolve(full)];
      const mod = require(full);
      const name = mod.name || path.basename(file, '.js');
      const fn = typeof mod.execute === 'function' ? mod.execute : (typeof mod.run === 'function' ? mod.run : null);
      if (!fn) {
        logger.warn(`Skipping ${file}: no execute/run function`);
        continue;
      }
      commands.set(name.toLowerCase(), { name, description: mod.description || '', handler: fn });
      logger.info(`Loaded command: ${name}`);
    } catch (e) {
      logger.error(`Failed to load command ${file}:`, e);
    }
  }
  logger.info(`Total commands loaded: ${commands.size}`);
}

// builds .menu text automatically
function buildMenuText() {
  const list = [];
  for (const c of commands.values()) {
    list.push(`${prefix}${c.name}${c.description ? ' — ' + c.description : ''}`);
  }
  return `Commands (${commands.size}):\n\n` + list.join('\n');
}

async function startBot() {
  try {
    restoreCredsFromEnv();
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();
    logger.info('Using WA version: %s', version.join('.'));

    loadCommands();

    const sock = makeWASocket({
      version,
      printQRInTerminal: !process.env.SESSION_ID,
      auth: state,
      logger: pino({ level: 'silent' })
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error).output?.statusCode;
        logger.warn('Connection closed. Reason: %s', reason);
        if (reason !== DisconnectReason.loggedOut) {
          logger.info('Reconnecting in 2s...');
          setTimeout(startBot, 2000);
        } else {
          logger.error('Logged out. Remove auth_info and re-authenticate if needed.');
        }
      } else if (connection === 'open') {
        logger.info('✅ Bot connected');
      }
    });

    // messages handler
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      const m = messages?.[0];
      if (!m || !m.message) return;
      if (m.key && m.key.remoteJid === 'status@broadcast') return;

      const from = m.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const sender = isGroup ? m.key.participant : m.key.remoteJid;
      const isOwner = sender === ownerNumber;

      // extract text from common types
      const msgType = Object.keys(m.message)[0];
      let text = '';
      if (msgType === 'conversation') text = m.message.conversation || '';
      else if (msgType === 'extendedTextMessage') text = m.message.extendedTextMessage?.text || '';
      else if (msgType === 'imageMessage') text = m.message.imageMessage?.caption || '';
      else if (msgType === 'videoMessage') text = m.message.videoMessage?.caption || '';
      else if (msgType === 'buttonsResponseMessage') text = m.message.buttonsResponseMessage?.selectedButtonId || '';
      else if (msgType === 'listResponseMessage') text = m.message.listResponseMessage?.singleSelectReply?.selectedRowId || '';

      if (!text) return;
      if (!text.startsWith(prefix)) return;

      const args = text.slice(prefix.length).trim().split(/\s+/);
      const cmdName = (args.shift() || '').toLowerCase();

      // built-in actions
      if (cmdName === 'menu') {
        return sock.sendMessage(from, { text: buildMenuText() }, { quoted: m });
      }
      if (cmdName === 'reloadcmds' && isOwner) {
        loadCommands();
        return sock.sendMessage(from, { text: `Reloaded commands (${commands.size})` }, { quoted: m });
      }
      if (cmdName === 'setmode' && isOwner) {
        const mode = (args[0] || '').toLowerCase();
        if (mode === 'private') {
          isPublic = false;
          return sock.sendMessage(from, { text: 'Bot set to PRIVATE (owner only).' }, { quoted: m });
        } else if (mode === 'public') {
          isPublic = true;
          return sock.sendMessage(from, { text: 'Bot set to PUBLIC (everyone).' }, { quoted: m });
        } else {
          return sock.sendMessage(from, { text: 'Usage: .setmode public|private' }, { quoted: m });
        }
      }

      // respect private mode
      if (!isPublic && !isOwner) return;

      const cmd = commands.get(cmdName);
      if (!cmd) return; // unknown command

      try {
        // handler signature: handler(sock, msg, args, context)
        await cmd.handler(sock, m, args, { from, sender, isGroup, isOwner });
      } catch (e) {
        logger.error(`Error executing ${cmdName}:`, e);
        try { await sock.sendMessage(from, { text: '❌ Error executing command.' }, { quoted: m }); } catch {}
      }
    });

  } catch (err) {
    logger.error('startBot error:', err);
    setTimeout(startBot, 5000);
  }
}

// Express keep alive server
const app = express();
app.get('/', (req, res) => res.send('gbolahan-bot running'));
app.listen(PORT, () => {
  logger.info(`HTTP server listening on ${PORT}`);
  startBot();
});
