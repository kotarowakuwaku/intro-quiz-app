'use client';
import { useEffect, useRef, useState } from "react";

type YoutubePlayerProps = {
  videoId: string;
  introDuration: number;
  isStartQuiz?: boolean;
  setStartQuiz?: (value: boolean) => void;
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubePlayer = ({ videoId, introDuration, isStartQuiz, setStartQuiz }: YoutubePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  // 初回のみ YouTube API をロード
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }
  }, []);

  // プレイヤーを作成する関数
  const createPlayer = () => {
    if (!containerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      events: {
        onReady: () => {
          setPlayerReady(true);
        },
      },
      playerVars: {
        controls: 1,
        autoplay: 0,
        mute: 0,
      },
    });
  };

  // videoId が変わったとき動画を切り替える
  useEffect(() => {
    if (
      playerRef.current &&
      playerReady &&
      typeof playerRef.current.loadVideoById === "function"
    ) {
      playerRef.current.loadVideoById(videoId);
      playerRef.current.playVideo();
  
      const timeout = setTimeout(() => {
        playerRef.current.mute();
        playerRef.current.stopVideo();
      }, introDuration * 1000);
  
      return () => clearTimeout(timeout); // クリーンアップ
    }
  }, [videoId, playerReady]);
  
  

  const handlePlay = () => {
    setStartQuiz && setStartQuiz(true);
    if (playerRef.current && playerReady) {
      playerRef.current.playVideo();

      setTimeout(() => {
        playerRef.current.mute();
        playerRef.current.stopVideo();
      }, introDuration * 1000);
    }
  };

  return (
    <div>
      <div ref={containerRef}></div>
      {
        !isStartQuiz && (
          <div>
            <button onClick={handlePlay}>Start Video</button>
          </div>
        )
      }
    </div>
  );
};

export default YoutubePlayer;
