module.exports = {
  name: 'demote',
  async execute(msg, client) {
    if (!msg.isGroup || !msg.quoted) return msg.reply("❌ Reply to someone to demote.");

    const isAdmin = msg.isGroup && msg.author.includes("@g.us");
    if (!isAdmin) return msg.reply("🚫 You must be a group admin to use this.");

    const userToDemote = msg.quoted.sender;
    await client.groupParticipantsUpdate(msg.from, [userToDemote], "demote");
    msg.reply(`🧢 Demoted @${userToDemote.split("@")[0]} from admin.`, null, {
      mentions: [userToDemote]
    });
  }
};
