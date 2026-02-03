import React from "react";
import TechQuiz from "./TechQuiz";

function QuizHome() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#21e6c1" }}>
        Tech Quiz
      </h1>
      <TechQuiz />
    </div>
  );
}

export default QuizHome;
