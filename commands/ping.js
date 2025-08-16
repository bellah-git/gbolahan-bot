module.exports = {
    name: "ping",
    description: "Check the bot's response speed.",
    async execute(sock, m) {
        const start = Date.now();
        const responses = [
            "Pong! ⚡",
            "I’m alive and kicking! ✅",
            "Still here, still sharp. 🔥",
            "Your connection feels smooth. 📡",
            "Yes boss, reporting for duty. 🫡",
            "Responding faster than your WiFi. 🚀",
            "Ping received, pong returned. 🎯",
            "No lag here, only speed. 🏎️",
            "Testing complete, I’m awake. 👀",
            "All systems green, you good? 💻"
        ];
        const random = responses[Math.floor(Math.random() * responses.length)];
        const end = Date.now();
        m.reply(`${random}\n⏱️ Response time: ${end - start}ms`);
    }
};
