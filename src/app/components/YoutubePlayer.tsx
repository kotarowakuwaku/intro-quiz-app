'use client';
import { useEffect, useState } from "react";

type YoutubePlayerProps = {
  videoId: string;
  introDuration: number;
  onIntroEnd: () => void;
  isStopQuiz?: boolean; // Optional prop to stop the quiz
};

const YoutubePlayer = ({ videoId, introDuration, onIntroEnd, isStopQuiz }: YoutubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (timerStarted) {
      const timer = setTimeout(onIntroEnd, introDuration * 1000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [timerStarted, introDuration, onIntroEnd]);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimerStarted(true); // Start the timer when the video starts
  };

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying && !isStopQuiz ? 1 : 0}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {!isPlaying && (
        <button onClick={handlePlay}>
          Start Video
        </button>
      )}
    </div>
  );
};

export default YoutubePlayer;
