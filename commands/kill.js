module.exports = {
  name: 'kill',
  execute(msg) {
    const target = msg.body.slice(6).trim();
    if (!target) {
      return msg.reply("☠️ Use it like this:\n`.kill @username` or `.kill Gbolahan`");
    }
    msg.reply(`💥 *${target}* has been eliminated. RIP.`);
  }
};
