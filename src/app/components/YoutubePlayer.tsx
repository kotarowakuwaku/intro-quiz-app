'use client';
import { useEffect, useRef, useState } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import { YoutubePlayerProps } from "@/types/youtubePlayerProps";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
    _youtubeReadyCallbacks?: (() => void)[];
  }
}

const YoutubePlayer = ({ videoId, introDuration }: YoutubePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadPlayer = () => {
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

    if (window.YT && window.YT.Player) {
      loadPlayer();
    } else {
      if (!window._youtubeReadyCallbacks) {
        window._youtubeReadyCallbacks = [];
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          window._youtubeReadyCallbacks?.forEach(cb => cb());
          window._youtubeReadyCallbacks = [];
        };
      }
      window._youtubeReadyCallbacks.push(loadPlayer);
    }
  }, [videoId]);

  const handlePlay = () => {
    if (playerRef.current && playerReady) {
      setIsPlaying(true);
      playerRef.current.seekTo(0, true);
      playerRef.current.unMute();
      playerRef.current.playVideo();

      setTimeout(() => {
        playerRef.current?.pauseVideo();
        setIsPlaying(false);
      }, introDuration * 1000);
    }
  };

  return (
    <div style={{ position: "relative", width: "50px", height: "50px" }}>
      <div
        style={{ position: "absolute", width: "95%", height: "95%", zIndex: 1 }}
        ref={containerRef}
      ></div>
      <button 
        disabled={isPlaying}
        style={{
          backgroundColor: "#338FEB",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 10,
        }} 
        onClick={handlePlay}>
        {isPlaying ? <PauseIcon style={iconStyle} /> : <PlayCircleIcon style={iconStyle} />}
      </button>
    </div>
  );
};

export default YoutubePlayer;

const iconStyle = { fontSize: "50px", color: "blue", backgroundColor:"white", border:"none" };
