module.exports = {
  name: 'tagall',
  async execute(msg, client) {
    if (!msg.isGroup) return msg.reply("❌ This command only works in groups.");

    const groupMetadata = await client.groupMetadata(msg.from);
    const members = groupMetadata.participants.map(p => p.id.replace(/@c.us/g, ""));
    
    const mentions = members.map(num => `@${num}`).join(" ");
    msg.reply(`📢 *Tagging everyone:*\n\n${mentions}`, null, { mentions: members.map(num => `${num}@c.us`) });
  }
};
