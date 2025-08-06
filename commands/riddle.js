const riddles = [
  { question: "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?", answer: "An echo." },
  { question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps." },
  { question: "What can fill a room but takes up no space?", answer: "Light." },
  { question: "I have keys but no locks. I have space but no room. You can enter, but can’t go outside. What am I?", answer: "A keyboard." },
  { question: "What has hands but can’t clap?", answer: "A clock." },
  { question: "What gets wetter as it dries?", answer: "A towel." },
  { question: "What can travel around the world while staying in the same corner?", answer: "A stamp." },
  { question: "What has one eye but can’t see?", answer: "A needle." },
  { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "The letter M." },
  { question: "What is always in front of you but can’t be seen?", answer: "The future." },
  { question: "I am tall when I’m young, and short when I’m old. What am I?", answer: "A candle." },
  { question: "What has a head, a tail, but no body?", answer: "A coin." },
  { question: "The more you take away, the bigger I get. What am I?", answer: "A hole." },
  { question: "I’m not alive, but I grow. I don’t have lungs, but I need air. What am I?", answer: "Fire." },
  { question: "What goes up but never comes down?", answer: "Your age." },
  { question: "I have branches, but no fruit, trunk or leaves. What am I?", answer: "A bank." },
  { question: "What can't talk but will reply when spoken to?", answer: "An echo." },
  { question: "What begins with T, ends with T, and has T in it?", answer: "A teapot." },
  { question: "What has four wheels and flies?", answer: "A garbage truck." },
  { question: "If you drop me I’m sure to crack, but give me a smile and I’ll always smile back. What am I?", answer: "A mirror." }
];

module.exports = {
  name: 'riddle',
  async execute(msg) {
    const pick = riddles[Math.floor(Math.random() * riddles.length)];
    await msg.reply(`🧠 *Riddle:* ${pick.question}\n_I'll tell you the answer in 8 seconds..._`);

    setTimeout(() => {
      msg.reply(`🧩 *Answer:* ${pick.answer}`);
    }, 8000);
  }
};
