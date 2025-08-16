const handler = async (m, { sock }) => {
  if (!m.isGroup) return m.reply("⚠️ Group only.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can freeze the group.");

  try {
    await sock.groupSettingUpdate(m.chat, "announcement");
    m.reply("❄️ The group is now frozen. Only admins can send messages.");
  } catch {
    m.reply("❌ Could not freeze the group.");
  }
};
handler.command = ["freeze"];
module.exports = handler;
