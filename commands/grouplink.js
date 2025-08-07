module.exports = {
  name: 'grouplink',
  description: 'Get the group invite link',
  category: 'moderation',
  async execute(msg, conn) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('Admin only.');

    const code = await conn.groupInviteCode(msg.chat);
    msg.reply(`Group Invite Link:\nhttps://chat.whatsapp.com/${code}`);
  }
};
