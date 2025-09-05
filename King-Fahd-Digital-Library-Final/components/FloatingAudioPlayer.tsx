import React, { useState, useEffect, useRef } from 'react';
import { Publication } from '../types';

interface FloatingAudioPlayerProps {
  currentTrack: Publication | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  progress: number;
  duration: number;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const FloatingAudioPlayer: React.FC<FloatingAudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onClose,
  progress,
  duration,
  volume,
  onVolumeChange
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-80'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-green to-brand-green-dark p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">جاري التشغيل</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isMinimized ? "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" : "M20 12l-4-4v8l4-4zM6 12l4-4v8l-4-4z"} />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Track Info */}
            <div className="p-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{currentTrack.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{currentTrack.language}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pb-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-500">
                <span>{formatTime(progress)}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-brand-green h-1 rounded-full transition-all duration-300"
                    style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button
                    onClick={onPrevious}
                    className="p-2 text-gray-600 hover:text-brand-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={isPlaying ? onPause : onPlay}
                    className="p-3 bg-brand-green text-white rounded-full hover:bg-brand-green-dark transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  <button
                    onClick={onNext}
                    className="p-2 text-gray-600 hover:text-brand-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                    className="p-2 text-gray-600 hover:text-brand-green transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.792L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.208a1 1 0 011.617.792zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {showVolumeSlider && (
                    <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 border">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-gray-500 text-center mt-1">{volume}%</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
