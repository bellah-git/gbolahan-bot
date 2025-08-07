const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');

const { state, saveState } = useSingleFileAuthState('./auth.json');

const commands = new Map();
const prefix = '.';
let isPublic = true;

const ownerNumber = '2349038158275@s.whatsapp.net'; // <<< replace with your full WhatsApp number

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// Create client
async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
        getMessage: async (key) => ({ conversation: 'hello' })
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        const from = msg.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = isGroup ? msg.key.participant : msg.key.remoteJid;
        const isOwner = sender === ownerNumber;

        let text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        if (!text.startsWith(prefix)) return;
        const [commandName, ...args] = text.slice(1).trim().split(/\s+/);
        const command = commands.get(commandName.toLowerCase());
        if (!command) return;

        // Group metadata
        let groupMetadata = {};
        let groupAdmins = [];
        let isAdmin = false;

        if (isGroup) {
            try {
                groupMetadata = await sock.groupMetadata(from);
                groupAdmins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
                isAdmin = groupAdmins.includes(sender);
            } catch (e) {
                console.error('Group metadata error:', e);
            }
        }

        // .setmode handling
        if (commandName === 'setmode') {
            if (!isOwner) return sock.sendMessage(from, { text: 'Only the owner can change bot mode.' });
            const mode = args[0];
            if (mode === 'private') {
                isPublic = false;
                return sock.sendMessage(from, { text: 'Bot mode set to *private* (owner only).' });
            } else if (mode === 'public') {
                isPublic = true;
                return sock.sendMessage(from, { text: 'Bot mode set to *public* (everyone can use).' });
            } else {
                return sock.sendMessage(from, { text: 'Usage: .setmode public / private' });
            }
        }

        if (!isPublic && !isOwner) return;

        try {
            await command.run(sock, msg, args, {
                from,
                sender,
                isGroup,
                groupAdmins,
                isAdmin,
                isOwner,
                metadata: groupMetadata
            });
        } catch (err) {
            console.error(err);
            sock.sendMessage(from, { text: '❌ Error running command.' });
        }
    });

    sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed, reconnecting...', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('Bot is now connected');
        }
    });
}

startBot();
