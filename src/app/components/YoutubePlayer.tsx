'use client';
import { useEffect, useRef, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

type YoutubePlayerProps = {
  videoId: string;
  introDuration: number;
};

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubePlayer = ({ videoId, introDuration}: YoutubePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
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
  // 今は使わない
  // useEffect(() => {
  //   if (
  //     playerRef.current &&
  //     playerReady &&
  //     typeof playerRef.current.loadVideoById === "function"
  //   ) {
  //     playerRef.current.loadVideoById(videoId);
  //     playerRef.current.playVideo();

  //     const timeout = setTimeout(() => {
  //       playerRef.current.mute();
  //       playerRef.current.stopVideo();
  //     }, introDuration * 1000);

  //     return () => clearTimeout(timeout); // クリーンアップ
  //   }
  // }, [videoId, playerReady]);



  const handlePlay = () => {
    if (playerRef.current && playerReady) {
      playerRef.current.seekTo(0, true); // 最初に戻す
      playerRef.current.unMute(); // 念のため音声も有効化
      playerRef.current.playVideo();

      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.pauseVideo(); // 再生を一時停止（stopVideoだと再生できなくなることがある）
        }
      }, introDuration * 1000);
    }
  };


  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", width: "95%", height: "95%", zIndex:1 }} ref={containerRef}></div>
      <button style={{
        backgroundColor: "blue",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 10,
      }} onClick={handlePlay}>
        <PlayCircleIcon style={{ fontSize: "50px", color: "blue", backgroundColor:"white", border:"none" }} />
      </button>
    </div>
  );
};

export default YoutubePlayer;
