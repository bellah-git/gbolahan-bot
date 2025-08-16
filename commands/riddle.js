const riddles = [
  { q: "What has to be broken before you can use it?", a: "An egg" },
  { q: "I’m tall when I’m young, and I’m short when I’m old. What am I?", a: "A candle" },
  { q: "What has a face and two hands but no arms or legs?", a: "A clock" },
  { q: "The more of me you take, the more you leave behind. What am I?", a: "Footsteps" },
  { q: "What has many keys but can’t open a single lock?", a: "A piano" },
  { q: "What gets wetter the more it dries?", a: "A towel" },
  { q: "What has an endless supply of letters but starts empty?", a: "A mailbox" },
  { q: "What runs but never walks, has a bed but never sleeps?", a: "A river" },
  { q: "What has one eye but cannot see?", a: "A needle" },
  { q: "What belongs to you but is used more by others?", a: "Your name" },
  { q: "What has a neck but no head?", a: "A bottle" },
  { q: "What has hands but can’t clap?", a: "A clock" },
  { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
  { q: "What can fill a room but takes up no space?", a: "Light" },
  { q: "The more you take out of me, the bigger I get. What am I?", a: "A hole" },
  { q: "What goes up but never comes down?", a: "Your age" },
  { q: "What is full of holes but still holds water?", a: "A sponge" },
  { q: "What has four legs in the morning, two legs at noon, and three in the evening?", a: "A human" },
  { q: "What gets sharper the more you use it?", a: "Your brain" },
  { q: "What comes down but never goes up?", a: "Rain" },
  { q: "What is easy to lift but hard to throw?", a: "A feather" },
  { q: "What can you catch but not throw?", a: "A cold" },
  { q: "What has words but never speaks?", a: "A book" },
  { q: "What has roots but is not a plant?", a: "A family tree" },
  { q: "What can’t talk but will reply when spoken to?", a: "An echo" },
  { q: "What has ears but cannot hear?", a: "Corn" },
  { q: "The more you share me, the less I become. What am I?", a: "A secret" },
  { q: "What has teeth but cannot bite?", a: "A comb" },
  { q: "What runs but has no legs?", a: "Water" },
  { q: "What can you break without touching it?", a: "A promise" },
  { q: "What is always in front of you but can’t be seen?", a: "The future" },
  { q: "What goes around the world but stays in one spot?", a: "A stamp" },
  { q: "What kind of coat is always wet when you put it on?", a: "A coat of paint" },
  { q: "What has cities, but no houses; forests, but no trees; and water, but no fish?", a: "A map" },
  { q: "What has an end but no beginning?", a: "A stick" },
  { q: "What flies without wings?", a: "Time" },
  { q: "What has many rings but no fingers?", a: "A tree" },
  { q: "What kind of band never plays music?", a: "A rubber band" },
  { q: "What has legs but doesn’t walk?", a: "A table" },
  { q: "What can be cracked, made, told, and played?", a: "A joke" },
  { q: "What is always running but never moves?", a: "Time" },
  { q: "What has a thumb and four fingers but is not alive?", a: "A glove" },
  { q: "What can go up a chimney down, but can’t go down a chimney up?", a: "An umbrella" },
  { q: "What has one head, one foot, and four legs?", a: "A bed" },
  { q: "What has one eye but is completely blind?", a: "A storm" },
  { q: "What can’t be used until it’s broken?", a: "An egg" },
  { q: "What has three letters and starts with gas?", a: "A car" },
  { q: "What can you serve but not eat?", a: "A tennis ball" }
];

module.exports = {
  name: "riddle",
  description: "Sends a random riddle and reveals the answer after some time.",
  execute(msg) {
    const r = riddles[Math.floor(Math.random() * riddles.length)];
    const delay = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;

    msg.reply(`🧩 Riddle Time:\n${r.q}\n\n⏳ Answer will be revealed soon...`);

    setTimeout(() => {
      msg.reply(`✅ Answer: *${r.a}*`);
    }, delay);
  }
};

