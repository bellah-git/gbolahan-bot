module.exports = {
  name: "menu",
  description: "Shows all commands in styled format",
  execute(msg) {
    const menuText = `
🌟 ꜱᴏᴜʟㅤ㋦ — Fun & Games 🌟
🎯 .rizz – Smooth or funny pickup lines.
🔥 .roast – Playfully roast your friends.
💔 .crush – Fun random crush reveal.
💀 .kill – Playful “elimination” joke.
🪙 .coinflip – Flip a coin.
🧠 .trivia – Quiz questions to test knowledge.
🕵️ .riddle – Gives you a riddle to solve.
🔀 .scramble – Unscramble the given word.
🔠 .anagram – Solve an anagram challenge.
⌨️ .typebattle – Compete to type the fastest.
⚡ .fasttype – Test fast typing skills.
🎲 .guessnum – Guess the secret number.
🔢 .fastmath – Solve math problems quickly.
➕ .math – Do custom math calculations.
🧮 .quickcalc – Quick calculation tool.
🤔 .truth – Random truth question.
😈 .dare – Random dare challenge.
🎭 .emojiquiz – Guess the phrase from emojis.
🪞 .mirror – Repeat your message creatively.
😡 .mostannoying – Send something annoying.
🗯️ .insult – Random playful insult.

🛡️ ꜱᴏᴜʟㅤ㋦ — Moderation 🛡️
🚪 .kick – Remove a member.
🚪 .kickall – Remove all non-admin members.
➕ .add – Add a member.
⬆️ .promote – Promote a member to admin.
⬇️ .demote – Remove admin rights.
📣 .tagall – Mention everyone in the group.
📢 .tagadmin – Mention all admins.
⚠️ .warn – Warn a member.
👋 .welcome – Enable/disable welcome messages.
🔗 .grouplink – Get the group link.
🛡️ .antispam – Enable anti-spam protection.
❄️ .freeze – Temporarily “freeze” group activity.

🤖 ꜱᴏᴜʟㅤ㋦ — AI & Info 🤖
💬 .confess – Send an anonymous confession.
📜 .motiv8 – Get a motivational quote.
📊 .ping – Check bot’s response time.
📜 .secret – Send a hidden/secret message.

👑 ꜱᴏᴜʟㅤ㋦ — Owner Only 👑
🔄 .setmode – Switch between public/private mode.
♻️ .restart – Restart the bot.
⛔ .shutdown – Turn off the bot.
📢 .bc – Broadcast a message.
📋 .menu – Show all commands menu.
`;

    msg.reply(menuText);
  }
};
