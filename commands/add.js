const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ Only groups supported.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can add members.");

  const number = args[0];
  if (!number) return m.reply("Provide a number to add. Example: .add 2348012345678");

  const user = number.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  try {
    await sock.groupParticipantsUpdate(m.chat, [user], "add");
    m.reply("✅ Member added successfully!");
  } catch {
    m.reply("❌ Failed to add member. Maybe their privacy settings block it.");
  }
};
handler.command = ["add"];
module.exports = handler;
