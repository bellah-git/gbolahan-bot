const fs = require("fs");

module.exports = {
    name: "menu",
    description: "Show the list of all commands.",
    async execute(sock, m) {
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        let games = [];
        let fun = [];
        let group = [];
        let utility = [];

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (!command.name) continue;

            // Simple category grouping by file name
            if (["riddle","trivia","fasttype","guessnum","scramble","coinflip","anagram","math","fastmath","emojiquiz","typebattle","whoisfast"].includes(command.name)) {
                games.push(command.name);
            } else if (["roast","rizz","truth","dare","insult","kill","crush","confess","secret","mirror","motiv8","mostannoying"].includes(command.name)) {
                fun.push(command.name);
            } else if (["add","kick","kickall","promote","demote","warn","welcome","tagall","tagadmin","antispam","grouplink","freeze","hijack","hidetag"].includes(command.name)) {
                group.push(command.name);
            } else {
                utility.push(command.name);
            }
        }

        let text = `ꜱᴏᴜʟㅤ㋦  |  ᴍᴇɴᴜ 📜\n\n`;

        text += `🎮 *Games*\n${games.map(c => "• " + c).join("\n")}\n\n`;
        text += `😂 *Fun*\n${fun.map(c => "• " + c).join("\n")}\n\n`;
        text += `👥 *Group*\n${group.map(c => "• " + c).join("\n")}\n\n`;
        text += `⚙️ *Utility*\n${utility.map(c => "• " + c).join("\n")}\n\n`;

        m.reply(text.trim());
    }
};
