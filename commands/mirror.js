module.exports = {
  name: 'mirror',
  execute(msg) {
    const text = msg.body.slice(7).trim();
    if (!text) {
      return msg.reply("🔁 Use it like this:\n`.mirror I am the best!`");
    }
    msg.reply(`🔊 You said: *${text}*`);
  }
};
