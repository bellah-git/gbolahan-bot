module.exports = {
    name: "guessnum",
    description: "Guess the number between 1–10.",
    async execute(sock, m) {
        const number = Math.floor(Math.random() * 10) + 1;
        const responses = [
            "Right now I’m secretly holding a number between one and ten, and while it sounds small and simple, the truth is that this tiny range is where human instinct gets tested the most. When the numbers are limited, people either overthink and second-guess themselves or just throw out a random choice. The beauty of this game is that it’s both pure chance and a test of confidence—are you the type to carefully think about probability or the type to trust your gut and strike fast? There’s no wrong way, but there’s only one right answer. Take your shot and see if fate is on your side.",
            
            "I have picked a number between one and ten, and though the range is small, the fun comes from how seriously you take it. Think of it like flipping a coin but with ten sides instead of two. Some players might go straight for their lucky number, others try to guess what number I’d ‘most likely’ hide, while a few just throw a random digit hoping to hit the bullseye. The real game isn’t only about being correct—it’s about the rush, the suspense, that heartbeat moment where you wonder if your voice will match the hidden choice I made.",
            
            "In my digital brain, a single number from one to ten is locked away, and it’s daring you to find it. At first glance, this seems easy, because ten options don’t feel like much, but that’s where the trap lies. The more limited the range, the more pressure you feel, because you know the answer could be just one digit away from what you say. People tend to go for numbers they feel attached to—birthdays, favorite digits, lucky charms—but randomness doesn’t play favorites. Will you be brave enough to call out your number with confidence, or will hesitation steal your chance at victory?",
            
            "Somewhere in the small but mighty line of numbers one through ten is the secret choice I’ve already made. This isn’t about knowledge, skill, or deep thinking—it’s about instinct and luck colliding in one simple guess. The tension doesn’t come from the size of the puzzle but from the human reaction to it. Guessing feels easy until it’s your turn, and then suddenly every number feels wrong and right at the same time. Imagine rolling a ten-sided dice—maybe fortune favors you today, maybe not. Either way, the thrill lies in speaking a number and waiting for the truth to be revealed."
        ];
        m.reply(responses[Math.floor(Math.random() * responses.length)] + "\n\n💭 Guess a number between 1 and 10!");
    }
};
