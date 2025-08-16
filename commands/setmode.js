// commands/setmode.js
module.exports = {
    name: 'setmode',
    description: 'Switch bot mode between public and private',
    async execute(client, message, args, botSettings) {
        // Check if the sender is the owner
        const ownerNumber = '2349038158275@c.us'; // <-- replace with your WhatsApp number
        if (message.from !== ownerNumber) {
            return message.reply('Only the owner can change the bot mode.');
        }

        // Check arguments
        if (!args[0]) {
            return message.reply('Please specify mode: public or private');
        }

        const mode = args[0].toLowerCase();
        if (mode !== 'public' && mode !== 'private') {
            return message.reply('Invalid mode. Use "public" or "private".');
        }

        // Save the mode
        botSettings.mode = mode;

        message.reply(`Bot mode set to *${mode}*`);
    }
};
