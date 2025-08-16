const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ Groups only.");
  if (!m.isAdmin) return m.reply("🚫 Admin only.");

  const target = m.mentionedJid[0] || args[0];
  if (!target) return m.reply("Tag or provide the number to demote.");

  try {
    await sock.groupParticipantsUpdate(m.chat, [target], "demote");
    m.reply("⬇️ That admin has been demoted to a regular member.");
  } catch {
    m.reply("❌ Couldn’t demote. Permissions issue?");
  }
};
handler.command = ["demote"];
module.exports = handler;
