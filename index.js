const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// ========== CONFIG ==========
const OWNER_NUMBER = '2349038158275'; // <- Replace with your full WhatsApp number (country code, no +)
let botMode = 'public'; // 'public' or 'private'
// ============================

// Load commands
const commands = new Map();
const cmdPath = path.join(__dirname, 'commands');
fs.readdirSync(cmdPath).forEach(file => {
  if (file.endsWith('.js')) {
    const cmd = require(`./commands/${file}`);
    commands.set(cmd.name, cmd);
  }
});

// Init client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => {
  console.log(chalk.yellow('[!] Scan the QR Code below:\n'));
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log(chalk.green('[✓] Bot is ready!'));
});

client.on('message', async msg => {
  const from = msg.from;
  const sender = msg.author || msg.from;
  const isGroup = msg.from.endsWith('@g.us');
  const body = msg.body.trim();
  
  // Only respond to dot-prefixed commands
  if (!body.startsWith('.')) return;

  const args = body.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Public/private mode check
  if (botMode === 'private' && sender !== `${OWNER_NUMBER}@c.us`) {
    return;
  }

  // Built-in commands
  if (command === 'menu') {
    let response = `*🤖 Bellah WhatsApp Bot Commands:*\n\n`;
    commands.forEach((cmd, name) => {
      response += `• .${name}\n`;
    });
    response += `\n_Bot Mode: ${botMode.toUpperCase()}_`;
    msg.reply(response);
  } else if (command === 'setmode') {
    if (sender !== `${OWNER_NUMBER}@c.us`) return msg.reply('⛔ Owner-only command.');
    const mode = args[0];
    if (mode !== 'public' && mode !== 'private') {
      return msg.reply('Usage: .setmode public/private');
    }
    botMode = mode;
    msg.reply(`✅ Bot mode set to *${mode.toUpperCase()}*`);
  } else if (commands.has(command)) {
    try {
      await commands.get(command).execute(msg, args, client);
    } catch (err) {
      msg.reply('❌ Error executing command.');
      console.error(err);
    }
  }
});

client.initialize();
