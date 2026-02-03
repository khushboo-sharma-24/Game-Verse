import React from "react";
import { useNavigate } from "react-router-dom";
import "./drawing.css";

export default function DrawingHome() {
  const navigate = useNavigate();

  const handleStartDrawing = () => {
    navigate("/drawing/play");
  };

  return (
    <div className="quick-draw-home">
      <h1>Let's, Draw!</h1>
      <button className="start-btn" onClick={handleStartDrawing}>
        Start Drawing
      </button>
    </div>
  );
}
