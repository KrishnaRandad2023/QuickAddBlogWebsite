import { useEffect, useRef } from "react";
import Particles from "./ui/particles";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate elements in sequence
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(buttonContainerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
      
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Particles />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 max-w-2xl">
            <h2 
              ref={titleRef}
              className="hero-title text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight"
            >
              <span className="relative inline-block text-balance overflow-hidden">
                <span className="block">Elevating Brands with</span>
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Innovative Advertising Solutions
              </span>
            </h2>

            <p 
              ref={subtitleRef}
              className="hero-subtitle text-lg md:text-xl opacity-90 max-w-lg text-balance"
            >
              With over <span className="font-bold text-accent">42 years</span> of
              industry experience, we transform your brand vision into compelling
              stories that captivate your audience.
            </p>

            <div 
              ref={buttonContainerRef}
              className="hero-buttons flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-8 py-3 rounded-full bg-secondary border border-border font-medium hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Our Services
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="text-sm opacity-75">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm opacity-75">Custom Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-sm opacity-75">Fast Delivery</span>
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
            className="hero-image lg:w-1/2 relative" 
            data-speed="0.1"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-secondary rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Advertising team collaborating on creative project"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-secondary rounded-lg p-4 shadow-lg animate-bounce">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                      42
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Years of Excellence</p>
                    <p className="text-xs opacity-75">Established in Akola</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 opacity-75" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
