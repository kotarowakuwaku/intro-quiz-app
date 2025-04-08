"use client";

import { useState, useEffect, useRef, use } from "react";
import YoutubePlayer from "@/app/components/YoutubePlayer";
import Button from "@/app/components/Button";

export default function Home() {
  const videoIds = ["dKPye_tGXFM", "daSwx7663RQ", "6sJ7vXe_oMU"];
  const [currentVideoId, setCurrentVideoId] = useState(videoIds[0]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const currentVideoIndex = useRef(0);

  const onIntroEnd = () => {
    const nextIndex = (videoIds.indexOf(currentVideoId) + 1) % videoIds.length;
    if (nextIndex === 0) {
      console.log("All videos played. Restarting from the first video.");
    }else{
    console.log("Next video ID:", videoIds[nextIndex]);
    setCurrentVideoId(videoIds[nextIndex]);
    currentVideoIndex.current = nextIndex;
    console.log(currentVideoId);
    }
  };
  

  return (
    <main>
      <YoutubePlayer
        key={currentVideoId}
        videoId={currentVideoId}
        introDuration={5}
        isStartQuiz={isGameStarted} // ゲーム開始フラグを渡す
        setStartQuiz={setIsGameStarted} // ゲーム開始フラグを更新する関数を渡す
      />
      <Button label={"回答"} onClick={onIntroEnd} />
    </main>
  );
}
