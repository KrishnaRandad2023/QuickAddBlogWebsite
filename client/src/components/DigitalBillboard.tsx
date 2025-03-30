import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

interface Advertisement {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

const advertisements: Advertisement[] = [
  {
    id: 1,
    title: "Bold Visual Campaigns",
    subtitle: "Turning heads, capturing attention, driving results",
    backgroundImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80",
    ctaText: "View Case Study",
    ctaLink: "#case-studies"
  },
  {
    id: 2,
    title: "Digital Transformation",
    subtitle: "Evolving your brand for tomorrow's markets",
    backgroundImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    ctaText: "Explore Services",
    ctaLink: "#services"
  },
  {
    id: 3,
    title: "Brand Storytelling",
    subtitle: "Crafting narratives that resonate with audiences",
    backgroundImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
    ctaText: "Our Approach",
    ctaLink: "#approach"
  },
  {
    id: 4,
    title: "Targeted Campaigns",
    subtitle: "Reaching the right audience at the right time",
    backgroundImage: "https://images.unsplash.com/photo-1551817958-c5b51e7b4a33?auto=format&fit=crop&q=80",
    ctaText: "See Results",
    ctaLink: "#results"
  }
];

const DigitalBillboard = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [currentAd, setCurrentAd] = useState(advertisements[0]);
  const [nextAd, setNextAd] = useState(advertisements[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentAdRef = useRef<HTMLDivElement>(null);
  const nextAdRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to get the next ad index
  const getNextAdIndex = (index: number) => {
    return (index + 1) % advertisements.length;
  };
  
  // Function to change the advertisement with animation
  const changeAd = (nextIndex?: number) => {
    if (isAnimating) return;
    
    const nextAdIndex = nextIndex !== undefined ? 
      nextIndex : 
      getNextAdIndex(currentAdIndex);
    
    // Set the next ad
    setNextAd(advertisements[nextAdIndex]);
    setIsAnimating(true);
    
    // Create the animation sequence
    const timeline = gsap.timeline({
      onComplete: () => {
        // Update the current ad index and ad
        setCurrentAdIndex(nextAdIndex);
        setCurrentAd(advertisements[nextAdIndex]);
        setNextAd(advertisements[getNextAdIndex(nextAdIndex)]);
        setIsAnimating(false);
        
        // Reset positions for the next animation
        if (currentAdRef.current && nextAdRef.current) {
          gsap.set(currentAdRef.current, { zIndex: 2, opacity: 1, scale: 1 });
          gsap.set(nextAdRef.current, { zIndex: 1, opacity: 0, scale: 1.1 });
        }
      }
    });
    
    if (currentAdRef.current && nextAdRef.current) {
      // Add random TV static effect
      const staticEffect = document.createElement("div");
      staticEffect.className = "absolute inset-0 bg-tv-static z-10 opacity-0 pointer-events-none";
      currentAdRef.current.parentElement?.appendChild(staticEffect);
      
      // Create TV static animation
      timeline
        .to(staticEffect, {
          opacity: 0.7,
          duration: 0.2,
          ease: "power1.in"
        })
        .to(currentAdRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power1.in"
        }, "-=0.1")
        .set(nextAdRef.current, {
          zIndex: 2
        })
        .to(nextAdRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power1.out"
        }, "-=0.2")
        .to(staticEffect, {
          opacity: 0,
          duration: 0.3,
          ease: "power1.out",
          onComplete: () => {
            staticEffect.remove();
          }
        }, "-=0.4");
    }
  };
  
  // Auto-rotate ads
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      changeAd();
    }, 8000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentAdIndex, isAnimating]);
  
  // Handle manual navigation
  const handleNavClick = (index: number) => {
    if (index === currentAdIndex || isAnimating) return;
    
    // Clear auto-rotation timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    changeAd(index);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Live Digital Billboard</h2>
      
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
        {/* Fake billboard frame */}
        <div className="absolute inset-0 border-[16px] border-zinc-800 rounded-lg z-10 pointer-events-none shadow-inner"></div>
        
        {/* Light effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-[3] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)] z-[3] pointer-events-none"></div>
        
        {/* Current ad */}
        <div 
          ref={currentAdRef}
          className="absolute inset-0 z-[2] overflow-hidden"
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-10000 ease-linear transform hover:scale-110"
            style={{ backgroundImage: `url(${currentAd.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-white text-3xl md:text-5xl font-bold mb-2">{currentAd.title}</h3>
              <p className="text-white/90 text-lg md:text-xl mb-6">{currentAd.subtitle}</p>
              <Button 
                size="lg" 
                className="w-fit text-lg"
              >
                {currentAd.ctaText}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Next ad (hidden initially) */}
        <div 
          ref={nextAdRef}
          className="absolute inset-0 z-[1] opacity-0 overflow-hidden"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${nextAd.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-white text-3xl md:text-5xl font-bold mb-2">{nextAd.title}</h3>
              <p className="text-white/90 text-lg md:text-xl mb-6">{nextAd.subtitle}</p>
              <Button 
                size="lg" 
                className="w-fit text-lg"
              >
                {nextAd.ctaText}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentAdIndex 
                  ? "bg-primary scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`View advertisement ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Add TV static effect class */}
      {/* CSS is defined in index.css */}
    </div>
  );
};

export default DigitalBillboard;