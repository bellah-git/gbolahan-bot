module.exports = {
  name: 'freeze',
  async execute(msg) {
    await msg.reply("🥶 This chat is now *frozen*! Nobody move...");
    setTimeout(() => {
      msg.reply("🔥 Chat *unfrozen*! Carry on.");
    }, 10000);
  }
};
