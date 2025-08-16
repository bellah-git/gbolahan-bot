const welcomes = {};

const handler = async (m, { args }) => {
  if (!m.isGroup) return m.reply("⚠️ Only works in groups.");
  if (!m.isAdmin) return m.reply("🚫 Only admins can manage welcomes.");

  const option = args[0];
  if (!option) return m.reply("Use `.welcome on` or `.welcome off`");

  if (option.toLowerCase() === "on") {
    welcomes[m.chat] = true;
    m.reply("👋 Welcome messages enabled for this group.");
  } else if (option.toLowerCase() === "off") {
    welcomes[m.chat] = false;
    m.reply("❌ Welcome messages disabled for this group.");
  } else {
    m.reply("Use `.welcome on` or `.welcome off`");
  }
};
handler.command = ["welcome"];
module.exports = handler;
