const {
    default: makeWASocket,
    useSingleFileAuthState,
    DisconnectReason,
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const pino = require('pino');

// Auth state
const { state, saveState } = useSingleFileAuthState('./auth.json');

// Command storage
const commands = new Map();

// Load commands dynamically
const loadCommands = () => {
    commands.clear();
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const cmd = require(`./commands/${file}`);
            if (cmd.name && typeof cmd.run === 'function') {
                commands.set(cmd.name.toLowerCase(), cmd);
                console.log(`✅ Loaded command: ${cmd.name}`);
            }
        } catch (err) {
            console.error(`❌ Error loading command ${file}:`, err);
        }
    }
};

// Main bot function
async function startBot() {
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    // Save credentials
    sock.ev.on('creds.update', saveState);

    // Connection updates
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log('🔄 Reconnecting...');
                startBot();
            } else {
                console.log('❌ Logged out. Please delete auth.json and restart.');
            }
        } else if (connection === 'open') {
            console.log('✅ Bot connected and running.');
        }
    });

    // Message handler
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.fromMe) return;

        const from = m.key.remoteJid;
        let text = '';
        if (m.message.conversation) text = m.message.conversation;
        else if (m.message.extendedTextMessage) text = m.message.extendedTextMessage.text;

        if (!text.startsWith('.')) return;

        const args = text.trim().split(/ +/);
        const cmdName = args.shift().slice(1).toLowerCase();
        const command = commands.get(cmdName);

        if (command) {
            try {
                await command.run(sock, m, args);
            } catch (err) {
                console.error(`❌ Error executing ${cmdName}:`, err);
                await sock.sendMessage(from, { text: '⚠️ Error executing command.' }, { quoted: m });
            }
        }
    });
}

// Load commands and start
loadCommands();
startBot();
