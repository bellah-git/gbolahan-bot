module.exports = {
  name: "confessdm",
  description: "Send a true anonymous confession via DM. Bot forwards it to the group.",
  async execute(sock, m, args) {
    if (m.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(m.chat, { text: "❗ This command only works in DM. Send me your confession privately." }, { quoted: m });
    }

    if (!args || args.length === 0) {
      return sock.sendMessage(m.chat, { text: "❗ Please type your confession after the command.\n\nExample: .confessdm I like someone in the group..." }, { quoted: m });
    }

    const confession = args.join(" ");
    const targetGroup = "YOUR_GROUP_ID@g.us"; // Replace with your group JID

    const msg = `💌 *Anonymous Confession (via DM)*\n\n"${confession}"`;

    await sock.sendMessage(targetGroup, { text: msg });
    await sock.sendMessage(m.chat, { text: "✅ Your confession has been sent anonymously to the group." });
  }
};
