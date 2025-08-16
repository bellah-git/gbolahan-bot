const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ Only works in groups.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can tag all.");

  const group = await sock.groupMetadata(m.chat);
  const text = args.join(" ") || "📢 Attention everyone!";

  let mentions = group.participants.map(p => p.id);
  let message = `${text}\n\n${mentions.map(u => "@" + u.split("@")[0]).join(" ")}`;

  sock.sendMessage(m.chat, { text: message, mentions });
};
handler.command = ["tagall"];
module.exports = handler;
