module.exports = {
    name: 'crush',
    description: 'Fun random crush reveal',
    async execute(sock, message, args, { from, isGroup }) {
        if (!isGroup) {
            return sock.sendMessage(from, { text: "This command only works in groups!" }, { quoted: message });
        }
        
        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants;
        const randomUser = participants[Math.floor(Math.random() * participants.length)];
        
        const crushMessages = [
            `💔 Someone has a crush on @${randomUser.id.split('@')[0]}! 😍`,
            `💘 @${randomUser.id.split('@')[0]} is secretly admired by someone in this group! 💌`,
            `💝 @${randomUser.id.split('@')[0]} has caught someone's eye! 👀`,
            `💖 @${randomUser.id.split('@')[0]} is the secret crush of someone here! 🤫`,
            `💗 @${randomUser.id.split('@')[0]} has an admirer in this group! 😊`,
            `💓 Someone can't stop thinking about @${randomUser.id.split('@')[0]}! 💭`,
            `💞 @${randomUser.id.split('@')[0]} is someone's dream come true! ✨`,
            `💕 @${randomUser.id.split('@')[0]} has a secret admirer! 🌹`,
            `💟 @${randomUser.id.split('@')[0]} is the apple of someone's eye! 🍎`,
            `💖 @${randomUser.id.split('@')[0]} has captured someone's heart! ❤️`,
            `💘 @${randomUser.id.split('@')[0]} is the reason someone smiles today! 😄`,
            `💝 @${randomUser.id.split('@')[0]} is someone's favorite person! 🌟`,
            `💗 @${randomUser.id.split('@')[0]} has a secret fan! 🎉`,
            `💓 @${randomUser.id.split('@')[0]} is someone's sunshine! ☀️`,
            `💞 @${randomUser.id.split('@')[0]} is the highlight of someone's day! 🌈`,
            `💕 @${randomUser.id.split('@')[0]} has a special place in someone's heart! 💖`,
            `💟 @${randomUser.id.split('@')[0]} is someone's everything! 🌍`,
            `💖 @${randomUser.id.split('@')[0]} is the one someone's been waiting for! ⏳`,
            `💘 @${randomUser.id.split('@')[0]} has a secret admirer who can't sleep! 😴`,
            `💝 @${randomUser.id.split('@')[0]} is someone's inspiration! 💡`,
            `💗 @${randomUser.id.split('@')[0]} has a secret crush who's too shy to speak! 🙈`,
            `💓 @${randomUser.id.split('@')[0]} is someone's reason to wake up! 🌅`,
            `💞 @${randomUser.id.split('@')[0]} is the light in someone's darkness! 🔦`,
            `💕 @${randomUser.id.split('@')[0]} has a secret admirer who writes poems! 📝`,
            `💟 @${randomUser.id.split('@')[0]} is someone's favorite distraction! 🎮`,
            `💖 @${randomUser.id.split('@')[0]} has a secret crush who daydreams about them! 💭`,
            `💘 @${randomUser.id.split('@')[0]} is someone's happiness! 😊`,
            `💝 @${randomUser.id.split('@')[0]} has a secret admirer who listens to love songs! 🎵`,
            `💗 @${randomUser.id.split('@')[0]} is someone's everything! 🌍`,
            `💓 @${randomUser.id.split('@')[0]} has a secret crush who can't focus! 📚`,
            `💞 @${randomUser.id.split('@')[0]} is someone's dream come true! ✨`,
            `💕 @${randomUser.id.split('@')[0]} has a secret admirer who smiles at their phone! 📱`,
            `💟 @${randomUser.id.split('@')[0]} is someone's favorite thought! 💭`,
            `💖 @${randomUser.id.split('@')[0]} has a secret crush who gets butterflies! 🦋`,
            `💘 @${randomUser.id.split('@')[0]} is someone's reason to believe in love! 💑`,
            `💝 @${randomUser.id.split('@')[0]} has a secret admirer who can't stop smiling! 😄`,
            `💗 @${randomUser.id.split('@')[0]} is someone's sunshine on a cloudy day! ☁️`,
            `💓 @${randomUser.id.split('@')[0]} has a secret crush who writes their name everywhere! ✍️`,
            `💞 @${randomUser.id.split('@')[0]} is someone's favorite distraction! 🎮`,
            `💕 @${randomUser.id.split('@')[0]} has a secret admirer who can't sleep! 😴`,
            `💟 @${randomUser.id.split('@')[0]} is someone's everything! 🌍`,
            `💖 @${randomUser.id.split('@')[0]} has a secret crush who daydreams about them! 💭`,
            `💘 @${randomUser.id.split('@')[0]} is someone's happiness! 😊`,
            `💝 @${randomUser.id.split('@')[0]} has a secret admirer who listens to love songs! 🎵`,
            `💗 @${randomUser.id.split('@')[0]} is someone's favorite person! 🌟`,
            `💓 @${randomUser.id.split('@')[0]} has a secret crush who can't focus! 📚`,
            `💞 @${randomUser.id.split('@')[0]} is someone's dream come true! ✨`,
            `💕 @${randomUser.id.split('@')[0]} has a secret admirer who smiles at their phone! 📱`,
            `💟 @${randomUser.id.split('@')[0]} is someone's favorite thought! 💭`
        ];
        
        const randomMessage = crushMessages[Math.floor(Math.random() * crushMessages.length)];
        await sock.sendMessage(from, { 
            text: randomMessage, 
            mentions: [randomUser.id] 
        }, { quoted: message });
    }
};
