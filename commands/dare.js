const dares = [
  "Send a 5-second voice note laughing like a villain.",
  "Say your crush’s name in the group (no censor).",
  "Send a fake breakup message to someone random.",
  "Change your name to 'Emotional Damage' for 1 hour.",
  "Screenshot your home screen and share it.",
  "Say 'I love you' to the last person you DMed.",
  "Send a voice note saying 'I'm a chicken 🐔'.",
  "Pretend to cry and send a voice note.",
  "Text someone 'I need you' without context.",
  "Put 'I'm single and ready to mingle' in your bio.",
  "Send the last thing you copied to your clipboard.",
  "Talk to your hand and send a video of it.",
  "Imitate someone in the group for 10 seconds.",
  "Call your crush and hang up after 3 seconds.",
  "Act like a dog in voice note for 5 seconds.",
  "Send a selfie without using a filter.",
  "Type your biggest secret but delete it before sending.",
  "Send your last photo from your gallery here.",
  "Put a funny emoji in your name for 1 day.",
  "Make a weird sound and send it as a voice note.",
  "Post 'I'm dumb lol' on your WhatsApp story for 5 minutes.",
  "Shout 'I love spaghetti!' and send the audio.",
  "Chat only in emojis for the next 10 messages.",
  "Try to sing a song with your mouth closed (voice note).",
  "Send a pick-up line to someone random in your contact list.",
  "Act like you’re crying and send proof.",
  "Tell a weird fact about yourself.",
  "Let someone here control your next status update.",
  "Do 10 jumping jacks and say each number out loud.",
  "Record yourself clapping and say 'Bravo me!'"
];

module.exports = {
  name: 'dare',
  execute(msg) {
    const pick = dares[Math.floor(Math.random() * dares.length)];
    msg.reply(`🎯 *Dare:* ${pick}`);
  }
};
