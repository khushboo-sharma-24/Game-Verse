"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
  "/images/img9.jpg",
  "/images/img10.jpg",
  "/images/img11.jpg",
  "/images/img12.jpg",
  "/images/img13.jpg",
]

export default function PuzzleGallery() {
  const router = useRouter()

  function chooseImage(src: string) {
    // Store the selected image in sessionStorage and navigate
    sessionStorage.setItem("puzzleImage", src)
    router.push("/puzzle/difficulty")
  }

  return (
    <div className="gallery-page">
      <button className="back-btn" onClick={() => router.push("/home")}>
        Back
      </button>
      <h1 className="gallery-title">Pick a Puzzle</h1>

      <div className="gallery-grid">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-item" onClick={() => chooseImage(src)}>
            <Image src={src} alt={`puzzle ${idx + 1}`} width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  )
}
