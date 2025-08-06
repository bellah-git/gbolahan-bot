const questions = [
  "Who is most likely to get arrested?",
  "Who gossips the most?",
  "Who is the biggest simp?",
  "Who always comes late?",
  "Who’s most likely to go viral?",
  "Who eats the most?",
  "Who never replies to messages?",
  "Who will marry first?",
  "Who flirts the most?",
  "Who talks too much?",
  "Who spends the most time online?",
  "Who’s secretly rich?",
  "Who always complains?",
  "Who’s the most dramatic?",
  "Who laughs at everything?",
  "Who is most likely to ghost someone?",
  "Who is always online but never replies?",
  "Who is the clown of the group?",
  "Who starts fights and disappears?",
  "Who’s always broke?",
  "Who has the best comeback?",
  "Who will become famous?",
  "Who acts tough but is soft?",
  "Who overthinks everything?",
  "Who gets friendzoned the most?",
  "Who gives the worst advice?",
  "Who simps the hardest?",
  "Who’s always hungry?",
  "Who falls in love too easily?",
  "Who has secret beef with someone?",
  "Who’s the main character?",
  "Who would survive a zombie apocalypse?",
  "Who’s always causing drama?",
  "Who should be banned from WhatsApp?",
  "Who can't keep a secret?",
  "Who tries too hard to be funny?",
  "Who is always changing profile pics?",
  "Who knows everyone's gist?",
  "Who stalks statuses but never comments?",
  "Who is most likely to rage quit a game?"
];

module.exports = {
  name: 'who',
  execute(msg) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    msg.reply(`🕵️ ${random}`);
  }
};
