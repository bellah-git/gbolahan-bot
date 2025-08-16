const antispam = {};

const handler = async (m, { args }) => {
  if (!m.isGroup) return m.reply("⚠️ Only groups supported.");
  if (!m.isAdmin) return m.reply("🚫 Admin only.");

  const option = args[0];
  if (!option) return m.reply("Use `.antispam on` or `.antispam off`");

  if (option.toLowerCase() === "on") {
    antispam[m.chat] = true;
    m.reply("🛡️ Anti-spam mode enabled. Flooding will be blocked.");
  } else if (option.toLowerCase() === "off") {
    antispam[m.chat] = false;
    m.reply("❌ Anti-spam mode disabled.");
  } else {
    m.reply("Use `.antispam on` or `.antispam off`");
  }
};
handler.command = ["antispam"];
module.exports = handler;
