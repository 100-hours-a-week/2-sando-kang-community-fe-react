import React, { createContext, useEffect } from "react";

export const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  useEffect(() => {
    const audio = document.createElement("audio");
    audio.src = "/music/squid-game.mp3";
    audio.loop = true;
    audio.volume = 0.2;
  
    const playAudio = () => {
      console.log("Attempting to play audio...");
      audio.play()
        .then(() => console.log("Audio playing!"))
        .catch((err) => console.error("Autoplay failed:", err));
    };
  
    document.body.addEventListener("click", playAudio, { once: true });
  
    return () => {
      audio.pause();
      audio.remove();
      document.body.removeEventListener("click", playAudio);
    };
  }, []);
  
  return <AudioContext.Provider value={{}}>{children}</AudioContext.Provider>;
};

export default AudioProvider;
