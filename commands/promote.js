module.exports = {
  name: 'promote',
  async execute(msg, client) {
    if (!msg.isGroup || !msg.quoted) return msg.reply("❌ Reply to someone to promote.");

    const admin = msg.participant;
    const isAdmin = msg.isGroup && msg.author.includes("@g.us");

    if (!isAdmin) return msg.reply("🚫 You must be a group admin to use this.");

    const userToPromote = msg.quoted.sender;
    await client.groupParticipantsUpdate(msg.from, [userToPromote], "promote");
    msg.reply(`✅ Promoted @${userToPromote.split("@")[0]} to admin.`, null, {
      mentions: [userToPromote]
    });
  }
};
