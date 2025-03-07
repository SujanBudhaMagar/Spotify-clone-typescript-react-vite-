import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaRegPauseCircle, FaPlayCircle } from "react-icons/fa";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { CiVolume, CiVolumeMute } from "react-icons/ci";
import { PlayerProps } from "../types/Interface";
import { Artist } from "../DummyData";

const Player: React.FC<PlayerProps> = ({ currentSong, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null); // Typed as HTMLAudioElement or null
  const progressBarRef = useRef<HTMLDivElement | null>(null); // Typed as HTMLDivElement or null

  // Find artist associated with the current song
  const artist = Artist.find((artist) => artist.id === currentSong?.artistId);

  const handleNext = useCallback(() => {
    if (typeof onNext === "function") {
      setIsPlaying(false);
      onNext();
    }
  }, [onNext]);

  const handlePrevious = useCallback(() => {
    if (typeof onPrevious === "function") {
      setIsPlaying(false);
      onPrevious();
    }
  }, [onPrevious]);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    }

    setIsPlaying((prev) => !prev); // Correct state update
  }, [isPlaying, currentSong]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseInt(e.target.value);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
        setIsMuted(newVolume === 0);
      }
    },
    []
  );

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume / 100;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !progressBarRef.current || !currentSong) return;

      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration, currentSong]
  );

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  useEffect(() => {
    if (!currentSong) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setIsLoading(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = currentSong.audio;
    } else {
      audioRef.current = new Audio(currentSong.audio);
    }

    const audio = audioRef.current;

    setIsLoading(true);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      handleNext();
    };

    const handleError = (event: ErrorEvent) => {
      const error = event.error;
      console.error("Audio error:", error);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Set initial volume
    audio.volume = volume / 100;

    // Auto play the new song
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Auto-play failed:", error);
        setIsLoading(false);
      });

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [currentSong, volume, handleNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentSong) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlePlayPause, handleNext, handlePrevious, currentSong]);

  if (!currentSong) {
    return (
      <footer className="p-4 bg-[#222222] text-white w-full fixed bottom-0 h-[10%] flex items-center justify-center">
        <div className="text-gray-400">No song selected</div>
      </footer>
    );
  }

  return (
    <footer className="p-4 bg-[#222222] text-white w-full fixed bottom-0 h-[10%] flex items-center justify-center">
      <div className="flex items-center justify-between w-full">
        {/* Song Info */}
        <div className="flex items-center justify-center">
          <img
            src={currentSong.img}
            alt={currentSong.title}
            className="h-12 w-12 rounded-md mx-auto object-cover"
          />
          <div className="flex flex-col ml-2">
            <p className="text-sm font-semibold">{currentSong.title}</p>
            <p className="text-xs text-gray-400">
              {artist ? artist.name : "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1 max-w-2xl mx-4">
          <div className="flex items-center gap-4">
            <GrCaretPrevious
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handlePrevious}
            />
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="focus:outline-none"
            >
              {isLoading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-600 rounded-full" />
              ) : isPlaying ? (
                <FaRegPauseCircle className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity" />
              ) : (
                <FaPlayCircle className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity" />
              )}
            </button>
            <GrCaretNext
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleNext}
            />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div
              ref={progressBarRef}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-green-500 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 hover:scale-100 transition-transform" />
              </div>
            </div>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="focus:outline-none">
            {isMuted ? (
              <CiVolumeMute className="h-6 w-6 cursor-pointer" />
            ) : (
              <CiVolume className="h-6 w-6 cursor-pointer" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            className="w-20 cursor-pointer"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </footer>
  );
};

export default Player;
