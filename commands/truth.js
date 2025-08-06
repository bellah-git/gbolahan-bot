const truths = [
  "What's your biggest fear?",
  "Have you ever lied to your best friend?",
  "What's your worst habit?",
  "Do you have a secret crush?",
  "Have you ever stalked someone's profile secretly?",
  "What's the dumbest thing you’ve done in love?",
  "Have you ever been caught doing something embarrassing?",
  "What’s the most childish thing you still do?",
  "Ever got caught lying and played dumb?",
  "If you could date anyone here, who would it be?",
  "What’s one thing you never told your parents?",
  "Ever got rejected badly?",
  "Have you ever faked an emotion to get something?",
  "What’s something you wish nobody ever finds out about you?",
  "Who was your first love?",
  "Have you ever broken someone’s heart on purpose?",
  "Ever acted like you didn’t care but were crying inside?",
  "What’s your wildest dream?",
  "What’s your most cringe memory from childhood?",
  "Ever pretended to like something just to fit in?",
  "What’s the last thing you searched on Google?",
  "Who here do you think has the worst fashion taste?",
  "Ever read someone’s chat without them knowing?",
  "What's your weirdest turn-on?",
  "What’s the worst lie you ever told?",
  "Have you ever ghosted someone for no reason?",
  "Have you ever flirted with two people at the same time?",
  "What’s your worst WhatsApp chat mistake?",
  "Do you regret losing someone? Who?",
  "What’s your most recent secret?"
];

module.exports = {
  name: 'truth',
  execute(msg) {
    const pick = truths[Math.floor(Math.random() * truths.length)];
    msg.reply(`🗣️ *Truth:* ${pick}`);
  }
};
