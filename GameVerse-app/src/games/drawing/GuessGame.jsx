import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DrawingCanvas from "./DrawingCanvas";
import GuessList from "./GuessList";
import "./drawing.css";

const trainedWords = [
  "alarm clock",
  "ambulance",
  "angel",
  "animal migration",
  "ant",
  "anvil",
  "apple",
  "arm",
  "asparagus",
  "axe"
];

export default function GuessGame() {
  const canvasRef = useRef(null);
  const [word] = useState(trainedWords[Math.floor(Math.random() * trainedWords.length)]);
  const [time, setTime] = useState(20);
  const [guesses, setGuesses] = useState([]);

  // Timer countdown
  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  // AI prediction loop
  useEffect(() => {
    const interval = setInterval(async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        // Check if canvas is empty
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        // Check if all pixels are white/transparent (empty canvas)
        let isEmpty = true;
        for (let i = 0; i < pixels.length; i += 4) {
          // If any pixel has significant darkness (not white), canvas is not empty
          if (pixels[i + 3] > 0) { // alpha channel
            isEmpty = false;
            break;
          }
        }
        
        if (isEmpty) {
          setGuesses([]);
          return;
        }

        // Resize canvas to 28x28
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 28;
        tempCanvas.height = 28;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, 28, 28);
        tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 28, 28);

        const image = tempCanvas.toDataURL("image/png");

        console.log("Sending prediction request...", {
          imageLength: image.length,
          timestamp: new Date().toISOString()
        });

        const res = await axios.post(
          "http://localhost:8000/predict",
          { image: image },
          { timeout: 5000 }
        );
        
        console.log("Prediction response:", res.data);
        
        if (res.data && res.data.guesses && res.data.guesses.length > 0) {
          let filtered = res.data.guesses.filter(g => g.confidence > 0.05);
          filtered.sort((a, b) => b.confidence - a.confidence);
          setGuesses(filtered.slice(0, 3));
        } else {
          setGuesses([{ label: "No predictions yet...", confidence: 0 }]);
        }
      } catch (err) {
        console.error("AI prediction failed:", {
          message: err.message,
          code: err.code,
          response: err.response?.data,
          timestamp: new Date().toISOString()
        });
        
        if (err.code === "ECONNABORTED") {
          setGuesses([{ label: "Backend timeout (slow connection)", confidence: 0 }]);
        } else if (err.message.includes("Network")) {
          setGuesses([{ label: "Backend not reachable", confidence: 0 }]);
        } else {
          setGuesses([{ label: "Backend error...", confidence: 0 }]);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quick-draw-game">
      <div className="quick-header">
        <h1>Let's, Draw!</h1>
        <p>Draw the word before time runs out</p>
      </div>

      <div className="timer-badge">{time}s</div>

      <div className="word-box">
        Draw: <strong>{word}</strong>
      </div>

      <div className="draw-area">
        <DrawingCanvas ref={canvasRef} />
      </div>

      <GuessList guesses={guesses} />
    </div>
  );
}
