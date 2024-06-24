import React, { useState, useEffect } from "react";
import "./Home.css";
import EarthImage from "../../assets/EarthImage.jpg";
import { useUser } from "../../authentication/UserContext";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const img = new Image();
    img.src = EarthImage;
    img.onload = () => setBackgroundImage(EarthImage);
  }, []);

  return (
    <div
      className="centered-container"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div className="centered-box">
        <h1>Welcome, {user ? user.displayName || user.email : "Folks!"}</h1>
        <p>
          This website lets you view real-time sensor data. Explore the data and
          discover insights as they happen
        </p>
      </div>
    </div>
  );
};

export default Home;
