"use client";

import { useState, useEffect, useRef, use } from "react";
import YoutubePlayer from "@/app/components/YoutubePlayer";
import Button from "@/app/components/Button";

export default function Home() {
  const videoIds = ["dKPye_tGXFM", "daSwx7663RQ", "6sJ7vXe_oMU"];
  const [currentVideoId, setCurrentVideoId] = useState(videoIds[0]);
  // const [isGameStarted, setIsGameStarted] = useState(false);
  // const currentVideoIndex = useRef(0);

  // 使わない
  // const onIntroEnd = () => {
  //   const nextIndex = (videoIds.indexOf(currentVideoId) + 1) % videoIds.length;
  //   if (nextIndex === 0) {
  //     console.log("All videos played. Restarting from the first video.");
  //   } else {
  //     console.log("Next video ID:", videoIds[nextIndex]);
  //     setCurrentVideoId(videoIds[nextIndex]);
  //     currentVideoIndex.current = nextIndex;
  //     console.log(currentVideoId);
  //   }
  // };


  return (
    <main style={{width:"100vw"}}>
      <div style={{ display: "flex", justifyContent: "center", width: "50px", height: "50px" }}>
        <YoutubePlayer
          key={currentVideoId}
          videoId={currentVideoId}
          introDuration={5}
        />
      </div>
    </main>
  );
}
