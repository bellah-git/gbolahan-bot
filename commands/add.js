module.exports = {
  name: 'add',
  description: 'Add a user to the group using number',
  category: 'moderation',
  async execute(msg, conn, args) {
    if (!msg.isGroup) return msg.reply('Group only command.');
    if (!msg.isAdmin) return msg.reply('You must be an admin to use this.');
    if (!args[0]) return msg.reply('Enter the phone number to add.');

    const number = args[0].replace(/[^0-9]/g, '');
    const jid = `${number}@s.whatsapp.net`;
    await conn.groupParticipantsUpdate(msg.chat, [jid], 'add');
    msg.reply(`Added user: +${number}`);
  }
};
