module.exports = {
  name: 'trivia',
  async execute(msg) {
    const questions = [
      "What is the capital of Canada?\nA) Toronto\nB) Ottawa\nC) Vancouver\nD) Montreal",
      "Which planet is closest to the sun?\nA) Mercury\nB) Venus\nC) Earth\nD) Mars",
      "What is the largest mammal?\nA) Elephant\nB) Blue Whale\nC) Giraffe\nD) Hippo",
      "What element has the chemical symbol 'O'?\nA) Oxygen\nB) Gold\nC) Osmium\nD) Opium",
      "Who painted the Mona Lisa?\nA) Picasso\nB) Da Vinci\nC) Van Gogh\nD) Rembrandt",
      // Add more below
      "Which ocean is the largest?\nA) Atlantic\nB) Indian\nC) Pacific\nD) Arctic",
      "What is the square root of 144?\nA) 10\nB) 12\nC) 14\nD) 16",
      "Which year did World War II end?\nA) 1940\nB) 1945\nC) 1950\nD) 1939",
      "Who discovered gravity?\nA) Newton\nB) Einstein\nC) Galileo\nD) Hawking",
      "What is the capital of Nigeria?\nA) Lagos\nB) Abuja\nC) Kano\nD) Ibadan",
      "How many continents are there?\nA) 5\nB) 6\nC) 7\nD) 8",
      "Who invented the lightbulb?\nA) Edison\nB) Tesla\nC) Bell\nD) Newton",
      "What is the longest river in the world?\nA) Nile\nB) Amazon\nC) Yangtze\nD) Mississippi",
      "How many sides does a hexagon have?\nA) 5\nB) 6\nC) 7\nD) 8",
      "Which metal is heavier: gold or silver?\nA) Gold\nB) Silver\nC) Both equal\nD) None",
      "What’s the main ingredient in bread?\nA) Sugar\nB) Yeast\nC) Flour\nD) Salt",
      "Which planet has rings?\nA) Mars\nB) Saturn\nC) Earth\nD) Jupiter",
      "What is H2O?\nA) Hydrogen\nB) Oxygen\nC) Water\nD) Acid",
      "How many legs does a spider have?\nA) 6\nB) 8\nC) 10\nD) 12",
      "What country is known for sushi?\nA) Korea\nB) Japan\nC) China\nD) Thailand",
      "What is the smallest planet?\nA) Mercury\nB) Mars\nC) Pluto\nD) Venus",
      "Which is a prime number?\nA) 21\nB) 17\nC) 22\nD) 15",
      "How many hours in 2 days?\nA) 24\nB) 36\nC) 48\nD) 72",
      "What’s the largest desert?\nA) Sahara\nB) Gobi\nC) Arctic\nD) Antarctic",
      "How many zeros in a billion?\nA) 6\nB) 7\nC) 8\nD) 9"
    ];
    const question = questions[Math.floor(Math.random() * questions.length)];
    msg.reply(`🧠 Trivia Time:\n${question}`);
  }
};
