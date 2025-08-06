module.exports = {
  name: 'menu',
  execute(msg) {
    const menu = `
╭───❏ *FULL BOT MENU* ❏───╮

• .rizz
• .roast
• .trivia
• .menu
• .setmode public/private
• .sticker
• .image
• .promote
• .demote
• .tagall
• .antispam on/off
• .ytmp3 [link]
• .ytmp4 [link]
• .tiktok [link]
• .instagram [link]
• .ai [your message]
• .fasttype
• .math
• .guessnum
• .truth
• .dare
• .riddle
• .typebattle

╰──────────────╯
_Bot by: Gbolahan_
`;
    msg.reply(menu);
  }
};
