const fs = require('fs');

module.exports = {
  name: 'menu',
  execute(msg) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commandNames = commandFiles.map(file => '.' + file.replace('.js', ''));

    const menuText = `🧾 *Bellah Bot Menu*\n\n` +
                     commandNames.join('\n') +
                     `\n\n🤖 Bot by: *Gbolahan* (@bellah-git)\nTotal: ${commandNames.length} commands`;

    msg.reply(menuText);
  }
};

