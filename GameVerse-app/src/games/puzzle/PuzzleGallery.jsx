import React from "react";
import { useNavigate } from "react-router-dom";


/*
  PuzzleGallery
  - Shows a grid of images (images you provided)
  - On click it navigates to /difficulty and passes chosen image via location state
*/

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
  "/images/img13.jpg"
];

export default function PuzzleGallery() {
  const navigate = useNavigate();

  function chooseImage(src) {
    // pass the chosen image to difficulty page
    navigate("/puzzle/difficulty", { state: { image: src } });
  }

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Pick a Puzzle</h1>

      <div className="gallery-grid">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-item" onClick={() => chooseImage(src)}>
            <img src={src} alt={`p${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}