const warnings = {};

module.exports = {
  name: 'warn',
  description: 'Warn a user in the group',
  category: 'moderation',
  async execute(msg, conn) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('Admin only.');

    const user = msg.mentionedJid[0];
    if (!user) return msg.reply('Tag a user to warn.');

    const id = `${msg.chat}_${user}`;
    warnings[id] = (warnings[id] || 0) + 1;

    if (warnings[id] >= 3) {
      await conn.groupParticipantsUpdate(msg.chat, [user], 'remove');
      msg.reply(`User removed after 3 warnings.`);
    } else {
      msg.reply(`Warned @${user.split('@')[0]} (${warnings[id]}/3)`, { mentions: [user] });
    }
  }
};
