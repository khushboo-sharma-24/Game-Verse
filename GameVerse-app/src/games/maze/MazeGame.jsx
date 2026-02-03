import React, { useEffect, useState, useRef } from "react";
import "./MazeGame.css";

const SIZE = 15;

// Generate maze
const generateMaze = () => {
  const maze = Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(1));

  function carve(x, y) {
    const dirs = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ].sort(() => Math.random() - 0.5);

    maze[y][x] = 0;

    for (let [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx > 0 &&
        ny > 0 &&
        nx < SIZE - 1 &&
        ny < SIZE - 1 &&
        maze[ny][nx] === 1
      ) {
        maze[y + dy / 2][x + dx / 2] = 0;
        carve(nx, ny);
      }
    }
  }

  carve(1, 1);
  maze[SIZE - 2][SIZE - 2] = 0;
  return maze;
};

export default function MazeGame() {
  const [maze, setMaze] = useState(generateMaze());
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [enemy, setEnemy] = useState({ x: 7, y: 7 });
  const [coins, setCoins] = useState([]);
  const [win, setWin] = useState(false);

  const coinSound = useRef(null);
  const winSound = useRef(null);

  useEffect(() => {
    coinSound.current = new Audio("/sounds/coin.mp3");
    winSound.current = new Audio("/sounds/win.mp3");
  }, []);

  // Place coins randomly
  useEffect(() => {
    const c = [];
    maze.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === 0 && Math.random() < 0.08 && !(x === 1 && y === 1)) {
          c.push({ x, y });
        }
      })
    );
    setCoins(c);
  }, [maze]);

  // Player movement
  useEffect(() => {
    const handleKey = (e) => {
      if (win) return;

      let dx = 0,
        dy = 0;
      if (e.key === "ArrowUp") dy = -1;
      if (e.key === "ArrowDown") dy = 1;
      if (e.key === "ArrowLeft") dx = -1;
      if (e.key === "ArrowRight") dx = 1;

      const nx = player.x + dx;
      const ny = player.y + dy;

      if (maze[ny]?.[nx] === 0) {
        setPlayer({ x: nx, y: ny });

        setCoins((prev) => {
          const hit = prev.find((c) => c.x === nx && c.y === ny);
          if (hit && coinSound.current) coinSound.current.play();
          return prev.filter((c) => c.x !== nx || c.y !== ny);
        });

        if (nx === SIZE - 2 && ny === SIZE - 2) {
          if (winSound.current) winSound.current.play();
          setWin(true);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, maze, win]);

  // Enemy movement
  useEffect(() => {
    const interval = setInterval(() => {
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      const [dx, dy] = dirs[Math.floor(Math.random() * 4)];
      const nx = enemy.x + dx;
      const ny = enemy.y + dy;

      if (maze[ny]?.[nx] === 0 && !(nx === player.x && ny === player.y)) {
        setEnemy({ x: nx, y: ny });
      }
    }, 700);

    return () => clearInterval(interval);
  }, [enemy, maze, player]);

  const nextLevel = () => {
    setMaze(generateMaze());
    setPlayer({ x: 1, y: 1 });
    setEnemy({ x: 7, y: 7 });
    setWin(false);
  };

  return (
    <div className="game">
      {/* ✅ RENAMED CLASS */}
      <div className="maze-grid">
        {maze.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = player.x === x && player.y === y;
            const isEnemy = enemy.x === x && enemy.y === y;
            const isCoin = coins.some((c) => c.x === x && c.y === y);
            const isExit = x === SIZE - 2 && y === SIZE - 2;

            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell ? "wall" : "path"}`}
              >
                {isPlayer && "🧍"}
                {isEnemy && "👾"}
                {isCoin && "🪙"}
                {isExit && "🏁"}
              </div>
            );
          })
        )}
      </div>

      {win && (
        <div className="win">
          <h1>🎉 YOU WIN 🎉</h1>
          <button onClick={nextLevel}>Next Level ➡️</button>
        </div>
      )}
    </div>
  );
}