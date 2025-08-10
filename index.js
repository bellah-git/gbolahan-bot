const { 
    default: makeWASocket, 
    useSingleFileAuthState, 
    fetchLatestBaileysVersion, 
    DisconnectReason 
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// ======== LOAD SESSION FROM ENV (RENDER) ========
if (process.env.SESSION_ID) {
    fs.writeFileSync('./auth.json', Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8'));
}

const { state, saveState } = useSingleFileAuthState('./auth.json');

// ======== BOT SETTINGS ========
const commands = new Map();
const prefix = '.';
let isPublic = true;
const ownerNumber = '2349038158275@s.whatsapp.net'; // change if needed

// ======== LOAD COMMANDS ========
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// ======== START BOT ========
async function startBot() {
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        printQRInTerminal: !process.env.SESSION_ID,
        auth: state,
        getMessage: async () => ({ conversation: 'hello' })
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
                groupAdmins = groupMetadata.participants
                    .filter(p => p.admin)
                    .map(p => p.id);
                isAdmin = groupAdmins.includes(sender);
            } catch (e) {
                console.error('Group metadata error:', e);
            }
        }

        // ======== SETMODE COMMAND ========
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

        // Restrict if in private mode
        if (!isPublic && !isOwner) return;

        // Run the command
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

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            const shouldReconnect = reason !== DisconnectReason.loggedOut;
            console.log('Connection closed. Reason:', reason, ' Reconnect:', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('✅ Bot is now connected');
        }
    });
}

startBot();

