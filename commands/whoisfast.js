module.exports = {
  name: 'whoisfast',
  async execute(msg) {
    msg.reply("⚡ *Get Ready!*\n\nWhen I say *NOW*, be the first to reply *anything*!");

    const delay = Math.floor(Math.random() * 5000) + 3000; // 3s–8s delay

    setTimeout(() => {
      msg.reply("🚨 *NOW!*");

      const collector = msg.client.createMessageCollector({
        chatId: msg.from,
        time: 5000
      });

      collector.on('collect', (res) => {
        msg.reply(`🏆 Fastest was: ${res.sender.pushName || 'Someone'}`);
        collector.stop();
      });

      collector.on('end', (_, reason) => {
        if (reason === 'time') msg.reply("😴 No one responded in time.");
      });
    }, delay);
  }
};
