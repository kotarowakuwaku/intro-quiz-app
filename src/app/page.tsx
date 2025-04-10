"use client";

import { useState } from "react";
import Quiz from "@/app/components/Quiz";

export default function Home() {
  const videoIds = ["dKPye_tGXFM", "daSwx7663RQ", "6sJ7vXe_oMU"];
  // const [currentVideoId, ] = useState(videoIds[0]);
  const [checkInput, setCheckInput] = useState(videoIds.map((id) => {
    return {
      videoId: id,
      value:""
    }
  }));

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
    <main style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column", // 下にボタンを置きたいとき
    }}>
      {checkInput.map((item, index) => {
        return (
          <div key={index} style={{ display: "flex", justifyContent: "center", width:"60%" }}>
            <Quiz title={`${index + 1}問目`} videoId={item.videoId} introDuration={5} id={index} value={item.value} onChange={(newValue) => {
              const newCheckInput = [...checkInput];
              newCheckInput[index].value = newValue;
              setCheckInput(newCheckInput);
            }}/>
          </div>
        )
      })}
      <button onClick={()=>{
        console.log(checkInput);
      }}>aaaa</button>
    </main>
  );
}