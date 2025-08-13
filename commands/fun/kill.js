module.exports = {
    name: 'kill',
    description: 'Playful "elimination" joke',
    async execute(sock, message, args, { from, isGroup }) {
        let targetUser = message.key.participant || message.key.remoteJid;
        
        if (args.length > 0) {
            const mentioned = message.message.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned.length > 0) {
                targetUser = mentioned[0];
            }
        }
        
        const killMessages = [
            `💀 @${targetUser.split('@')[0]} has been eliminated by the shadow realm!`,
            `💀 @${targetUser.split('@')[0]} was defeated in a battle of wits (unarmed).`,
            `💀 @${targetUser.split('@')[0]} has been sent to the cornfield.`,
            `💀 @${targetUser.split('@')[0]} was deleted from existence.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a level 99 wizard.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a paper cut.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a sneeze attack.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a falling coconut.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a toddler with a plastic sword.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a bad pun.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a meme overdose.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a cat video.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a dad joke.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a typo.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by autocorrect.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a slow internet connection.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a buffering video.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a low battery warning.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a software update.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a captcha.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a pop-up ad.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a 404 error.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a blue screen of death.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a printer jam.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a paperclip.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a stapler.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a sticky note.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a rubber band.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a pencil sharpener.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a hole punch.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a whiteout.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a highlighter.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a sticky note.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a paperclip.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a stapler.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a rubber band.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a pencil sharpener.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a hole punch.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a whiteout.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a highlighter.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a sticky note.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a paperclip.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a stapler.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a rubber band.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a pencil sharpener.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a hole punch.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a whiteout.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a highlighter.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a sticky note.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a paperclip.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a stapler.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a rubber band.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a pencil sharpener.`,
            `💀 @${targetUser.split('@')[0]} was vanquished by a hole punch.`,
            `💀 @${targetUser.split('@')[0]} was eliminated by a whiteout.`,
            `💀 @${targetUser.split('@')[0]} was defeated by a highlighter.`
        ];
        
        const randomMessage = killMessages[Math.floor(Math.random() * killMessages.length)];
        await sock.sendMessage(from, { 
            text: randomMessage, 
            mentions: [targetUser] 
        }, { quoted: message });
    }
};
