"use client";

import React, { useState, useRef, useEffect } from "react";

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        setHasError(false);
        // Attempt immediate auto-play
        attemptAutoPlay();
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleError = (e: Event) => {
        console.error("Error loading audio:", e);
        setHasError(true);
        setIsLoaded(false);
        setIsPlaying(false);
      };

      const handleLoadStart = () => {
        setHasError(false);
      };

      // Add event listeners
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("error", handleError);
      audio.addEventListener("loadstart", handleLoadStart);

      // Force load the audio
      audio.load();

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("loadstart", handleLoadStart);
      };
    }
  }, []);

  // Auto-play on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      if (isLoaded && !hasError && !isPlaying) {
        attemptAutoPlay();
      }
    };

    // Listen for any user interaction
    const events = ["click", "keydown", "touchstart", "mousemove"];
    events.forEach((event) => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [isLoaded, hasError, isPlaying]);

  const attemptAutoPlay = () => {
    const audio = audioRef.current;
    if (audio && isLoaded && !hasError) {
      audio.play().catch((error) => {
        console.log("Autoplay was prevented by browser:", error);
        setIsPlaying(false);
      });
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio && isLoaded && !hasError) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setHasError(true);
        });
      }
    }
  };

  // Don't render if there's an error and audio file doesn't exist
  if (hasError && !isLoaded) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/Spectral-Echoes.mp3"
        crossOrigin="anonymous"
      />

      {/* Minimal floating button */}
      <button
        onClick={toggleMusic}
        disabled={!isLoaded || hasError}
        className={`
          group relative w-12 h-12 rounded-full
          bg-white/80 backdrop-blur-sm
          border border-gray-900/10
          transition-all duration-300 ease-out
          hover:bg-white hover:border-gray-900/20
          ${
            !isLoaded || hasError
              ? "opacity-30 cursor-not-allowed"
              : "cursor-pointer"
          }
          ${isPlaying ? "shadow-sm" : "shadow-none"}
        `}
        aria-label={
          isPlaying ? "Pause background music" : "Play background music"
        }
      >
        {/* Simple icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            // Minimal pause icon - two simple lines
            <div className="flex space-x-[3px]">
              <div className="w-[2px] h-3 bg-gray-900"></div>
              <div className="w-[2px] h-3 bg-gray-900"></div>
            </div>
          ) : (
            // Minimal play icon - simple triangle
            <div className="w-0 h-0 border-l-[4px] border-l-gray-900 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-[1px]"></div>
          )}
        </div>

        {/* Subtle indicator when playing */}
        {isPlaying && isLoaded && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full opacity-60"></div>
        )}
      </button>

      {/* Minimal label */}
      {isLoaded && !hasError && (
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs font-arial text-gray-900 bg-white/90 backdrop-blur-sm px-2 py-1 border border-gray-900/10">
            {isPlaying ? "PAUSE" : "PLAY"}
          </span>
        </div>
      )}

      {/* Error state (only visible in development) */}
      {hasError && process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-full right-0 mb-2">
          <span className="text-xs font-arial text-red-600 bg-red-50 px-2 py-1 border border-red-200">
            Audio file not found
          </span>
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
