import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Register GSAP plugins
gsap.registerPlugin(Draggable);

interface FilmFrame {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Sample frames - in a real app, these would come from the database
const sampleFrames: FilmFrame[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    title: "Creative Strategy Meeting",
    description: "Our team developing innovative campaign strategies for top clients."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    title: "Collaborative Workspace",
    description: "Where great ideas come to life through teamwork and creativity."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
    title: "Design Team at Work",
    description: "Our award-winning designers crafting visual masterpieces."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
    title: "Client Presentation",
    description: "Showcasing our latest campaign results to satisfied clients."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80",
    title: "Office Culture",
    description: "Creating a workspace environment that fosters innovation and creativity."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80",
    title: "Social Media Campaign",
    description: "Building engagement through strategic social media marketing."
  },
];

const FilmReel = () => {
  const [frames] = useState<FilmFrame[]>(sampleFrames);
  const [selectedFrame, setSelectedFrame] = useState<FilmFrame | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const reelRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const dragInstanceRef = useRef<Draggable | null>(null);
  
  // Add sound effects
  const playFilmSound = () => {
    const audio = new Audio();
    audio.src = "https://www.soundjay.com/mechanical/sounds/projector-1.mp3";
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };
  
  const playShutterSound = () => {
    const audio = new Audio();
    audio.src = "https://www.soundjay.com/mechanical/sounds/camera-shutter-click-01.mp3";
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };
  
  useEffect(() => {
    if (!reelRef.current || !filmStripRef.current) return;
    
    // Setup countdown animation on initial load
    const countdown = () => {
      const countdownEl = document.createElement("div");
      countdownEl.className = "film-countdown absolute inset-0 flex items-center justify-center bg-black z-10";
      reelRef.current?.appendChild(countdownEl);
      
      // Countdown animation
      let count = 3;
      const updateCount = () => {
        if (count > 0) {
          countdownEl.innerHTML = `
            <div class="text-6xl font-bold text-white relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 rounded-full border-4 border-white"></div>
              </div>
              ${count}
            </div>
          `;
          count--;
          setTimeout(updateCount, 1000);
        } else {
          countdownEl.innerHTML = `
            <div class="text-4xl font-bold text-white">ACTION!</div>
          `;
          setTimeout(() => {
            countdownEl.remove();
            
            // Play film rolling sound
            playFilmSound();
            
            // Start the auto-scrolling animation
            startScrolling();
          }, 1000);
        }
      };
      
      updateCount();
    };
    
    countdown();
    
    // Setup the draggable functionality
    const setupDraggable = () => {
      if (dragInstanceRef.current) {
        dragInstanceRef.current.kill();
      }
      
      if (!filmStripRef.current || !reelRef.current) return;

      const stripWidth = filmStripRef.current.scrollWidth;
      const viewportWidth = reelRef.current.clientWidth;
      
      dragInstanceRef.current = Draggable.create(filmStripRef.current, {
        type: "x",
        edgeResistance: 0.85,
        bounds: {
          minX: -(stripWidth - viewportWidth + 100),
          maxX: 0
        },
        inertia: true,
        onDragStart: () => {
          // Stop the auto-scrolling animation when user starts dragging
          gsap.killTweensOf(filmStripRef.current);
          setIsPlaying(false);
        },
        onDragEnd: () => {
          playFilmSound();
        }
      })[0];
    };
    
    // Start the auto-scrolling animation
    const startScrolling = () => {
      if (!filmStripRef.current) return;
      
      // Calculate the width of the film strip
      const stripWidth = filmStripRef.current.scrollWidth;
      const viewportWidth = reelRef.current?.clientWidth || 0;
      
      // Animate the film strip to create a continuous scrolling effect
      gsap.to(filmStripRef.current, {
        x: -(stripWidth - viewportWidth + 100),
        duration: 30,
        ease: "linear",
        repeat: -1,
        yoyo: true,
        onRepeat: () => {
          playFilmSound();
        }
      });
      
      setIsPlaying(true);
    };
    
    // Initialize draggable
    setupDraggable();
    
    // Add film grain effect
    const addFilmGrain = () => {
      const grainOverlay = document.createElement("div");
      grainOverlay.className = "absolute inset-0 pointer-events-none z-[1] opacity-40";
      grainOverlay.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')";
      reelRef.current?.appendChild(grainOverlay);
    };
    
    addFilmGrain();
    
    // Add randomly timed film scratch effect
    const addRandomScratches = () => {
      const createScratch = () => {
        if (!reelRef.current) return;
        
        const scratch = document.createElement("div");
        scratch.className = "absolute z-[2] bg-white/50";
        
        // Randomize scratch position and size
        const isHorizontal = Math.random() > 0.5;
        
        if (isHorizontal) {
          const height = Math.random() * 2 + 1;
          const width = Math.random() * 100 + 50;
          const top = Math.random() * reelRef.current.clientHeight;
          
          scratch.style.height = `${height}px`;
          scratch.style.width = `${width}px`;
          scratch.style.top = `${top}px`;
          scratch.style.left = `${Math.random() * reelRef.current.clientWidth}px`;
        } else {
          const width = Math.random() * 2 + 1;
          const height = Math.random() * 100 + 50;
          const left = Math.random() * reelRef.current.clientWidth;
          
          scratch.style.width = `${width}px`;
          scratch.style.height = `${height}px`;
          scratch.style.left = `${left}px`;
          scratch.style.top = `${Math.random() * reelRef.current.clientHeight}px`;
        }
        
        reelRef.current.appendChild(scratch);
        
        // Animate and remove the scratch
        gsap.to(scratch, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            scratch.remove();
          }
        });
      };
      
      // Create scratches at random intervals
      const scratchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          createScratch();
        }
      }, 2000);
      
      return scratchInterval;
    };
    
    const scratchInterval = addRandomScratches();
    
    // Toggle play/pause
    const handlePlayPause = () => {
      if (isPlaying) {
        gsap.killTweensOf(filmStripRef.current);
        setIsPlaying(false);
      } else {
        startScrolling();
        playFilmSound();
      }
    };
    
    // Add click event for play/pause
    const playPauseButton = document.querySelector(".film-control-play");
    if (playPauseButton) {
      playPauseButton.addEventListener("click", handlePlayPause);
    }
    
    return () => {
      // Clean up
      if (dragInstanceRef.current) {
        dragInstanceRef.current.kill();
      }
      gsap.killTweensOf(filmStripRef.current);
      clearInterval(scratchInterval);
      
      if (playPauseButton) {
        playPauseButton.removeEventListener("click", handlePlayPause);
      }
    };
  }, []);
  
  const handleFrameClick = (frame: FilmFrame) => {
    setSelectedFrame(frame);
    setIsDialogOpen(true);
    playShutterSound();
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      gsap.killTweensOf(filmStripRef.current);
      setIsPlaying(false);
    } else {
      // Resume auto-scrolling
      if (filmStripRef.current && reelRef.current) {
        const stripWidth = filmStripRef.current.scrollWidth;
        const viewportWidth = reelRef.current.clientWidth;
        
        gsap.to(filmStripRef.current, {
          x: -(stripWidth - viewportWidth + 100),
          duration: 30,
          ease: "linear",
          repeat: -1,
          yoyo: true
        });
        
        playFilmSound();
        setIsPlaying(true);
      }
    }
  };
  
  return (
    <div className="film-reel-container w-full max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Behind the Scenes</h2>
      
      <div className="relative">
        {/* Film perforations (top) */}
        <div className="flex justify-between h-8 bg-black mb-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={`perf-top-${i}`} className="w-3 h-3 rounded-full bg-gray-800 my-2.5 mx-1"></div>
          ))}
        </div>
        
        {/* Main film reel viewer */}
        <div 
          ref={reelRef}
          className="film-reel-viewer relative h-[300px] md:h-[400px] overflow-hidden bg-black rounded-md"
        >
          {/* Light flicker effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-50 z-[1] pointer-events-none"></div>
          
          {/* Film strip container */}
          <div 
            ref={filmStripRef}
            className="film-strip absolute top-0 bottom-0 flex cursor-grab active:cursor-grabbing"
          >
            {/* Film frames */}
            {frames.map((frame) => (
              <div 
                key={frame.id}
                className="film-frame relative flex-none w-[280px] h-full mx-4 filter sepia hover:sepia-0 transition-all duration-300 cursor-pointer"
                onClick={() => handleFrameClick(frame)}
              >
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
                <div className="h-full overflow-hidden">
                  <img 
                    src={frame.image}
                    alt={frame.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Frame title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white">
                  <h3 className="text-sm font-semibold">{frame.title}</h3>
                </div>
                
                {/* Frame number */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  FRAME {frame.id}
                </div>
              </div>
            ))}
          </div>
          
          {/* Film control overlay */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            <div className="film-controls flex gap-4 bg-black/70 rounded-full px-4 py-2">
              <button 
                className="film-control-play w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L18 12L6 20V4Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              
              <div className="text-white text-xs self-center">
                Drag to explore or click for details
              </div>
            </div>
          </div>
        </div>
        
        {/* Film perforations (bottom) */}
        <div className="flex justify-between h-8 bg-black mt-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={`perf-bottom-${i}`} className="w-3 h-3 rounded-full bg-gray-800 my-2.5 mx-1"></div>
          ))}
        </div>
      </div>
      
      {/* Dialog for expanded view */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedFrame && (
            <div className="p-4">
              <img 
                src={selectedFrame.image}
                alt={selectedFrame.title}
                className="w-full h-auto mb-4 rounded-md"
              />
              
              <h2 className="text-xl font-bold mb-2">{selectedFrame.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{selectedFrame.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilmReel;