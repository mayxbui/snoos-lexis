import { requestExpandedMode } from "@devvit/web/client";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Title from '../public/title.png'
import PlayButton from '../public/play-button.png'
import '../index.css'

const Splash=()=>{
  const handlePlayClick = (e:React.MouseEvent)=>{
    requestExpandedMode(e.nativeEvent,'game')
  };

  return(
    <div>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="mb-8">
          <img src={Title} alt="Snoo's Lexis Title" className="w-80 mb-20" />
        </div>
        <button 
          className="mb-8"
          onClick={handlePlayClick}
        >
          <img src={PlayButton} alt="Play Button" className="w-40 bg-transparent" />
        </button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash/>
  </StrictMode>
)