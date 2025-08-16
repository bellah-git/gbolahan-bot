const handler = async (m, { sock }) => {
  if (!m.isGroup) return m.reply("⚠️ Group only command.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can use this command.");

  const participants = m.groupMetadata.participants
    .filter(p => !p.admin)
    .map(p => p.id);

  if (!participants.length) return m.reply("✅ No regular members to kick.");

  for (let user of participants) {
    try {
      await sock.groupParticipantsUpdate(m.chat, [user], "remove");
    } catch {}
  }

  m.reply("🚪 All non-admins have been kicked out of this group.");
};
handler.command = ["kickall"];
module.exports = handler;
