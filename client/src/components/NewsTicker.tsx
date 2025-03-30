import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface NewsTickerProps {
  headlines: string[];
}

const NewsTicker = ({ headlines }: NewsTickerProps) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!tickerRef.current || !contentRef.current || headlines.length === 0) return;
    
    // Create duplicate content to ensure continuous scrolling
    const contentWidth = contentRef.current.offsetWidth;
    const viewportWidth = tickerRef.current.offsetWidth;
    
    // Calculate how many duplicates we need to ensure continuous scrolling
    const duplicatesNeeded = Math.ceil(viewportWidth / contentWidth) + 1;
    
    // Create ticker animation
    const tickerAnimation = () => {
      // Reset to starting position
      gsap.set(contentRef.current, { x: 0 });
      
      // Create the scrolling animation
      gsap.to(contentRef.current, {
        x: -contentWidth,
        duration: headlines.length * 5, // Adjust speed based on number of headlines
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          // Generate a random offset to simulate news ticker variations
          const randomOffset = Math.random() * 0.2 - 0.1; // Random value between -0.1 and 0.1
          gsap.to(contentRef.current, {
            duration: 0.2,
            ease: "power1.inOut",
            timeScale: 1 + randomOffset
          });
        }
      });
    };
    
    // Initialize ticker animation
    tickerAnimation();
    
    // Handle window resize
    const handleResize = () => {
      // Kill previous animation
      gsap.killTweensOf(contentRef.current);
      
      // Restart animation
      tickerAnimation();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf(contentRef.current);
    };
  }, [headlines]);
  
  // Prepare content for the ticker
  const tickerContent = () => {
    // Join headlines with a separator
    return headlines.map((headline, index) => (
      <span key={index} className="inline-block">
        <span className="text-primary font-bold mr-2">BREAKING:</span>
        {headline}
        <span className="inline-block mx-6">•</span>
      </span>
    ));
  };
  
  return (
    <div className="news-ticker-container bg-black text-white py-2 overflow-hidden border-b border-zinc-800">
      <div className="relative flex items-center">
        {/* "LATEST NEWS" label */}
        <div className="flex-shrink-0 bg-primary px-3 py-1 mr-4 z-10 font-bold text-sm uppercase tracking-wider">
          LATEST NEWS
        </div>
        
        {/* Ticker container */}
        <div 
          ref={tickerRef}
          className="flex-1 overflow-hidden whitespace-nowrap relative h-6"
        >
          {/* Scrolling content */}
          <div 
            ref={contentRef}
            className="inline-block whitespace-nowrap absolute left-0 top-0"
          >
            {tickerContent()}
            {/* Duplicate content for continuous scrolling */}
            {tickerContent()}
          </div>
        </div>
        
        {/* Gradient fade effect on edges */}
        <div className="absolute left-[100px] top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default NewsTicker;