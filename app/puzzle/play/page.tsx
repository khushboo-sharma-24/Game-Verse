"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PuzzleGame() {
  const router = useRouter()
  const [image, setImage] = useState("/images/img1.jpg")
  const [gridSize, setGridSize] = useState(4)
  const [tileIndices, setTileIndices] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    const storedImage = sessionStorage.getItem("puzzleImage")
    const storedGridSize = sessionStorage.getItem("puzzleGridSize")
    if (storedImage) setImage(storedImage)
    if (storedGridSize) setGridSize(Number(storedGridSize))
  }, [])

  useEffect(() => {
    const total = gridSize * gridSize
    const base = Array.from({ length: total }, (_, i) => i)
    // Fisher-Yates shuffle
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[base[i], base[j]] = [base[j], base[i]]
    }
    setTileIndices(base)
    setMoves(0)
    setSeconds(0)
    setSelected(null)
  }, [gridSize])

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  function clickTile(idx: number) {
    if (selected === null) {
      setSelected(idx)
      return
    }
    if (selected === idx) {
      setSelected(null)
      return
    }
    // swap selected and idx
    setTileIndices((prev) => {
      const arr = prev.slice()
      ;[arr[selected], arr[idx]] = [arr[idx], arr[selected]]
      return arr
    })
    setMoves((m) => m + 1)
    setSelected(null)
  }

  // check win
  useEffect(() => {
    if (tileIndices.length === 0) return
    const won = tileIndices.every((val, idx) => val === idx)
    if (won) {
      setTimeout(() => {
        alert(`You solved the puzzle!\nTime: ${formatTime(seconds)}\nMoves: ${moves}`)
        router.push("/home")
      }, 200)
    }
  }, [tileIndices, seconds, moves, router])

  function formatTime(s: number) {
    const mm = Math.floor(s / 60)
    const ss = s % 60
    return `${mm}:${ss < 10 ? "0" : ""}${ss}`
  }

  const bgSize = `${gridSize * 100}% ${gridSize * 100}%`

  return (
    <div className="play-page">
      <button className="back-btn" onClick={() => router.push("/puzzle/difficulty")}>
        Back
      </button>
      <div className="play-header">
        <div className="time-box">
          <div className="label">TIME</div>
          <div className="value">{formatTime(seconds)}</div>
        </div>

        <div className="preview-box">
          <Image
            src={image}
            alt="preview"
            width={110}
            height={110}
            style={{
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
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
          height: `${Math.min(420, gridSize * 90)}px`,
        }}
      >
        {tileIndices.map((tileVal, i) => {
          const col = tileVal % gridSize
          const row = Math.floor(tileVal / gridSize)
          const bgPosX = `${(col / (gridSize - 1)) * 100}%`
          const bgPosY = `${(row / (gridSize - 1)) * 100}%`
          const isSelected = selected === i
          return (
            <div
              key={i}
              className={`tile ${isSelected ? "selected" : ""}`}
              onClick={() => clickTile(i)}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: bgSize,
                backgroundPosition: `${bgPosX} ${bgPosY}`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
