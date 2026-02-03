"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="landing-wrapper">
      <Image
        src="/assets/gameverse.png"
        alt="GameVerse Logo"
        width={500}
        height={500}
        className="landing-image"
        draggable="false"
        priority
      />

      <button className="start-btn" onClick={() => router.push("/login")}>
        Start
      </button>
    </div>
  )
}
