import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

interface RadioAdProps {
  title: string;
  description: string;
  audioUrl?: string;
}

const RadioAd = ({ 
  title = "Morning Marketing Report",
  description = "Listen to our expert analysis on the latest advertising trends and insights for your brand's growth.",
  audioUrl = "https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3" // Example audio URL
}: RadioAdProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.preload = "metadata";
    
    // Set up audio events
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current?.duration || 0);
    });
    
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      cancelAnimationFrame(animationFrameRef.current);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("ended", () => {});
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [audioUrl]);
  
  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationFrameRef.current);
    } else {
      audioRef.current.play()
        .then(() => {
          updateTime();
        })
        .catch(error => {
          console.error("Error playing audio:", error);
        });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Update progress bar and time
  const updateTime = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    
    if (progressBarRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressBarRef.current.style.width = `${percent}%`;
    }
    
    animationFrameRef.current = requestAnimationFrame(updateTime);
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Create reactive radio waves when playing
  useEffect(() => {
    if (!waveContainerRef.current) return;
    
    // Clear existing waves
    waveContainerRef.current.innerHTML = '';
    
    if (isPlaying) {
      // Create wave bars
      for (let i = 0; i < 60; i++) {
        const waveBar = document.createElement('div');
        waveBar.className = 'wave-bar bg-primary';
        waveBar.style.height = '4px';
        waveBar.style.width = '3px';
        waveBar.style.margin = '0 1px';
        waveBar.style.borderRadius = '1px';
        waveContainerRef.current.appendChild(waveBar);
        
        // Animate each wave bar
        gsap.to(waveBar, {
          height: () => Math.random() * 30 + 4,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.02
        });
      }
    }
    
    return () => {
      // Cleanup animations
      gsap.killTweensOf('.wave-bar');
    };
  }, [isPlaying]);
  
  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current?.parentElement) return;
    
    const progressContainer = progressBarRef.current.parentElement;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newPercent = offsetX / rect.width;
    
    // Set the new current time
    audioRef.current.currentTime = newPercent * audioRef.current.duration;
    setCurrentTime(audioRef.current.currentTime);
    
    // Update progress bar width
    progressBarRef.current.style.width = `${newPercent * 100}%`;
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-6">
      <div className="radio-ad-container relative p-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800">
        {/* Vintage microphone icon */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-100 dark:border-zinc-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C9.79 2 8 3.79 8 6V10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10V6C16 3.79 14.21 2 12 2Z" fill="#FFF" />
            <path d="M7 10H6C6 13.31 8.69 16 12 16C15.31 16 18 13.31 18 10H17C17 12.76 14.76 15 12 15C9.24 15 7 12.76 7 10Z" fill="#FFF" />
            <path d="M12 17C8.13 17 5 18.13 5 19V21H19V19C19 18.13 15.87 17 12 17Z" fill="#FFF" />
          </svg>
        </div>
        
        {/* ON AIR indicator */}
        <div className={`absolute top-6 right-6 flex items-center gap-2 ${isPlaying ? 'text-red-500' : 'text-gray-400'}`}>
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium uppercase tracking-wider">On Air</span>
        </div>
        
        <div className="pt-4">
          <h3 className="text-2xl font-bold text-center mb-5">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">{description}</p>
          
          {/* Audio player controls */}
          <div className="flex flex-col gap-4">
            {/* Waveform visualization */}
            <div 
              ref={waveContainerRef}
              className="wave-container h-10 flex items-center justify-center"
            >
              {!isPlaying && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Click play to listen
                </div>
              )}
            </div>
            
            {/* Progress bar */}
            <div 
              className="progress-container h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                ref={progressBarRef}
                className="progress-bar h-full bg-primary rounded-full"
                style={{ width: '0%' }}
              ></div>
            </div>
            
            {/* Time and controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
              
              <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
                Podcast
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-300 dark:border-gray-700"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-300 dark:border-gray-700"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-300 dark:border-gray-700"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-300 dark:border-gray-700"></div>
      </div>
    </div>
  );
};

export default RadioAd;