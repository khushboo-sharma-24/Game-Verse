import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
  PuzzleGame
  - Receives image and gridSize via location state
  - Splits the image into tiles using CSS background positioning
  - Shuffles tiles, allows swapping two tiles by click
  - Detects win when tiles are in correct order
*/

export default function PuzzleGame() {
  const loc = useLocation();
  const navigate = useNavigate();
  const image = loc.state?.image || "/images/img1.jpg";
  const gridSize = loc.state?.gridSize || 4; // default 4x4
  const total = gridSize * gridSize;

  // tileIndices stores order of tiles: [2,0,1,3,...]
  const [tileIndices, setTileIndices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // initialize tileIndices to [0,1,2,...,total-1] then shuffle
    let base = Array.from({ length: total }, (_, i) => i);
    // shuffle with Fisher-Yates
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    setTileIndices(base);
    setMoves(0);
    setSeconds(0);
    setSelected(null);
    // eslint-disable-next-line
  }, [image, gridSize]);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  function clickTile(idx) {
    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    // swap selected and idx
    setTileIndices(prev => {
      const arr = prev.slice();
      [arr[selected], arr[idx]] = [arr[idx], arr[selected]];
      return arr;
    });
    setMoves(m => m + 1);
    setSelected(null);
  }

  // check win
  useEffect(() => {
    if (tileIndices.length === 0) return;
    const won = tileIndices.every((val, idx) => val === idx);
    if (won) {
      setTimeout(() => {
        alert(`You solved the puzzle!\nTime: ${formatTime(seconds)}\nMoves: ${moves}`);
        // on win navigate back to gallery or difficulty page
        navigate("/");
      }, 200);
    }
    // eslint-disable-next-line
  }, [tileIndices]);

  function formatTime(s) {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
  }

  // background-size for each tile: multiply by gridSize
  const bgSize = `${gridSize * 100}% ${gridSize * 100}%`;

  return (
    <div className="play-page">
      <div className="play-header">
        <div className="time-box">
          <div className="label">TIME</div>
          <div className="value">{formatTime(seconds)}</div>
        </div>

        <div className="preview-box">
          <img src={image} alt="preview" style={{
            objectFit: "contain",
            maxWidth: "110px",
            maxHeight: "110px",
            borderRadius: "8px",
          }}/>
        </div>

        <div className="moves-box">
          <div className="label">MOVES</div>
          <div className="value">{moves}</div>
        </div>
      </div>

      <div
        className="puzzle-board"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${Math.min(420, gridSize * 90)}px`,
          height: `${Math.min(420, gridSize * 90)}px`
        }}
      >
        {tileIndices.map((tileVal, i) => {
          const col = tileVal % gridSize;
          const row = Math.floor(tileVal / gridSize);
          const bgPosX = `${(col / (gridSize - 1)) * 100}%`;
          const bgPosY = `${(row / (gridSize - 1)) * 100}%`;
          const isSelected = selected === i;
          return (
            <div
              key={i}
              className={`tile ${isSelected ? "selected" : ""}`}
              onClick={() => clickTile(i)}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: bgSize,
                backgroundPosition: `${bgPosX} ${bgPosY}`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}