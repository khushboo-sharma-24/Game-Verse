import React, { useState } from "react";
import questions from "./questions";
import "./TechQuiz.css";

function TechQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === questions[current].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct Answer!");
    } else {
      setFeedback(
        `❌ Wrong Answer! Correct answer is: ${questions[current].answer}`
      );
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setFeedback("");
    setCurrent(current + 1);
  };

  if (current >= questions.length) {
    return (
      <div className="quiz-card">
        <h2>🎉 Quiz Completed</h2>
        <p className="score">
          Your Score: <span>{score}</span> / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      {/* Floating Background */}
      <div className="floating-bg">
        <span>{"</>"}</span>
        <span>{"{}"}</span>
        <span>{"AI"}</span>
        <span>{"⚙️"}</span>
        <span>{"💻"}</span>
        <span>{"☁️"}</span>
      </div>

      <div className="quiz-card">
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
            Next Question →
          </button>
        )}

        <p className="progress">
          Question {current + 1} / {questions.length}
        </p>
      </div>
    </div>
  );
}

export default TechQuiz;
