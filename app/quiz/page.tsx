"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Base questions
const baseQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None of these",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    question: "Which SQL command is used to fetch data?",
    options: ["INSERT", "DELETE", "SELECT", "UPDATE"],
    answer: "SELECT",
  },
  {
    question: "Which data structure follows FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    question: "Which OS is open source?",
    options: ["Windows", "Linux", "MacOS", "DOS"],
    answer: "Linux",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: "//",
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: "JSON.parse()",
  },
]

// Generate more questions
const questions = baseQuestions.map((q, index) => ({
  question: `${q.question} (Q${index + 1})`,
  options: q.options,
  answer: q.answer,
}))

export default function QuizPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleAnswer = (option: string) => {
    setSelected(option)

    if (option === questions[current].answer) {
      setScore(score + 1)
      setFeedback("Correct Answer!")
    } else {
      setFeedback(`Wrong Answer! Correct answer is: ${questions[current].answer}`)
    }
  }

  const nextQuestion = () => {
    setSelected(null)
    setFeedback("")
    setCurrent(current + 1)
  }

  if (current >= questions.length) {
    return (
      <div className="quiz-wrapper">
        <button className="back-btn" onClick={() => router.push("/home")}>
          Back
        </button>
        <div className="quiz-card">
          <h2>Quiz Completed</h2>
          <p className="score">
            Your Score: <span>{score}</span> / {questions.length}
          </p>
          <button className="next-btn" onClick={() => router.push("/home")}>
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-wrapper">
      <button className="back-btn" onClick={() => router.push("/home")}>
        Back
      </button>

      {/* Floating Background */}
      <div className="floating-bg">
        <span>{"</>"}</span>
        <span>{"{}"}</span>
        <span>{"AI"}</span>
        <span>{"gear"}</span>
        <span>{"laptop"}</span>
        <span>{"cloud"}</span>
      </div>

      <div className="quiz-card">
        <h1 style={{ textAlign: "center", color: "#21e6c1", marginBottom: "20px" }}>
          Tech Quiz
        </h1>
        <h3 className="question">{questions[current].question}</h3>

        <div className="options">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              disabled={selected !== null}
              className={
                selected === opt
                  ? opt === questions[current].answer
                    ? "correct"
                    : "wrong"
                  : ""
              }
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && <p className="feedback">{feedback}</p>}

        {selected && (
          <button className="next-btn" onClick={nextQuestion}>
            {"Next Question ->"}
          </button>
        )}

        <p className="progress">
          Question {current + 1} / {questions.length}
        </p>
      </div>
    </div>
  )
}
