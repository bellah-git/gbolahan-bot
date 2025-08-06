const confessions = [
  "I pretend to hate you, but I dream about you.",
  "You're the reason my phone battery dies — always thinking about you.",
  "I once saved your selfie. Not even sorry.",
  "You're the human version of my favorite song.",
  "You're my favorite notification.",
  "Lowkey, I’ve had a crush on you for ages.",
  "You make the group chat worth it.",
  "I stalk your profile more than I should.",
  "I fake laugh at your jokes just to talk to you.",
  "Your DP is the wallpaper in my heart.",
  "I've deleted and retyped a text to you 20 times.",
  "You're the main character in my daydreams.",
  "I skip group messages just to find yours.",
  "I reread our chats when I'm bored.",
  "Sometimes I type and delete messages to get your attention.",
  "You’re the only reason I still open WhatsApp.",
  "Your status updates are my daily motivation.",
  "I act chill but I get butterflies when I see your name.",
  "You’ve unknowingly made me blush more than once.",
  "You’re the reason I smile at my phone like a weirdo.",
  "My playlist is secretly about you.",
  "You're my top search in the chat list.",
  "I want to reply fast, but I wait just to seem cool.",
  "I noticed when you changed your profile pic… twice.",
  "I lowkey get jealous when you reply others first.",
  "I faked a typo just to keep the convo going.",
  "Your voice note? I’ve played it 5 times.",
  "If I could send hearts without seeming weird, I would.",
  "I once tagged you in a meme hoping you'd notice.",
  "I know your typing rhythm… that's how much I pay attention.",
  "You're the only one who makes me nervous typing.",
  "I feel like you read my mind when we chat.",
  "Sometimes I imagine our replies like scenes in a movie.",
  "I screenshot sweet things you say.",
  "I check your 'last seen' like it’s a habit.",
  "You’re not just cute — you're chatworthy.",
  "I overthink your one-word replies like essays.",
  "I scroll back to your old profile pics.",
  "You're the reason my screen time is embarrassing.",
  "You’re the plot twist I didn’t expect, but wanted.",
  "I once deleted my story cause you didn’t view it.",
  "I wish WhatsApp had a 'like' button — only for you.",
  "You're the reason I can't ghost this group.",
  "Every notification makes me hope it’s you.",
  "You're my daily crush and you don't even know.",
  "Your online status is my green flag.",
  "I pretend to be busy just to avoid seeming clingy.",
  "I secretly admire your comebacks.",
  "You're why I keep coming back to this app.",
  "I confess: You're stuck in my head rent-free."
];

module.exports = {
  name: 'confess',
  execute(msg) {
    const target = msg.body.slice(8).trim();
    if (!target) {
      return msg.reply("💌 Use it like this:\n`.confess @user` or `.confess Sarah`");
    }

    const random = confessions[Math.floor(Math.random() * confessions.length)];
    msg.reply(`*${target}*, ${random}`);
  }
};
