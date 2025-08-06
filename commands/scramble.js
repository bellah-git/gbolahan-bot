const words = [
  "banana", "computer", "whatsapp", "javascript", "elephant",
  "pyramid", "keyboard", "chocolate", "internet", "umbrella",
  "rainbow", "diamond", "giraffe", "spaghetti", "football"
];

function scrambleWord(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

module.exports = {
  name: 'scramble',
  async execute(msg) {
    const originalWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = scrambleWord(originalWord);

    msg.reply(`🧩 *Unscramble This Word!*\n\n➡️ ${scrambled}\n\n⏳ You have 20 seconds!`);

    const filter = (response) => response.body.toLowerCase().trim() === originalWord.toLowerCase();
    const collector = msg.client.createMessageCollector({
      chatId: msg.from,
      filter,
      time: 20000
    });

    collector.on('collect', (res) => {
      msg.reply(`🎉 Correct! ${res.sender.pushName || 'Someone'} got it first.\nThe word was: *${originalWord}*`);
      collector.stop();
    });

    collector.on('end', (_, reason) => {
      if (reason === 'time') msg.reply(`❌ Time's up! The word was *${originalWord}*`);
    });
  }
};
