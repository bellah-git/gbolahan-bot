const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "I accidentally typed WhatsApp instead of homework again.",
  "This bot is faster than my internet connection.",
  "If you're reading this, you're already too slow.",
  "Coding at 3AM hits different but I love it.",
  "Why do I always lose in typebattle, huh?",
  "Fast fingers win the game, not loud mouths.",
  "Every programmer has a coffee addiction. Fight me.",
  "Sometimes I pretend to be AFK but I’m just slow.",
  "Can you type this without making a single typo?",
  "Challenge accepted. Let's see who wins this one.",
  "I should be studying, but here I am again.",
  "Typing is an art and you are not Picasso.",
  "My WiFi is slower than my typing speed.",
  "Speed typing is my hidden talent. Don't test me.",
  "The cake is a lie but the roast is real.",
  "How much wood would a woodchuck chuck if it could chuck wood?",
  "Never gonna give you up, never gonna let you down.",
  "This typing game is more intense than FIFA final.",
  "Life is short. Type faster.",
  "No cheat codes here. Just raw typing skill.",
  "Copy paste is banned. Type like a real one.",
  "One day I’ll win a typebattle. Just not today.",
  "The silence before the keyboard storm.",
  "They told me not to flex. I flexed anyway.",
  "This bot is more active than my group admin.",
  "Speed doesn't lie. Let’s type and find the truth.",
  "The typing god is watching. Don’t mess this up.",
  "This sentence is just a distraction. Type it anyway.",
  "A moment of silence for those who type slow.",
  "Victory belongs to the fastest typer. Are you that one?",
  "The fingers of fury are ready. Let’s go.",
  "You blink, you lose. That’s how it goes.",
  "I dare you to win this one. Prove yourself.",
  "May the odds be ever in your keyboard’s favor.",
  "No backspace, no mercy. Type clean or cry."
];

const activeBattles = new Set();

module.exports = {
  name: 'typebattle',
  async execute(msg) {
    if (activeBattles.has(msg.from)) {
      return msg.reply('⚠️ A type battle is already running in this chat!');
    }

    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    activeBattles.add(msg.from);

    await msg.reply(`⌨️ *Typing Battle Started!*\n\nType this **exactly** as fast as you can:\n\n"${sentence}"`);

    const filter = (response) => response.body.trim() === sentence;
    const collector = msg.client.createMessageCollector({ chatId: msg.from, filter, time: 20000 });

    collector.on('collect', (winnerMsg) => {
      msg.reply(`🏆 *Winner:* ${winnerMsg.sender.pushName || 'Someone'} typed it first!\n\n📝 Challenge: "${sentence}"`);
      collector.stop();
    });

    collector.on('end', (_, reason) => {
      if (reason === 'time') msg.reply(`⌛ Time’s up! Nobody got it.\n\n📝 Sentence was: "${sentence}"`);
      activeBattles.delete(msg.from);
    });
  }
};
