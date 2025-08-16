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
const pino = require('pino');

const COMMANDS_DIR = path.join(__dirname, 'commands');
const AUTH_DIR = path.join(__dirname, 'auth_info');
const prefix = '.';
let isPublic = true;
const ownerNumber = process.env.OWNER_NUMBER || '2349038158275@s.whatsapp.net';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// Restore creds.json from env if exists
function restoreCredsFromEnv() {
  if (!process.env.SESSION_ID) return false;
  try {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
    const decoded = Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8');
    fs.writeFileSync(path.join(AUTH_DIR, 'creds.json'), decoded, 'utf-8');
    logger.info('Restored creds.json from SESSION_ID');
    return true;
  } catch (e) {
    logger.error('Failed to restore creds:', e);
    return false;
  }
}

// Command map
const commands = new Map();
function loadCommands() {
  commands.clear();
  if (!fs.existsSync(COMMANDS_DIR)) return;
  const files = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const fullPath = path.join(COMMANDS_DIR, file);
    try {
      delete require.cache[require.resolve(fullPath)];
      const mod = require(fullPath);
      const name = mod.name || path.basename(file, '.js');
      const fn = mod.execute || mod.run;
      if (!fn) continue;
      commands.set(name.toLowerCase(), {
        name,
        description: mod.description || '',
        handler: fn
      });
      logger.info(`Loaded: ${name}`);
    } catch (e) {
      logger.error(`Failed to load ${file}:`, e);
    }
  }
}

function buildMenuText() {
  const list = [];
  for (const cmd of commands.values()) {
    list.push(`${prefix}${cmd.name}${cmd.description ? ' — ' + cmd.description : ''}`);
  }
  return `Commands (${commands.size}):\n\n` + list.join('\n');
}

async function startBot() {
  try {
    restoreCredsFromEnv();
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();

    loadCommands();

    const sock = makeWASocket({
      version,
      printQRInTerminal: !process.env.SESSION_ID,
      auth: state,
      logger: pino({ level: 'silent' }),
    });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error).output?.statusCode;
        if (reason !== DisconnectReason.loggedOut) {
          setTimeout(startBot, 2000);
        } else {
          logger.error('Logged out. Delete auth_info and scan again.');
        }
      } else if (connection === 'open') {
        logger.info('✅ Bot connected');
      }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
      const m = messages?.[0];
      if (!m?.message) return;
      if (m.key.remoteJid === 'status@broadcast') return;

      const from = m.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const sender = isGroup ? m.key.participant : from;
      const isOwner = sender === ownerNumber;

      // Extract text
      const msgType = Object.keys(m.message)[0];
      let text = '';
      if (msgType === 'conversation') text = m.message.conversation;
      else if (msgType === 'extendedTextMessage') text = m.message.extendedTextMessage?.text;
      else if (msgType === 'imageMessage') text = m.message.imageMessage?.caption;
      else if (msgType === 'videoMessage') text = m.message.videoMessage?.caption;
      else if (msgType === 'buttonsResponseMessage') text = m.message.buttonsResponseMessage?.selectedButtonId;
      else if (msgType === 'listResponseMessage') text = m.message.listResponseMessage?.singleSelectReply?.selectedRowId;

      if (!text?.startsWith(prefix)) return;

      const args = text.slice(prefix.length).trim().split(/\s+/);
      const cmdName = (args.shift() || '').toLowerCase();

      // 🔹 Built-in commands
      if (cmdName === 'menu') {
        return sock.sendMessage(from, { text: buildMenuText() }, { quoted: m });
      }
      if (cmdName === 'reloadcmds' && isOwner) {
        loadCommands();
        return sock.sendMessage(from, { text: `Reloaded (${commands.size}) commands` }, { quoted: m });
      }
      if (cmdName === 'setmode' && isOwner) {
        const mode = (args[0] || '').toLowerCase();
        if (mode === 'private') {
          isPublic = false;
          return sock.sendMessage(from, { text: '✅ Bot set to PRIVATE (owner only)' }, { quoted: m });
        }
        if (mode === 'public') {
          isPublic = true;
          return sock.sendMessage(from, { text: '🌍 Bot set to PUBLIC (everyone)' }, { quoted: m });
        }
        return sock.sendMessage(from, { text: 'Usage: .setmode public|private' }, { quoted: m });
      }

      // respect mode
      if (!isPublic && !isOwner) return;

      // find command
      const cmd = commands.get(cmdName);
      if (!cmd) return;

      try {
        // group info + admin checks
        let groupMetadata = {};
        let isBotAdmin = false, isSenderAdmin = false;
        if (isGroup) {
          groupMetadata = await sock.groupMetadata(from);
          const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
          isBotAdmin = admins.includes(sock.user.id);
          isSenderAdmin = admins.includes(sender);
        }

        await cmd.handler(sock, m, args, { from, isGroup, sender, isOwner, isPublic, isBotAdmin, isSenderAdmin, commands });
      } catch (err) {
        logger.error(`Error in ${cmdName}:`, err);
        await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: m });
      }
    });
  } catch (err) {
    logger.error('startBot error:', err);
    setTimeout(startBot, 5000);
  }
}

startBot();
