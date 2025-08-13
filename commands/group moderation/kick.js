module.exports = {
  name: 'kick',
  description: 'Remove a member',
  execute: async (sock, m, args, { from, isGroup }) => {
    if (!isGroup) {
      return sock.sendMessage(from, { text: "❌ This command can only be used in groups where moderation is necessary." }, { quoted: m });
    }
    
    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants;
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botParticipant = participants.find(p => p.id === botNumber);
      
      if (!botParticipant || !botParticipant.admin) {
        return sock.sendMessage(from, { text: "❌ I need admin privileges to kick members from this group." }, { quoted: m });
      }
      
      const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned || mentioned.length === 0) {
        return sock.sendMessage(from, { text: "❌ Please mention the user you want to kick from the group." }, { quoted: m });
      }
      
      await sock.groupParticipantsUpdate(from, mentioned, 'remove');
      await sock.sendMessage(from, { text: `✅ Successfully kicked ${mentioned.length} member(s) from the group.` }, { quoted: m });
    } catch (error) {
      await sock.sendMessage(from, { text: `❌ Failed to kick member: ${error.message}` }, { quoted: m });
    }
  }
};
