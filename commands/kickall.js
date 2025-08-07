module.exports = {
  name: 'kickall',
  description: 'Kick all non-admins from the group',
  category: 'moderation',
  async execute(msg, conn) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('You must be an admin to use this.');

    const groupMetadata = await conn.groupMetadata(msg.chat);
    const participants = groupMetadata.participants;
    const admins = participants.filter(p => p.admin).map(p => p.id);

    let kicked = 0;
    for (const user of participants) {
      if (!admins.includes(user.id)) {
        await conn.groupParticipantsUpdate(msg.chat, [user.id], 'remove');
        kicked++;
      }
    }

    msg.reply(`Kicked ${kicked} non-admin(s).`);
  }
};
