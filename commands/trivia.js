const triviaQuestions = [
  { q: "What is the capital of France?", a: "Paris" },
  { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
  { q: "What is the largest planet in our solar system?", a: "Jupiter" },
  { q: "Which year did World War II end?", a: "1945" },
  { q: "What is the chemical symbol for gold?", a: "Au" },
  { q: "Who is the author of Harry Potter?", a: "J.K. Rowling" },
  { q: "What is the hardest natural substance?", a: "Diamond" },
  { q: "What is the national sport of Japan?", a: "Sumo Wrestling" },
  { q: "Which gas do plants absorb from the atmosphere?", a: "Carbon Dioxide" },
  { q: "What is the square root of 144?", a: "12" },
  { q: "Which animal is known as the King of the Jungle?", a: "Lion" },
  { q: "Which is the smallest continent?", a: "Australia" },
  { q: "What is the longest river in the world?", a: "Nile River" },
  { q: "Who developed the theory of relativity?", a: "Albert Einstein" },
  { q: "Which is the fastest land animal?", a: "Cheetah" },
  { q: "In which country is the Great Pyramid of Giza?", a: "Egypt" },
  { q: "Which is the tallest mountain in the world?", a: "Mount Everest" },
  { q: "What is the capital of Nigeria?", a: "Abuja" },
  { q: "Who was the first man on the moon?", a: "Neil Armstrong" },
  { q: "Which ocean is the largest?", a: "Pacific Ocean" },
  { q: "Which country invented paper?", a: "China" },
  { q: "Which is the most spoken language in the world?", a: "English (by learners) / Mandarin (native speakers)" },
  { q: "Which continent is known as the 'Dark Continent'?", a: "Africa" },
  { q: "What is H2O commonly known as?", a: "Water" },
  { q: "What is the currency of Japan?", a: "Yen" },
  { q: "How many continents are there?", a: "Seven" },
  { q: "What is the capital city of Italy?", a: "Rome" },
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "Who discovered gravity?", a: "Isaac Newton" },
  { q: "What is the capital city of Ghana?", a: "Accra" },
  { q: "Which is the largest desert in the world?", a: "Sahara Desert" },
  { q: "What is the freezing point of water in Celsius?", a: "0°C" },
  { q: "Which is the national animal of India?", a: "Tiger" },
  { q: "What is the boiling point of water in Celsius?", a: "100°C" },
  { q: "Which planet is closest to the sun?", a: "Mercury" },
  { q: "Which organ pumps blood in the human body?", a: "Heart" },
  { q: "Which instrument measures temperature?", a: "Thermometer" },
  { q: "How many players are there in a football team?", a: "11" },
  { q: "What is the capital city of Kenya?", a: "Nairobi" }
];

module.exports = {
  name: "trivia",
  description: "Asks a trivia question and reveals the answer after some time.",
  execute(msg) {
    const trivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    const delay = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;

    msg.reply(`❓ Trivia Time:\n${trivia.q}\n\n⏳ Think fast, answer before time runs out!`);

    setTimeout(() => {
      msg.reply(`✅ Answer: *${trivia.a}*`);
    }, delay);
  }
};

