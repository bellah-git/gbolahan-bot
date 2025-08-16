const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ This command only works in groups.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can use this command.");

  const target = m.mentionedJid[0] || args[0];
  if (!target) return m.reply("Tag or provide the number of the member you want to remove.");

  try {
    await sock.groupParticipantsUpdate(m.chat, [target], "remove");
    m.reply("🚪 Member has been kicked from the group. Order restored!");
  } catch {
    m.reply("❌ Failed to remove that member. Maybe I don’t have the right permissions.");
  }
};
handler.command = ["kick"];
module.exports = handler;
