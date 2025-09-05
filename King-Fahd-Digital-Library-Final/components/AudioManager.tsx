import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Publication } from '../types';
import { FloatingAudioPlayer } from './FloatingAudioPlayer';
import { PlaylistModal } from './PlaylistModal';

interface AudioManagerProps {
  children: React.ReactNode;
}

export const AudioManager: React.FC<AudioManagerProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Publication | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playlist, setPlaylist] = useState<Publication[]>([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    const handleError = () => {
      console.error('Error playing audio');
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playTrack = useCallback((track: Publication) => {
    if (!audioRef.current) return;

    setCurrentTrack(track);
    
    // Add to playlist if not already there
    if (!playlist.find(t => t.id === track.id)) {
      setPlaylist(prev => [...prev, track]);
    }

    // Set audio source
    audioRef.current.src = track.downloadUrl;
    audioRef.current.load();
    
    // Play the audio
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    });
  }, [playlist]);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resumeTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    
    if (nextTrack) {
      playTrack(nextTrack);
    }
  }, [currentTrack, playlist, playTrack]);

  const playPrevious = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    const prevTrack = playlist[prevIndex];
    
    if (prevTrack) {
      playTrack(prevTrack);
    }
  }, [currentTrack, playlist, playTrack]);

  const removeFromPlaylist = useCallback((trackId: number) => {
    setPlaylist(prev => prev.filter(t => t.id !== trackId));
    
    // If current track is removed, stop playing
    if (currentTrack?.id === trackId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  // Context value for child components
  const audioContextValue = {
    playTrack,
    pauseTrack,
    resumeTrack,
    currentTrack,
    isPlaying,
    playlist,
    showPlaylist: () => setShowPlaylist(true)
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      <div className="relative">
        {children}
        
        {/* Floating Audio Player */}
        <FloatingAudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlay={resumeTrack}
          onPause={pauseTrack}
          onNext={playNext}
          onPrevious={playPrevious}
          onClose={() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
            setCurrentTrack(null);
            setIsPlaying(false);
          }}
          progress={progress}
          duration={duration}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />

        {/* Playlist Modal */}
        <PlaylistModal
          isOpen={showPlaylist}
          onClose={() => setShowPlaylist(false)}
          playlist={playlist}
          currentTrack={currentTrack}
          onSelectTrack={playTrack}
          onRemoveTrack={removeFromPlaylist}
          onClearPlaylist={clearPlaylist}
        />
      </div>
    </AudioContext.Provider>
  );
};

// Context for audio management
export const AudioContext = React.createContext<{
  playTrack: (track: Publication) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  currentTrack: Publication | null;
  isPlaying: boolean;
  playlist: Publication[];
  showPlaylist: () => void;
} | null>(null);

export const useAudio = () => {
  const context = React.useContext(AudioContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      playTrack: () => {},
      pauseTrack: () => {},
      resumeTrack: () => {},
      currentTrack: null,
      isPlaying: false,
      playlist: [],
      showPlaylist: () => {}
    };
  }
  return context;
};
