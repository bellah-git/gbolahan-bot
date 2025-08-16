const quizzes = [
  { q: "🍎📱", a: "Apple" },
  { q: "🦁👑", a: "The Lion King" },
  { q: "🚀🌕", a: "Moon Landing" },
  { q: "🎬🍿", a: "Watching a movie" },
  { q: "🐍⚡", a: "Harry Potter" },
  { q: "🏀🐐", a: "Michael Jordan / The GOAT" },
  { q: "🎶👑", a: "King of Pop (Michael Jackson)" },
  { q: "💻🐛", a: "Computer Bug" },
  { q: "🍔🍟🥤", a: "Fast Food" },
  { q: "🎮🕹️", a: "Video Games" },
  { q: "🌍✈️", a: "Traveling the world" },
  { q: "🎅🎄", a: "Christmas" },
  { q: "🎓📚", a: "Graduation" },
  { q: "🐶🐾", a: "Dog / Pet" },
  { q: "🎤🎶", a: "Singing" },
  { q: "⚽🥅", a: "Football / Soccer" },
  { q: "📸🤳", a: "Taking selfies" },
  { q: "🍕🇮🇹", a: "Pizza from Italy" },
  { q: "🕷️🕸️", a: "Spiderman" },
  { q: "🧛‍♂️🩸", a: "Vampire" },
  { q: "🦸‍♀️🦸‍♂️", a: "Superheroes" },
  { q: "🐢🏁", a: "The Tortoise and the Hare" },
  { q: "🐒🍌", a: "Monkey loves banana" },
  { q: "🐧❄️", a: "Penguin" },
  { q: "🐺🌕", a: "Werewolf" },
  { q: "🦄🌈", a: "Unicorn" },
  { q: "👽🚀", a: "Aliens" },
  { q: "🤖⚙️", a: "Robot" },
  { q: "🎇🎆", a: "Fireworks" },
  { q: "🚒🔥", a: "Firefighter" },
  { q: "🎣🐟", a: "Fishing" },
  { q: "⛷️🏔️", a: "Skiing" },
  { q: "🎿⛸️", a: "Winter Sports" }
];

module.exports = {
  name: "emojiquiz",
  description: "Sends an emoji puzzle and reveals the answer after some time.",
  execute(msg) {
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    const delay = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000; 
    // Random between 15s and 30s

    msg.reply(`🧩 Emoji Quiz:\n${quiz.q}\n\n⏳ You have a few seconds to guess!`);

    setTimeout(() => {
      msg.reply(`✅ Answer: *${quiz.a}*`);
    }, delay);
  }
};
