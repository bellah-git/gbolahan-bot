const anagrams = [
  { scrambled: 'tac', answer: 'cat' },
  { scrambled: 'god', answer: 'dog' },
  { scrambled: 'rca', answer: 'car' },
  { scrambled: 'lpaep', answer: 'apple' },
  { scrambled: 'dorlw', answer: 'world' },
  { scrambled: 'nohtyp', answer: 'python' },
  { scrambled: 'ptes', answer: 'step' },
  { scrambled: 'tolhe', answer: 'hotel' },
  { scrambled: 'erif', answer: 'fire' },
  { scrambled: 'gnik', answer: 'king' },
];

module.exports = {
  name: 'anagram',
  async execute(msg) {
    const selected = anagrams[Math.floor(Math.random() * anagrams.length)];

    await msg.reply(`🧠 Unscramble this word: *${selected.scrambled}*\n_You have 10 seconds!_`);

    const filter = m => m.body.toLowerCase() === selected.answer.toLowerCase();
    const collector = msg.client.createMessageCollector({ filter, time: 10000 });

    collector.on('collect', m => {
      msg.reply(`✅ Correct, *${m._data.notifyName}*! The answer was *${selected.answer}*`);
      collector.stop();
    });

    collector.on('end', collected => {
      if (!collected.size) msg.reply(`⏰ Time's up! The correct answer was *${selected.answer}*`);
    });
  }
};
