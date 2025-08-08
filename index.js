const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function connect() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', () => saveState());

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('\n\n✅ CONNECTED!');
            const session = fs.readFileSync('./auth_info.json', 'utf-8');
            console.log('\n\n⚠️ COPY THIS SESSION BELOW:\n');
            console.log(Buffer.from(session).toString('base64'));
            process.exit(0);
        }
    });
}

connect();

