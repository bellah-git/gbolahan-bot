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

// ======== BOT SETTINGS ========
const commands = new Map();
const prefix = '.';
let isPublic = true;
const ownerNumber = '2349038158275@s.whatsapp.net'; // change if needed

// ======== LOAD COMMANDS (modular files in ./commands) ========
if (!fs.existsSync('./commands')) fs.mkdirSync('./commands', { recursive: true });
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  try {
    const command = require(path.join(__dirname, 'commands', file));
    if (command && command.name) commands.set(command.name, command);
    else console.warn('Skipping invalid command file:', file);
  } catch (e) {
    console.error('Failed to load command', file, e);
  }
}

// ======== HELPER: write creds.json from env SESSION_ID (base64) ========
function restoreCredsFromEnv() {
  if (!process.env.SESSION_ID) return false;
  try {
    fs.mkdirSync('./auth_info', { recursive: true });
    const decoded = Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8');
    // write to creds.json — Baileys will use this
    fs.writeFileSync('./auth_info/creds.json', decoded);
    console.log('Restored auth_info/creds.json from SESSION_ID env var');
    return true;
  } catch (e) {
    console.error('Failed to restore creds from SESSION_ID:', e);
    return false;
  }
}

// ======== START BOT ========
async function startBot() {
  try {
    // if provided in env, write creds.json before loading auth state
    restoreCredsFromEnv();

    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    const { version } = await fetchLatestBaileysVersion();
    console.log('Using WA version:', version.join('.'));

    const sock = makeWASocket({
      version,
      printQRInTerminal: !process.env.SESSION_ID,
      auth: state,
      getMessage: async () => ({ conversation: 'hello' })
    });

    // persist credentials
    sock.ev.on('creds.update', saveCreds);

    // connection updates
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error).output?.statusCode;
        console.warn('Connection closed. Reason:', reason);
        if (reason !== DisconnectReason.loggedOut) {
          console.log('Reconnecting...');
          setTimeout(startBot, 2000);
        } else {
          console.error('Logged out. Remove auth_info and re-authenticate manually.');
        }
      } else if (connection === 'open') {
        console.log('✅ Bot connected');
      }
    });

    // message handler
    sock.ev.on('messages.upsert', async ({ messages }) => {
      const msg = messages?.[0];
      if (!msg?.message) return;
      if (msg.key && msg.key.remoteJid === 'status@broadcast') return;

      const from = msg.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const sender = isGroup ? msg.key.participant : msg.key.remoteJid;

      // parse text body
      const type = Object.keys(msg.message)[0];
      const body = (type === 'conversation')
        ? msg.message.conversation
        : (type === 'extendedTextMessage')
          ? msg.message.extendedTextMessage.text
          : (type === 'imageMessage' && msg.message.imageMessage.caption)
            ? msg.message.imageMessage.caption
            : (type === 'videoMessage' && msg.message.videoMessage.caption)
              ? msg.message.videoMessage.caption
              : '';

      if (!body || !body.startsWith(prefix)) return;

      const args = body.slice(prefix.length).trim().split(/\s+/);
      const cmdName = args.shift().toLowerCase();

      // owner check
      const isOwner = sender === ownerNumber || from === ownerNumber;

      // handle setmode locally
      if (cmdName === 'setmode') {
        if (!isOwner) return await sock.sendMessage(from, { text: 'Only the owner can change mode.' }, { quoted: msg });
        const mode = args[0];
        if (mode === 'private') {
          isPublic = false;
          return await sock.sendMessage(from, { text: 'Bot set to *private* (owner only).' }, { quoted: msg });
        } else if (mode === 'public') {
          isPublic = true;
          return await sock.sendMessage(from, { text: 'Bot set to *public* (everyone can use).' }, { quoted: msg });
        } else {
          return await sock.sendMessage(from, { text: 'Usage: .setmode public|private' }, { quoted: msg });
        }
      }

      // block commands if private and caller is not owner
      if (!isPublic && !isOwner) return;

      // run command
      if (commands.has(cmdName)) {
        try {
          await commands.get(cmdName).run(sock, msg, args, {
            from,
            sender,
            isGroup,
            isOwner
          });
        } catch (e) {
          console.error('Command error:', e);
          try { await sock.sendMessage(from, { text: '❌ Error executing command.' }, { quoted: msg }); } catch {}
        }
      } else {
        // optional: reply unknown command
        // await sock.sendMessage(from, { text: `Unknown command: ${cmdName}` }, { quoted: msg });
      }
    });

  } catch (e) {
    console.error('startBot failed:', e);
    // try restart after short delay
    setTimeout(startBot, 5000);
  }
}

// start Express keep-alive server so Render treats this as a web service
const app = express();
app.get('/', (req, res) => res.send('gbolahan-bot — running'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
  // start the bot after HTTP server up
  startBot();
});

