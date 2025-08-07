module.exports = {
  name: 'tagadmin',
  description: 'Tag all admins in the group',
  category: 'moderation',
  async execute(msg, conn) {
    if (!msg.isGroup) return msg.reply('Group only command.');

    const groupMetadata = await conn.groupMetadata(msg.chat);
    const admins = groupMetadata.participants.filter(p => p.admin);
    const mentions = admins.map(p => p.id);
    const names = mentions.map(m => `@${m.split('@')[0]}`).join('\n');

    await conn.sendMessage(msg.chat, { text: `*Group Admins:*\n${names}`, mentions });
  }
};
