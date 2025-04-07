"use client";

import { useState, useEffect, useRef, use } from "react";
import YoutubePlayer from "@/app/components/YoutubePlayer";

export default function Home() {
  const videoIds = ["dKPye_tGXFM", "daSwx7663RQ", "6sJ7vXe_oMU"];
  const [currentVideoId, setCurrentVideoId] = useState(videoIds[0]);
  const [isStopQuiz, setIsStopQuiz] = useState(false); // ステートを追加

  // イントロ終了時に次の動画をセット
  const onIntroEnd = () => {
    const nextIndex = (videoIds.indexOf(currentVideoId) + 1) % videoIds.length;
    if (nextIndex === 0) {
      console.log("All videos played. Restarting from the first video.");
      setIsStopQuiz(true); // イントロ終了時にクイズをストップ
    }else{
    console.log("Next video ID:", videoIds[nextIndex]);
    setCurrentVideoId(videoIds[nextIndex]);
    }
  };

  return (
    <main>
      <YoutubePlayer
        videoId={currentVideoId}
        introDuration={5}
        onIntroEnd={onIntroEnd}
        isStopQuiz={isStopQuiz} // 追加したステートを渡す
      />
    </main>
  );
}
