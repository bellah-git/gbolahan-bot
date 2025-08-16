const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ Group only.");
  if (!m.isAdmin) return m.reply("🚫 Admin only command.");

  const target = m.mentionedJid[0] || args[0];
  if (!target) return m.reply("Tag or provide the number to promote.");

  try {
    await sock.groupParticipantsUpdate(m.chat, [target], "promote");
    m.reply("⬆️ That member is now an admin. Use the power wisely!");
  } catch {
    m.reply("❌ Promotion failed. Check my permissions.");
  }
};
handler.command = ["promote"];
module.exports = handler;
