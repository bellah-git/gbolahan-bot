const handler = async (m, { sock }) => {
  if (!m.isGroup) return m.reply("⚠️ Group only.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can fetch group link.");

  try {
    const inviteCode = await sock.groupInviteCode(m.chat);
    m.reply(`🔗 Group Link: https://chat.whatsapp.com/${inviteCode}`);
  } catch {
    m.reply("❌ Couldn’t fetch group link. Maybe I’m not an admin?");
  }
};
handler.command = ["grouplink"];
module.exports = handler;
