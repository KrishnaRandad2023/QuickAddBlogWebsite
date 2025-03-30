import { useEffect, useRef } from "react";
import { ArrowDown, Radio, Newspaper, FileText, Star } from "lucide-react";
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
      y: 30,
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
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
      
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-48 pb-16 md:py-32 lg:py-40 overflow-hidden bg-[#f9f8f4]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "24px 24px" 
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Headline Banner */}
        <div className="mb-10 pb-4 border-b-2 border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Newspaper className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm uppercase tracking-widest font-bold text-primary">Breaking News</span>
            </div>
            <div className="text-sm">March 30, 2025</div>
          </div>
        </div>
        
        <div className="newspaper-grid">
          {/* Main Content Column - 8 cols */}
          <div className="col-span-1 md:col-span-8 mb-8 md:mb-0 md:pr-6 md:border-r border-gray-200">
            {/* Headline */}
            <h1 
              ref={titleRef}
              className="newspaper-title mb-6 drop-shadow-sm"
            >
              <span className="block text-gray-800">Elevating Brands with</span>
              <span className="text-primary">
                Innovative Advertising Solutions
              </span>
            </h1>

            {/* Lead paragraph with dropcap */}
            <p 
              ref={subtitleRef}
              className="dropcap newspaper-subtitle mb-6 text-gray-700"
            >
              With over <span className="font-bold text-primary">42 years</span> of
              industry experience, Quick Add Advertising Agency transforms your brand vision into compelling
              stories that captivate your audience across traditional and digital media channels.
            </p>

            <div className="vintage-border mb-8 bg-white">
              <div className="column-layout">
                <p className="mb-4 text-sm text-gray-700">
                  Our award-winning team combines the aesthetics of traditional advertising with the latest digital techniques,
                  creating campaigns that resonate with audiences across multiple generations.
                </p>
                <p className="mb-4 text-sm text-gray-700">
                  From radio spots that capture the nostalgic warmth of broadcast to cutting-edge digital experiences,
                  we blend the timeless with the contemporary.
                </p>
                <p className="mb-0 text-sm text-gray-700">
                  "We believe in advertising that tells a story, creates an emotional connection, and stands the test of time,"
                  says our Creative Director.
                </p>
              </div>
            </div>

            <div 
              ref={buttonContainerRef}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#contact"
                className="radio-vintage-button flex items-center"
              >
                <Radio className="h-4 w-4 mr-2" />
                Get Started Today
              </a>
              <a
                href="#services"
                className="px-5 py-2 border border-gray-400 text-gray-800 font-serif italic hover:bg-gray-50 transition-all duration-200"
              >
                Our Services &rarr;
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-gray-300 pt-4">
              <div className="flex items-center gap-6 text-xs text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-amber-500" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1 text-primary" />
                  <span>Custom Solutions</span>
                </div>
                <div className="flex items-center">
                  <Radio className="h-4 w-4 mr-1 text-amber-700" />
                  <span>Fast Delivery</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 italic mt-2 md:mt-0">Continued on page 2</div>
            </div>
          </div>

          {/* Sidebar Column - 4 cols */}
          <div 
            ref={imageRef}
            className="col-span-1 md:col-span-4 md:pl-6"
          >
            <div className="bg-white p-2 border border-gray-300 shadow-sm">
              <div className="border border-gray-200 p-1">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Advertising team collaborating on creative project"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-gray-500 italic mt-2 text-center">The Quick Add creative team collaborating on a multi-channel campaign</p>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 p-4">
              <h3 className="font-display font-bold text-amber-900 text-lg mb-2">Celebrating 42 Years</h3>
              <p className="text-sm text-amber-800 mb-3">From our first radio spot in 1981 to today's integrated campaigns, we've been defining advertising excellence for over four decades.</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-amber-700">Est. 1981 in Akola</div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white text-xs mr-1">
                    42
                  </div>
                  <span className="text-xs text-amber-800">years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
