module.exports = {
  name: 'math',
  execute(msg, client) {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${operator} ${num2}`;
    let answer = eval(question);

    msg.reply(`🧠 Solve this: *${question}*`);

    const filter = (m) => Number(m.body) === answer;
    const collector = client.createMessageCollector(msg.from, filter, { time: 15000 });

    collector.on('collect', (m) => {
      msg.reply(`✅ Correct! *${m.notifyName || m.pushName}* got it!`);
      collector.stop();
    });

    collector.on('end', (collected) => {
      if (!collected.length) msg.reply(`⏱ Time's up! The answer was *${answer}*.`);
    });
  }
};
