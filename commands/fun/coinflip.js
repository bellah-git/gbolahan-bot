module.exports = {
    name: 'coinflip',
    description: 'Flip a coin',
    async execute(sock, message, args, { from }) {
        const coinResults = [
            { result: "Heads", messages: [
                "🪙 The coin landed on Heads!",
                "🪙 It's Heads! Good choice!",
                "🪙 Heads up! Lucky you!",
                "🪙 The coin shows Heads!",
                "🪙 Heads it is!",
                "🪙 Heads for the win!",
                "🪙 The coin flipped to Heads!",
                "🪙 Heads! Fortune smiles upon you!",
                "🪙 It's Heads! Make a wish!",
                "🪙 Heads! Your lucky day!",
                "🪙 The coin landed on Heads!",
                "🪙 It's Heads! Good choice!",
                "🪙 Heads up! Lucky you!",
                "🪙 The coin shows Heads!",
                "🪙 Heads it is!",
                "🪙 Heads for the win!",
                "🪙 The coin flipped to Heads!",
                "🪙 Heads! Fortune smiles upon you!",
                "🪙 It's Heads! Make a wish!",
                "🪙 Heads! Your lucky day!",
                "🪙 The coin landed on Heads!",
                "🪙 It's Heads! Good choice!",
                "🪙 Heads up! Lucky you!",
                "🪙 The coin shows Heads!",
                "🪙 Heads it is!",
                "🪙 Heads for the win!",
                "🪙 The coin flipped to Heads!",
                "🪙 Heads! Fortune smiles upon you!",
                "🪙 It's Heads! Make a wish!",
                "🪙 Heads! Your lucky day!"
            ]},
            { result: "Tails", messages: [
                "🪙 The coin landed on Tails!",
                "🪙 It's Tails! Better luck next time!",
                "🪙 Tails! Don't give up!",
                "🪙 The coin shows Tails!",
                "🪙 Tails it is!",
                "🪙 Tails for the brave!",
                "🪙 The coin flipped to Tails!",
                "🪙 Tails! Try again!",
                "🪙 It's Tails! Stay positive!",
                "🪙 Tails! Your adventure begins!",
                "🪙 The coin landed on Tails!",
                "🪙 It's Tails! Better luck next time!",
                "🪙 Tails! Don't give up!",
                "🪙 The coin shows Tails!",
                "🪙 Tails it is!",
                "🪙 Tails for the brave!",
                "🪙 The coin flipped to Tails!",
                "🪙 Tails! Try again!",
                "🪙 It's Tails! Stay positive!",
                "🪙 Tails! Your adventure begins!",
                "🪙 The coin landed on Tails!",
                "🪙 It's Tails! Better luck next time!",
                "🪙 Tails! Don't give up!",
                "🪙 The coin shows Tails!",
                "🪙 Tails it is!",
                "🪙 Tails for the brave!",
                "🪙 The coin flipped to Tails!",
                "🪙 Tails! Try again!",
                "🪙 It's Tails! Stay positive!",
                "🪙 Tails! Your adventure begins!"
            ]}
        ];
        
        const randomResult = coinResults[Math.floor(Math.random() * coinResults.length)];
        const randomMessage = randomResult.messages[Math.floor(Math.random() * randomResult.messages.length)];
        
        await sock.sendMessage(from, { text: randomMessage }, { quoted: message });
    }
};
