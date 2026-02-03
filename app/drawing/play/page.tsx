"use client"

import { useEffect, useRef, useState, forwardRef } from "react"
import { useRouter } from "next/navigation"

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
  "axe",
]

// Drawing Canvas Component
const DrawingCanvas = forwardRef<
  HTMLCanvasElement,
  { onClear: () => void; onUndo: () => void }
>(function DrawingCanvas({ onClear, onUndo }, canvasRef) {
  const [drawing, setDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([])

  useEffect(() => {
    if (canvasRef && "current" in canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.lineWidth = 5
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = "#000"
        context.fillStyle = "#fff"
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        setCtx(context)
      }
    }
  }, [canvasRef])

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef || !("current" in canvasRef) || !canvasRef.current) {
      return { x: 0, y: 0 }
    }
    const rect = canvasRef.current.getBoundingClientRect()
    let clientX: number, clientY: number

    if ("touches" in e) {
      clientX = e.touches[0]?.clientX ?? 0
      clientY = e.touches[0]?.clientY ?? 0
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ctx) return
    const pos = getPointerPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setDrawing(true)
    setPaths((prev) => [...prev, [{ x: pos.x, y: pos.y }]])
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing || !ctx) return
    const pos = getPointerPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()

    setPaths((prev) => {
      const newPaths = [...prev]
      newPaths[newPaths.length - 1].push({ x: pos.x, y: pos.y })
      return newPaths
    })
  }

  const stopDraw = () => setDrawing(false)

  const clearLastStroke = () => {
    if (
      !ctx ||
      paths.length === 0 ||
      !canvasRef ||
      !("current" in canvasRef) ||
      !canvasRef.current
    )
      return
    const newPaths = [...paths]
    newPaths.pop()
    setPaths(newPaths)

    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    newPaths.forEach((stroke) => {
      if (stroke.length > 0) {
        ctx.beginPath()
        ctx.moveTo(stroke[0].x, stroke[0].y)
        stroke.forEach((pt) => ctx.lineTo(pt.x, pt.y))
        ctx.stroke()
      }
    })
    onUndo()
  }

  const clearAll = () => {
    if (!ctx || !canvasRef || !("current" in canvasRef) || !canvasRef.current) return
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setPaths([])
    onClear()
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="draw-canvas"
        style={{
          cursor: "crosshair",
          touchAction: "none",
          border: "1px solid #000",
          backgroundColor: "#fff",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="clear-btn" onClick={clearLastStroke}>
          Undo
        </button>
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </>
  )
})

// Guess List Component
function GuessList({ guesses }: { guesses: { label: string; confidence: number }[] }) {
  return (
    <div className="guess-panel">
      <h3>AI guesses</h3>
      <ul>
        {guesses.length === 0 && <li>Start drawing to see AI guesses...</li>}
        {guesses.map((g, i) => (
          <li key={i}>
            Is it a <strong>{g.label}</strong>? ({(g.confidence * 100).toFixed(1)}%)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GuessGame() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [word] = useState(trainedWords[Math.floor(Math.random() * trainedWords.length)])
  const [time, setTime] = useState(20)
  const [guesses, setGuesses] = useState<{ label: string; confidence: number }[]>([])

  // Timer countdown
  useEffect(() => {
    if (time === 0) return
    const timer = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [time])

  // Simulated AI guessing (since we can't connect to local backend)
  useEffect(() => {
    const interval = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data

      // Check if canvas is empty
      let isEmpty = true
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0 && (pixels[i] < 250 || pixels[i + 1] < 250 || pixels[i + 2] < 250)) {
          isEmpty = false
          break
        }
      }

      if (isEmpty) {
        setGuesses([])
        return
      }

      // Simulated guesses based on the word
      const simulatedGuesses = trainedWords
        .map((w) => ({
          label: w,
          confidence: w === word ? 0.3 + Math.random() * 0.5 : Math.random() * 0.3,
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3)

      setGuesses(simulatedGuesses)
    }, 1000)

    return () => clearInterval(interval)
  }, [word])

  return (
    <div className="quick-draw-game">
      <button className="back-btn" onClick={() => router.push("/drawing")}>
        Back
      </button>
      <div className="quick-header">
        <h1>{"Let's Draw!"}</h1>
        <p>Draw the word before time runs out</p>
      </div>

      <div className="timer-badge">{time}s</div>

      <div className="word-box">
        Draw: <strong>{word}</strong>
      </div>

      <div className="draw-area">
        <DrawingCanvas
          ref={canvasRef}
          onClear={() => setGuesses([])}
          onUndo={() => {}}
        />
      </div>

      <GuessList guesses={guesses} />
    </div>
  )
}
