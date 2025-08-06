module.exports = {
  name: 'quickcalc',
  async execute(msg) {
    const num1 = Math.floor(Math.random() * 30) + 1;
    const num2 = Math.floor(Math.random() * 30) + 1;
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];

    const question = `${num1} ${op} ${num2}`;
    const answer = eval(question);

    await msg.reply(`🧠 Quick! What is *${question}*?\n_You have 8 seconds!_`);

    const filter = m => m.body.trim() === answer.toString();
    const collector = msg.client.createMessageCollector({ filter, time: 8000 });

    collector.on('collect', m => {
      msg.reply(`✅ Correct, *${m._data.notifyName}*!`);
      collector.stop();
    });

    collector.on('end', collected => {
      if (!collected.size) msg.reply(`⏰ Time’s up! The correct answer was *${answer}*`);
    });
  }
};
