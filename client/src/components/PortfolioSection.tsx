import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  industry: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Global Tech Summit Branding",
    client: "TechWorld Inc.",
    industry: "Technology",
    description: "Complete brand identity and digital campaign for the annual Global Tech Summit, resulting in a 40% increase in attendance.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23333'/%3E%3Cpath d='M300 100L350 200L400 100H300Z' fill='%234F46E5'/%3E%3Cpath d='M250 150L300 250L200 250L250 150Z' fill='%234F46E5'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3ETech Summit%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Watch Campaign",
    client: "Chronos Timepieces",
    industry: "Luxury Retail",
    description: "Print and digital advertising campaign for a premium watch collection, highlighting craftsmanship and heritage.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23222'/%3E%3Ccircle cx='300' cy='200' r='100' stroke='%23D4AF37' stroke-width='4' fill='none'/%3E%3Ccircle cx='300' cy='200' r='90' stroke='%23D4AF37' stroke-width='1' fill='none'/%3E%3Cline x1='300' y1='110' x2='300' y2='130' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='300' y1='270' x2='300' y2='290' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='390' y1='200' x2='370' y2='200' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='230' y1='200' x2='210' y2='200' stroke='%23D4AF37' stroke-width='2'/%3E%3Ctext x='300' y='320' font-family='serif' font-size='24' text-anchor='middle' fill='%23D4AF37'%3ELuxury Timepieces%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: true
  },
  {
    id: 3,
    title: "Eco-Friendly Product Launch",
    client: "GreenLife Products",
    industry: "Consumer Goods",
    description: "Integrated marketing campaign for a new line of sustainable home products, emphasizing environmental benefits.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23143614'/%3E%3Cpath d='M300 100C300 100 250 150 250 200C250 250 300 300 300 300C300 300 350 250 350 200C350 150 300 100 300 100Z' fill='%2385C17E'/%3E%3Ccircle cx='300' cy='180' r='20' fill='%23FFFFFF'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EEco-Friendly%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false
  },
  {
    id: 4,
    title: "Financial Services Rebrand",
    client: "Secure Investments Ltd.",
    industry: "Finance",
    description: "Complete rebranding project for a financial services firm, including logo design, corporate identity, and marketing materials.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23001F3F'/%3E%3Cpath d='M200 250L300 150L400 250H200Z' fill='%2364748B'/%3E%3Cpath d='M250 270H350V290H250V270Z' fill='%2364748B'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EFinancial Services%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false
  },
  {
    id: 5,
    title: "Food Delivery App Campaign",
    client: "QuickBite",
    industry: "Food & Technology",
    description: "Digital marketing strategy for a food delivery app, including social media, influencer partnerships, and targeted advertisements.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23FF4136'/%3E%3Ccircle cx='300' cy='180' r='80' fill='%23FFFFFF'/%3E%3Cpath d='M260 180L290 210L340 160' stroke='%23FF4136' stroke-width='10'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EFood Delivery%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false
  },
  {
    id: 6,
    title: "Travel Agency Social Media",
    client: "Explore Adventures",
    industry: "Tourism",
    description: "Comprehensive social media strategy and content creation for a travel agency, showcasing destinations and travel packages.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%230074D9'/%3E%3Ccircle cx='300' cy='150' r='50' fill='%23FFDC00'/%3E%3Cpath d='M150 250Q300 200 450 250Q400 300 150 250Z' fill='%23AAAAAA'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3ETravel Adventures%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false
  }
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const featuredItems = portfolioItems.filter(item => item.featured);
  const regularItems = portfolioItems.filter(item => !item.featured);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Check for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // GSAP animations
    const items = sectionRef.current.querySelectorAll('.portfolio-item');
    
    gsap.fromTo(items, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const nextSlide = () => {
    if (currentSlide < featuredItems.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      setCurrentSlide(featuredItems.length - 1);
    }
  };

  const currentFeatured = featuredItems[currentSlide];

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-indigo-400 font-medium mb-3">
            Our Work
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Featured Projects
          </h3>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-zinc-400">
            Explore our portfolio of successful advertising campaigns and creative projects that have helped our clients achieve their marketing goals.
          </p>
        </div>

        {/* Featured Project Slider */}
        <div className="mb-20 relative">
          <div className="overflow-hidden rounded-lg shadow-2xl bg-zinc-900 border border-zinc-800">
            <div className="relative aspect-video md:aspect-[16/7] overflow-hidden">
              <img 
                src={currentFeatured.imageUrl} 
                alt={currentFeatured.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 w-full">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs uppercase tracking-wider rounded-full mb-4 inline-block">
                  {currentFeatured.industry}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {currentFeatured.title}
                </h3>
                <p className="text-zinc-300 mb-4 max-w-3xl">
                  {currentFeatured.description}
                </p>
                <div className="flex items-center text-sm text-zinc-400">
                  <span className="mr-4">Client: <span className="text-white">{currentFeatured.client}</span></span>
                  <a href={currentFeatured.link} className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center md:justify-end mt-6 space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-zinc-800 hover:bg-indigo-700 border border-zinc-700 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-zinc-800 hover:bg-indigo-700 border border-zinc-700 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularItems.map((item) => (
            <div key={item.id} className="portfolio-item group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/30 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-sm mb-4">
                  {item.description.length > 100 
                    ? `${item.description.substring(0, 100)}...` 
                    : item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">{item.industry}</span>
                  <a 
                    href={item.link} 
                    className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors"
                  >
                    Details <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;