const quizzes = [
  { emojis: "🐍📚⚡", answer: "harry potter" },
  { emojis: "🍕🐢🗽", answer: "teenage mutant ninja turtles" },
  { emojis: "🚗💨", answer: "fast and furious" },
  { emojis: "👸❄️", answer: "frozen" },
  { emojis: "🦁👑", answer: "the lion king" },
  { emojis: "🚢🧊💔", answer: "titanic" },
  { emojis: "🦇🌃", answer: "batman" },
  { emojis: "👨‍🚀🌕", answer: "first man on the moon" },
  { emojis: "👻🔫", answer: "ghostbusters" },
  { emojis: "🕷️🧑", answer: "spiderman" },
];

module.exports = {
  name: 'emojiquiz',
  async execute(msg) {
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    msg.reply(`🤔 *Emoji Quiz Time!*\n\n${quiz.emojis}\n\n⏳ First to guess the correct phrase/movie wins!`);

    const filter = (res) => res.body.toLowerCase().includes(quiz.answer.toLowerCase());
    const collector = msg.client.createMessageCollector({
      chatId: msg.from,
      filter,
      time: 20000
    });

    collector.on('collect', (res) => {
      msg.reply(`🎉 Correct! ${res.sender.pushName || 'Someone'} got it first.\nAnswer: *${quiz.answer}*`);
      collector.stop();
    });

    collector.on('end', (_, reason) => {
      if (reason === 'time') msg.reply(`⏰ Time's up! The answer was: *${quiz.answer}*`);
    });
  }
};
