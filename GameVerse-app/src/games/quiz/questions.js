// Base 100 questions (sample)
const baseQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None of these"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "Which SQL command is used to fetch data?",
    options: ["INSERT", "DELETE", "SELECT", "UPDATE"],
    answer: "SELECT"
  },
  {
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "Which OS is open source?",
    options: ["Windows", "Linux", "MacOS", "DOS"],
    answer: "Linux"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: "//"
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: "JSON.parse()"
  }
];

// 🔥 AUTO-GENERATE 1000 QUESTIONS
const questions = [];

for (let i = 0; i < 100; i++) {
  baseQuestions.forEach((q, index) => {
    questions.push({
      question: `${q.question} (Q${i * 10 + index + 1})`,
      options: q.options,
      answer: q.answer
    });
  });
}

export default questions;
