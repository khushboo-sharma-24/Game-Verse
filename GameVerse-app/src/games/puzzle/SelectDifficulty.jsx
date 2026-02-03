import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
  SelectDifficulty
  - Shows the chosen image and difficulty buttons
  - On choose, navigates to /play and passes both image and gridSize
*/

export default function SelectDifficulty() {
  const nav = useNavigate();
  const loc = useLocation();
  const image = loc.state?.image || "/images/img1.jpg";

  function startPlay(gridSize) {
    nav("/puzzle/play", { state: { image, gridSize } });
  }

  return (
    <div className="difficulty-page">
      <div className="difficulty-card">
        <img src={image} alt="selected" className="difficulty-preview" />
        <div className="difficulty-buttons">
          <button className="btn easy" onClick={() => startPlay(3)}>EASY (3×3)</button>
          <button className="btn medium" onClick={() => startPlay(4)}>MEDIUM (4×4)</button>
          <button className="btn standard" onClick={() => startPlay(5)}>STANDARD (5×5)</button>
          <button className="btn hard" onClick={() => startPlay(6)}>HARD (6×6)</button>
        </div>
      </div>
    </div>
  );
}