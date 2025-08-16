// commands/setmode.js
module.exports = {
    name: "setmode",
    description: "Switch bot between public/private mode",
    execute: async (message, args, client) => {
        const ownerId = "2349038158275"; // your WhatsApp number with country code
        if (message.from !== ownerId) return message.reply("Only the owner can change mode.");

        if (!args[0] || !["public", "private"].includes(args[0].toLowerCase())) {
            return message.reply("Usage: .setmode public|private");
        }

        const mode = args[0].toLowerCase();
        client.mode = mode;
        message.reply(`Bot mode set to ${mode}`);
    }
};
