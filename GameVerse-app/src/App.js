import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";

// Drawing Game
import DrawingHome from "./games/drawing/DrawingHome";
import GuessGame from "./games/drawing/GuessGame";

// Puzzle Game
import PuzzleGallery from "./games/puzzle/PuzzleGallery";
import SelectDifficulty from "./games/puzzle/SelectDifficulty";
import PuzzleGame from "./games/puzzle/PuzzleGame";

// Maze & Quiz (FIXED IMPORTS)
import MazeGame from "./games/maze/MazeGame";
import QuizHome from "./games/quiz/QuizHome";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth / Main Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Drawing Game */}
        <Route path="/drawing" element={<DrawingHome />} />
        <Route path="/drawing/play" element={<GuessGame />} />

        {/* Puzzle Game */}
        <Route path="/puzzle" element={<PuzzleGallery />} />
        <Route path="/puzzle/difficulty" element={<SelectDifficulty />} />
        <Route path="/puzzle/play" element={<PuzzleGame />} />

        {/* Maze & Quiz */}
        <Route path="/maze" element={<MazeGame />} />
        <Route path="/quiz" element={<QuizHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
