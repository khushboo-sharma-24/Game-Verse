import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import landingImage from "../assets/gameverse.png"; // change path if needed

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <img
        src={landingImage}
        alt=""
        className="landing-image"
        draggable="false"
      />

      <button
        className="start-btn"
        onClick={() => navigate("/login")}
      >
        Start
      </button>
    </div>
  );
};

export default LandingPage;
