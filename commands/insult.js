const insults = [
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "You're not stupid; you just have bad luck thinking.",
  "You're as useless as the 'g' in lasagna.",
  "You're proof anyone can be annoying with enough effort.",
  "Your brain has left the chat.",
  "You're not even the main character in your own life.",
  "If I had a dollar for every smart thing you said, I'd be broke.",
  "You're the reason shampoo has instructions.",
  "Your opinions are like expired milk — no one wants them.",
  "You're as sharp as a marble.",
  "You bring everyone down to your level, then beat them with experience.",
  "You're like a software update. Annoying and unnecessary.",
  "You're the plot twist no one wanted.",
  "You're the kind of person who trips over wireless signals.",
  "You're the human equivalent of a typo.",
  "You were dropped... by WiFi and as a baby.",
  "You're like a screenshot in a voice call — irrelevant.",
  "Your vibe is buffering.",
  "You're not lazy, you're just naturally slow.",
  "You're so fake, Barbie's jealous.",
  "You're not a clown. You're the entire circus.",
  "Your battery percentage is higher than your IQ.",
  "You're the reason they put directions on shampoo bottles.",
  "You're the glitch in the group chat.",
  "You bring dial-up energy to a 5G world.",
  "You're as confusing as TikTok's algorithm.",
  "You're like a riddle — no one wants to solve you.",
  "You're more dramatic than a telenovela.",
  "You have the charisma of a wet sock.",
  "You’ve mastered the art of being forgettable.",
  "You're so dry, even the desert feels hydrated.",
  "You're the loading bar that never finishes.",
  "You're like a group chat with no replies.",
  "You're the 'left on read' of real life.",
  "You have the energy of a Monday morning alarm.",
  "You're the extra in your own story.",
  "You're the kind of person who claps when the plane lands.",
  "You're a walking bug report.",
  "You're as reliable as school WiFi.",
  "You're like an expired meme — used and annoying.",
  "You're the lag in every online game.",
  "You're the typo in a job application.",
  "You're what happens when Ctrl+Z doesn’t work.",
  "You're the unexpected update that crashes the system.",
  "You're like autocorrect — always messing things up.",
  "You're a 0-star Uber ride.",
  "You're the human version of '404 Not Found'.",
  "You're so slow, even your shadow left you.",
  "You're the bug in everyone’s code.",
  "You're the voice note that no one listens to."
];

module.exports = {
  name: 'insult',
  execute(msg) {
    const target = msg.body.slice(7).trim();
    if (!target) {
      return msg.reply("🔥 Use it like this:\n`.insult @user` or `.insult John`");
    }

    const random = insults[Math.floor(Math.random() * insults.length)];
    msg.reply(`*${target}*, ${random}`);
  }
};
