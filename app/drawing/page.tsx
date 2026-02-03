"use client"

import { useRouter } from "next/navigation"

export default function DrawingHome() {
  const router = useRouter()

  return (
    <div className="quick-draw-home">
      <button className="back-btn" onClick={() => router.push("/home")}>
        Back
      </button>
      <h1>{"Let's Draw!"}</h1>
      <button className="start-btn" onClick={() => router.push("/drawing/play")}>
        Start Drawing
      </button>
    </div>
  )
}
