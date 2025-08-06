const crushLines = [
  "Someone in this group has a crush on you... 👀",
  "You make someone's heart do backflips. Guess who?",
  "A little bird told me someone likes you.",
  "You're the reason someone checks their messages 10x a day.",
  "If crushing on you is a crime, someone here is guilty!",
  "Someone's wallpaper might just be your picture.",
  "They say love is blind, but someone here has great taste.",
  "Your laugh lives rent-free in someone's head.",
  "Guess what? Someone here replays your voice notes often.",
  "You’re secretly someone’s comfort person.",
  "You're admired more than you realize.",
  "Somebody out here is catching feelings... fast!",
  "You're someone's daily dose of butterflies.",
  "Your name probably has a heart next to it in someone’s phone.",
  "You brighten up someone's chats. Always.",
  "Someone here is crushing… hard.",
  "Someone gets nervous when your name pops up.",
  "You’re the main character in someone's WhatsApp stories.",
  "They can’t stop staring at your profile pic.",
  "Someone is lowkey obsessed with your energy.",
  "You’re the one that someone keeps typing to and deleting.",
  "Someone even knows your online times — don’t ask who.",
  "You’re the reason behind a shy smile.",
  "Even your typing dots give someone butterflies.",
  "You're the reason someone avoids ghosting this group."
];

module.exports = {
  name: 'crush',
  execute(msg) {
    const target = msg.body.slice(6).trim();
    if (!target) return msg.reply("💘 Use it like:\n`.crush @user` or `.crush Alex`");

    const line = crushLines[Math.floor(Math.random() * crushLines.length)];
    msg.reply(`*${target}*, ${line}`);
  }
};
