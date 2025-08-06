module.exports = {
  name: 'guessnum',
  execute(msg, client) {
    const answer = Math.floor(Math.random() * 10) + 1;

    msg.reply('🎯 I’m thinking of a number between 1 and 10. First to guess wins!');

    const filter = (m) => parseInt(m.body) === answer;
    const collector = client.createMessageCollector(msg.from, filter, { time: 15000 });

    collector.on('collect', (m) => {
      msg.reply(`🥳 Correct! *${m.notifyName || m.pushName}* guessed it: *${answer}*`);
      collector.stop();
    });

    collector.on('end', (collected) => {
      if (!collected.length) msg.reply(`❌ Time's up! It was *${answer}*.`);
    });
  }
};
