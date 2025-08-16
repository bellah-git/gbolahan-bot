const warns = {};

const handler = async (m, { sock, args }) => {
  if (!m.isGroup) return m.reply("⚠️ Groups only.");
  if (!m.isAdmin) return m.reply("🚫 Admins only.");

  const target = m.mentionedJid[0] || args[0];
  if (!target) return m.reply("Tag or provide the number to warn.");

  warns[target] = (warns[target] || 0) + 1;

  if (warns[target] >= 3) {
    try {
      await sock.groupParticipantsUpdate(m.chat, [target], "remove");
      m.reply(`⚠️ @${target.split("@")[0]} has been warned 3 times and has been removed.`, { mentions: [target] });
      warns[target] = 0;
    } catch {
      m.reply("❌ Couldn’t remove user after 3 warnings.");
    }
  } else {
    m.reply(`⚠️ @${target.split("@")[0]} now has ${warns[target]} warning(s).`, { mentions: [target] });
  }
};
handler.command = ["warn"];
module.exports = handler;
