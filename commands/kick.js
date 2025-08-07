const { GroupParticipantUpdate } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'kick',
  description: 'Kick mentioned user from the group',
  category: 'moderation',
  async execute(msg, conn, args) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('You must be an admin to use this.');
    if (!msg.mentionedJid[0]) return msg.reply('Tag the person you want to kick.');

    const user = msg.mentionedJid[0];
    await conn.groupParticipantsUpdate(msg.chat, [user], 'remove');
    msg.reply(`User removed: @${user.split('@')[0]}`, { mentions: [user] });
  }
};
