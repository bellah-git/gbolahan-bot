const responses = [
  "You're the reason we all mute this group.",
  "If annoying was a talent, you'd be the CEO.",
  "The group wouldn't be complete without your chaos.",
  "You’ve earned a PhD in disturbance.",
  "You probably have a side hustle annoying people.",
  "Even WhatsApp wants to block you sometimes.",
  "You bring drama, noise, and vibes — mostly noise.",
  "You keep the group alive… and annoyed.",
  "If there was an 'Annoyance Olympics', you’d win gold.",
  "Your energy is unmatched… and a bit too much.",
  "You're banned from peace and quiet.",
  "You're like background noise — constant and loud.",
  "Your comments spark more arguments than the news.",
  "You're officially this group’s alarm clock — loud and unwanted.",
  "Your voice notes come with warnings now.",
  "You’re the reason people double-check if they’re still sane.",
  "If chaos had a face…",
  "You're not annoying. You're just energy in the wrong form.",
  "Even silence avoids you.",
  "We wouldn’t survive without your nonsense. Sadly."
];

module.exports = {
  name: 'mostannoying',
  execute(msg) {
    const mentioned = msg.mentionedJid[0];
    if (!mentioned) return msg.reply("😈 Tag someone: `.mostannoying @user`");

    const name = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
    const reply = responses[Math.floor(Math.random() * responses.length)];
    msg.reply(`*${name}*, ${reply}`);
  }
};
