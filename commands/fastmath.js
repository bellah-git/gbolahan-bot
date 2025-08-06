module.exports = {
  name: 'fastmath',
  async execute(msg) {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    const question = `${num1} ${operator} ${num2}`;
    const answer = eval(question);

    await msg.reply(`🧮 *Fast Math Challenge!*\n\nSolve this:\n\n${question} = ?\n\n⏱️ You have 15 seconds!`);

    const filter = (response) => Number(response.body.trim()) === answer;
    const collector = msg.client.createMessageCollector({
      chatId: msg.from,
      filter,
      time: 15000
    });

    collector.on('collect', (responseMsg) => {
      msg.reply(`✅ Correct! ${responseMsg.sender.pushName || 'Someone'} got it first.`);
      collector.stop();
    });

    collector.on('end', (_, reason) => {
      if (reason === 'time') msg.reply(`⌛ Time's up! The correct answer was *${answer}*.`);
    });
  }
};
