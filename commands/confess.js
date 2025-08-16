module.exports = {
  name: "confess",
  description: "Send a fake anonymous confession in the group (sender still visible).",
  async execute(sock, m, args) {
    if (!args || args.length === 0) {
      return sock.sendMessage(m.chat, { text: "❗ Please type your confession after the command.\n\nExample: .confess I have a crush on someone here..." }, { quoted: m });
    }

    const confession = args.join(" ");
    const msg = `💬 *Anonymous Confession*\n\n"${confession}"`;

    await sock.sendMessage(m.chat, { text: msg }, { quoted: null });
  }
};
