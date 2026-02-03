"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SelectDifficulty() {
  const router = useRouter()
  const [image, setImage] = useState("/images/img1.jpg")

  useEffect(() => {
    const storedImage = sessionStorage.getItem("puzzleImage")
    if (storedImage) {
      setImage(storedImage)
    }
  }, [])

  function startPlay(gridSize: number) {
    sessionStorage.setItem("puzzleGridSize", String(gridSize))
    router.push("/puzzle/play")
  }

  return (
    <div className="difficulty-page">
      <button className="back-btn" onClick={() => router.push("/puzzle")}>
        Back
      </button>
      <div className="difficulty-card">
        <Image
          src={image}
          alt="selected"
          width={200}
          height={200}
          className="difficulty-preview"
        />
        <div className="difficulty-buttons">
          <button className="btn easy" onClick={() => startPlay(3)}>
            EASY (3x3)
          </button>
          <button className="btn medium" onClick={() => startPlay(4)}>
            MEDIUM (4x4)
          </button>
          <button className="btn standard" onClick={() => startPlay(5)}>
            STANDARD (5x5)
          </button>
          <button className="btn hard" onClick={() => startPlay(6)}>
            HARD (6x6)
          </button>
        </div>
      </div>
    </div>
  )
}
