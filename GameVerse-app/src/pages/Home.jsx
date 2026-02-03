import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import puzzle from "../assets/puzzle.png";
import maze from "../assets/maze.png";
import draw from "../assets/draw.png";
import quiz from "../assets/quiz.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="header">
        <h1><i>Select the game to START</i></h1>
    
      </div>

      <div className="cards">
        {/* Puzzle */}
        <div className="card puzzle" onClick={() => navigate("/puzzle")}>
          <img src={puzzle} alt="Puzzle" />
          <button>Puzzle</button>
        </div>

        {/* Maze */}
        <div className="card maze" onClick={() => navigate("/maze")}>
          <img src={maze} alt="Maze" />
          <button>Maze</button>
        </div>

        {/* Draw */}
        <div className="card draw" onClick={() => navigate("/drawing")}>
          <img src={draw} alt="Draw" />
          <button>Draw</button>
        </div>

        {/* Quiz */}
        <div className="card quiz" onClick={() => navigate("/quiz")}>
          <img src={quiz} alt="Quiz" />
          <button>Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
