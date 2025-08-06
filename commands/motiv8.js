const quotes = [
  "You're stronger than you think.",
  "Don’t give up — your breakthrough might be just one step away.",
  "You’re not behind. You’re on your own timeline.",
  "Every day is a fresh chance to be better.",
  "Your story isn’t over yet. Keep writing.",
  "Even storms run out of rain.",
  "You don’t have to be perfect. Just be consistent.",
  "Small progress is still progress.",
  "You’ve survived 100% of your worst days. You got this.",
  "Rest if you must, but never quit.",
  "Your comeback will be stronger than the setback.",
  "You’re more capable than you feel right now.",
  "Every big win starts with a small step.",
  "Your glow-up is loading… stay tuned.",
  "You’re allowed to take up space. Own it.",
  "Haters are proof you’re doing something right.",
  "Don’t compare your chapter 1 to someone else’s chapter 20.",
  "The grind will be worth it — trust the process.",
  "You’re not stuck. You’re learning.",
  "That dream in your heart? It matters. Chase it."
];

module.exports = {
  name: 'motiv8',
  execute(msg) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    msg.reply(`💪 *Motivation Drop:*\n${quote}`);
  }
};
