let antiSpamEnabled = false;

module.exports = {
  name: 'antispam',
  execute(msg) {
    antiSpamEnabled = !antiSpamEnabled;
    msg.reply(`🛡️ Anti-spam mode is now *${antiSpamEnabled ? "ON" : "OFF"}*.`);
  },
  isAntiSpamOn: () => antiSpamEnabled
};
