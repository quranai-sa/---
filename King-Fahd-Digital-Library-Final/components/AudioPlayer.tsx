import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return '00:00';
    const floorTime = Math.floor(timeInSeconds);
    const minutes = Math.floor(floorTime / 60);
    const seconds = floorTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 my-4 border border-gray-200">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center space-x-4 space-x-reverse">
        <button 
          onClick={togglePlayPause}
          className="text-brand-green-light hover:text-brand-green-dark transition-colors focus:outline-none"
          aria-label={isPlaying ? 'إيقاف المقطع الصوتي مؤقتاً' : 'تشغيل المقطع الصوتي'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="flex items-center w-full space-x-2 space-x-reverse">
            <span className="text-sm text-gray-600 font-mono w-12 text-center">{formatTime(currentTime)}</span>
            <input
              type="range"
              value={currentTime}
              step="1"
              min="0"
              max={duration || 100}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-brand-green-light"
              aria-label="Seek audio"
            />
            <span className="text-sm text-gray-600 font-mono w-12 text-center">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};
