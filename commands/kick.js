// commands/kick.js
module.exports = {
  name: "kick",
  description: "Remove a user from the group",
  async execute(sock, m, args, { from, isGroup, isBotAdmin, isSenderAdmin }) {
    if (!isGroup) {
      return sock.sendMessage(from, { text: "❌ This command can only be used in groups." }, { quoted: m });
    }
    if (!isSenderAdmin) {
      return sock.sendMessage(from, { text: "🚫 Only group admins can use this command." }, { quoted: m });
    }
    if (!isBotAdmin) {
      return sock.sendMessage(from, { text: "⚠️ I need to be an *admin* to kick members." }, { quoted: m });
    }

    const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentioned.length === 0) {
      return sock.sendMessage(from, { text: "Usage: .kick @user" }, { quoted: m });
    }

    try {
      await sock.groupParticipantsUpdate(from, mentioned, "remove");
      return sock.sendMessage(from, { text: `✅ Kicked: ${mentioned.map(u => "@" + u.split("@")[0]).join(", ")}` , mentions: mentioned }, { quoted: m });
    } catch (e) {
      return sock.sendMessage(from, { text: "❌ Failed to kick. Maybe they’re an admin?" }, { quoted: m });
    }
  }
};
