"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="home">
      <div className="header">
        <h1>
          <i>Select the game to START</i>
        </h1>
      </div>

      <div className="cards">
        {/* Puzzle */}
        <div className="card puzzle" onClick={() => router.push("/puzzle")}>
          <Image src="/assets/puzzle.png" alt="Puzzle" width={120} height={120} />
          <button>Puzzle</button>
        </div>

        {/* Maze */}
        <div className="card maze" onClick={() => router.push("/maze")}>
          <Image src="/assets/maze.png" alt="Maze" width={120} height={120} />
          <button>Maze</button>
        </div>

        {/* Draw */}
        <div className="card draw" onClick={() => router.push("/drawing")}>
          <Image src="/assets/draw.png" alt="Draw" width={120} height={120} />
          <button>Draw</button>
        </div>

        {/* Quiz */}
        <div className="card quiz" onClick={() => router.push("/quiz")}>
          <Image src="/assets/quiz.png" alt="Quiz" width={120} height={120} />
          <button>Quiz</button>
        </div>
      </div>
    </div>
  )
}
