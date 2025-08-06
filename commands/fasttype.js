const words = ['elephant', 'javascript', 'whatsapp', 'developer', 'rizzler', 'matrix', 'telegram', 'function', 'gigabyte', 'watermelon'];

module.exports = {
  name: 'fasttype',
  execute(msg, client) {
    const word = words[Math.floor(Math.random() * words.length)];

    msg.reply(`⚡ First to type: *${word}*`);

    const filter = (m) => m.body.toLowerCase() === word.toLowerCase();
    const collector = client.createMessageCollector(msg.from, filter, { time: 15000 });

    collector.on('collect', (m) => {
      msg.reply(`🏆 *${m.notifyName || m.pushName}* typed it first!`);
      collector.stop();
    });

    collector.on('end', (collected) => {
      if (!collected.length) msg.reply('⏱ Time up! No one typed it.');
    });
  }
};
