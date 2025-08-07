const welcomeGroups = new Set();

module.exports = {
  name: 'welcome',
  description: 'Toggle welcome messages in the group',
  category: 'moderation',
  async execute(msg) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('Admin only.');

    const chat = msg.chat;
    if (welcomeGroups.has(chat)) {
      welcomeGroups.delete(chat);
      msg.reply('❌ Welcome messages disabled.');
    } else {
      welcomeGroups.add(chat);
      msg.reply('✅ Welcome messages enabled.');
    }
  },
  onJoin: async (conn, chat, user) => {
    if (welcomeGroups.has(chat)) {
      await conn.sendMessage(chat, { text: `Welcome @${user.split('@')[0]} 👋`, mentions: [user] });
    }
  }
};
