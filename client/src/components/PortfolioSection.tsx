import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Radio, 
  Tv, 
  Newspaper, 
  BarChart3,
  Calendar,
  Filter,
  PlayCircle,
  PieChart,
  Award,
  TrendingUp
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Portfolio item types
interface BasePortfolioItem {
  id: number;
  title: string;
  client: string;
  industry: string;
  description: string;
  imageUrl: string;
  link: string;
  featured: boolean;
  before?: Record<string, string>;
  after?: Record<string, string>;
}

interface CaseStudy extends BasePortfolioItem {
  type: 'case-study';
  testimonial?: string;
  testimonialAuthor?: string;
}

interface MediaPartnership extends BasePortfolioItem {
  type: 'media';
  mediaType: 'newspaper' | 'tv' | 'radio';
  mediaBrand: string;
  campaignType: string[];
  reach: string;
  impact: string;
}

interface CorporateEvent extends BasePortfolioItem {
  type: 'event';
  date: string;
  location: string;
  attendees: string;
  highlights: string[];
}

type PortfolioItem = CaseStudy | MediaPartnership | CorporateEvent;

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'case-study', name: 'Case Studies' },
  { id: 'media', name: 'Media Partnerships' },
  { id: 'event', name: 'Corporate Events' },
  { id: 'newspaper', name: 'Newspaper' },
  { id: 'tv', name: 'TV' },
  { id: 'radio', name: 'Radio' }
];

// Portfolio items data
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: 'case-study',
    title: "Global Tech Summit Branding",
    client: "TechWorld Inc.",
    industry: "Technology",
    description: "Complete brand identity and digital campaign for the annual Global Tech Summit, resulting in a 40% increase in attendance and significant media coverage.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23333'/%3E%3Cpath d='M300 100L350 200L400 100H300Z' fill='%234F46E5'/%3E%3Cpath d='M250 150L300 250L200 250L250 150Z' fill='%234F46E5'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3ETech Summit%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: true,
    before: {
      "Attendance": "1,200 participants",
      "Media Coverage": "Regional only",
      "Social Engagement": "5K mentions"
    },
    after: {
      "Attendance": "1,680+ participants",
      "Media Coverage": "National & International",
      "Social Engagement": "25K+ mentions"
    },
    testimonial: "Quick Add Agency transformed our branding and digital presence. Their innovative approach to our tech summit marketing drove unprecedented engagement and attendance numbers.",
    testimonialAuthor: "Sarah Chen, Marketing Director at TechWorld Inc."
  },
  {
    id: 2,
    type: 'case-study',
    title: "Luxury Watch Campaign",
    client: "Chronos Timepieces",
    industry: "Luxury Retail",
    description: "Print and digital advertising campaign for a premium watch collection, highlighting craftsmanship and heritage with a storytelling approach across multiple channels.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23222'/%3E%3Ccircle cx='300' cy='200' r='100' stroke='%23D4AF37' stroke-width='4' fill='none'/%3E%3Ccircle cx='300' cy='200' r='90' stroke='%23D4AF37' stroke-width='1' fill='none'/%3E%3Cline x1='300' y1='110' x2='300' y2='130' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='300' y1='270' x2='300' y2='290' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='390' y1='200' x2='370' y2='200' stroke='%23D4AF37' stroke-width='2'/%3E%3Cline x1='230' y1='200' x2='210' y2='200' stroke='%23D4AF37' stroke-width='2'/%3E%3Ctext x='300' y='320' font-family='serif' font-size='24' text-anchor='middle' fill='%23D4AF37'%3ELuxury Timepieces%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: true,
    before: {
      "Sales": "$1.2M quarterly",
      "Brand Perception": "Traditional luxury",
      "Market Position": "Regional presence"
    },
    after: {
      "Sales": "$2.8M quarterly",
      "Brand Perception": "Heritage luxury with modern appeal",
      "Market Position": "Global recognition"
    },
    testimonial: "The campaign elegantly captured our brand essence while expanding our reach to new demographics. The results exceeded our expectations in both brand perception and sales metrics.",
    testimonialAuthor: "Jonathan Reynolds, CEO of Chronos Timepieces"
  },
  {
    id: 3,
    type: 'media',
    mediaType: 'newspaper',
    title: "The Daily Chronicle Partnership",
    client: "Multiple Brands",
    industry: "Multi-industry",
    mediaBrand: "The Daily Chronicle",
    description: "Strategic newspaper advertising partnership featuring premium placements, sponsored content, and editorial collaborations reaching over 1.5 million readers.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23EFEFEF'/%3E%3Crect x='100' y='50' width='400' height='80' fill='%23111'/%3E%3Ctext x='300' y='105' font-family='serif' font-size='36' font-weight='bold' text-anchor='middle' fill='white'%3EThe Daily Chronicle%3C/text%3E%3Crect x='100' y='150' width='190' height='200' fill='%23DDD'/%3E%3Crect x='310' y='150' width='190' height='90' fill='%23DDD'/%3E%3Crect x='310' y='260' width='190' height='90' fill='%23DDD'/%3E%3C/svg%3E",
    link: "#",
    featured: false,
    campaignType: ["Full-page spreads", "Sponsored stories", "Premium inserts"],
    reach: "1.5M+ weekly readers",
    impact: "28% average increase in reader engagement for sponsored content"
  },
  {
    id: 4,
    type: 'media',
    mediaType: 'tv',
    title: "MetroTV Broadcasting Campaign",
    client: "Urban Living Solutions",
    industry: "Real Estate",
    mediaBrand: "MetroTV",
    description: "Complete television advertising strategy including primetime commercials, sponsored segments, and product placement in popular shows.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23000'/%3E%3Crect x='150' y='80' width='300' height='200' rx='15' fill='%23111'/%3E%3Crect x='170' y='100' width='260' height='160' fill='%230050FF'/%3E%3Ctext x='300' y='180' font-family='sans-serif' font-size='28' font-weight='bold' text-anchor='middle' fill='white'%3EMetroTV%3C/text%3E%3Crect x='200' y='300' width='200' height='20' rx='10' fill='%23333'/%3E%3C/svg%3E",
    link: "#",
    featured: false,
    campaignType: ["30-second commercials", "Program sponsorships", "Product integration"],
    reach: "5.2M viewers during campaign period",
    impact: "42% increase in brand recall among target demographic"
  },
  {
    id: 5,
    type: 'media',
    mediaType: 'radio',
    title: "CityFM Radio Campaign",
    client: "EcoSound Headphones",
    industry: "Consumer Electronics",
    mediaBrand: "CityFM",
    description: "Multi-format radio advertising campaign featuring spots, DJ endorsements, branded segments and contests to drive product awareness.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23222'/%3E%3Ccircle cx='300' cy='200' r='120' fill='%23333'/%3E%3Ccircle cx='300' cy='200' r='100' fill='%23444'/%3E%3Ccircle cx='300' cy='200' r='30' fill='%23FF0000'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3ECityFM Radio%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false,
    campaignType: ["Prime-time spots", "DJ endorsements", "Branded segments", "Call-in contests"],
    reach: "850,000 daily listeners across key demographics",
    impact: "62% increase in website traffic during campaign period"
  },
  {
    id: 6,
    type: 'event',
    title: "Future of Marketing Summit",
    client: "Quick Add Agency",
    industry: "Marketing & Advertising",
    description: "Annual industry conference bringing together marketing professionals, brand managers, and technology innovators to explore emerging trends and strategies.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23001F3F'/%3E%3Cpath d='M200 250L300 150L400 250H200Z' fill='%234F46E5'/%3E%3Ccircle cx='300' cy='120' r='40' fill='%234F46E5'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EFuture of Marketing%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false,
    date: "October 15-17, 2024",
    location: "Grand Convention Center, New York",
    attendees: "1,200+ marketing professionals",
    highlights: [
      "Keynote by industry leaders",
      "Interactive workshops",
      "Technology showcases",
      "Networking events"
    ]
  },
  {
    id: 7,
    type: 'case-study',
    title: "Food Delivery App Campaign",
    client: "QuickBite",
    industry: "Food & Technology",
    description: "Comprehensive digital marketing strategy for a food delivery app launch, including social media, influencer partnerships, and targeted advertisements.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23FF4136'/%3E%3Ccircle cx='300' cy='180' r='80' fill='%23FFFFFF'/%3E%3Cpath d='M260 180L290 210L340 160' stroke='%23FF4136' stroke-width='10'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EFood Delivery%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false,
    before: {
      "App Downloads": "10,000 in first month",
      "User Retention": "22% after 30 days",
      "Order Frequency": "1.8 orders per user/month"
    },
    after: {
      "App Downloads": "45,000+ in first month",
      "User Retention": "38% after 30 days",
      "Order Frequency": "3.2 orders per user/month"
    }
  },
  {
    id: 8,
    type: 'event',
    title: "Brand Innovation Workshop Series",
    client: "Multiple Brands",
    industry: "Cross-industry",
    description: "Quarterly workshop series bringing together creative professionals and brand managers to explore innovative approaches to brand building and consumer engagement.",
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23330033'/%3E%3Ccircle cx='300' cy='170' r='70' fill='%23FF00FF' fill-opacity='0.2'/%3E%3Ccircle cx='250' cy='200' r='50' fill='%2300FFFF' fill-opacity='0.2'/%3E%3Ccircle cx='350' cy='200' r='50' fill='%23FFFF00' fill-opacity='0.2'/%3E%3Ctext x='300' y='320' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white'%3EBrand Innovation%3C/text%3E%3C/svg%3E",
    link: "#",
    featured: false,
    date: "Quarterly (March, June, September, December)",
    location: "Various Creative Studios & Innovation Hubs",
    attendees: "30-50 senior brand professionals per workshop",
    highlights: [
      "Hands-on creative exercises",
      "Case study presentations",
      "Cross-industry networking",
      "Implementation planning"
    ]
  }
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCaseStudy, setShowCaseStudy] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Filter items based on category
  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        if (selectedCategory === 'newspaper' || selectedCategory === 'tv' || selectedCategory === 'radio') {
          return item.type === 'media' && (item as MediaPartnership).mediaType === selectedCategory;
        }
        return item.type === selectedCategory;
      });
  
  const featuredItems = portfolioItems.filter(item => item.featured);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Check for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Create vintage TV static effect
    const createStaticEffect = () => {
      const staticOverlay = document.createElement('div');
      staticOverlay.className = 'tv-static absolute inset-0 opacity-10 pointer-events-none';
      staticOverlay.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";
      
      const mediaCards = document.querySelectorAll('.media-card');
      mediaCards.forEach(card => {
        const clone = staticOverlay.cloneNode();
        card.appendChild(clone);
      });
    };

    // Animate ticker
    const animateTicker = () => {
      const ticker = document.querySelector('.stats-ticker');
      if (!ticker) return;

      gsap.to(ticker, {
        x: '-50%',
        repeat: -1,
        duration: 15,
        ease: 'linear'
      });
    };

    // GSAP animations
    const setupAnimations = () => {
      // Heading animation
      gsap.from('.section-heading', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-heading',
          start: 'top 80%',
        }
      });
      
      // Filter buttons animation
      gsap.from('.filter-button', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.filter-container',
          start: 'top 85%',
        }
      });
      
      // Portfolio items animation
      const items = document.querySelectorAll('.portfolio-item');
      gsap.fromTo(items, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%',
          }
        }
      );
      
      // Stats ticker animation
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
          },
          onComplete: animateTicker
        });
      }
    };

    createStaticEffect();
    setupAnimations();

    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory]);

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowCaseStudy(null); // Close any open case study
  };

  const toggleCaseStudy = (id: number) => {
    setShowCaseStudy(showCaseStudy === id ? null : id);
  };

  const getIconForType = (item: PortfolioItem) => {
    if (item.type === 'case-study') {
      return <BarChart3 className="h-5 w-5" />;
    } else if (item.type === 'event') {
      return <Calendar className="h-5 w-5" />;
    } else if (item.type === 'media') {
      const media = item as MediaPartnership;
      if (media.mediaType === 'newspaper') return <Newspaper className="h-5 w-5" />;
      if (media.mediaType === 'tv') return <Tv className="h-5 w-5" />;
      if (media.mediaType === 'radio') return <Radio className="h-5 w-5" />;
    }
    return null;
  };

  // Get current featured item
  const currentFeatured = featuredItems[currentSlide];

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-zinc-950 text-white overflow-hidden">
      {/* Vintage newspaper-style header */}
      <div className="relative border-b border-zinc-800 mb-16">
        <div className="container mx-auto px-4 md:px-6 pb-6">
          <div className="section-heading flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-[1px] w-10 bg-indigo-500"></div>
              <span className="mx-4 text-sm text-indigo-400 uppercase tracking-wider font-medium">Business Portfolio</span>
              <div className="h-[1px] w-10 bg-indigo-500"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Our Success Stories
            </h2>
            
            <p className="max-w-3xl mx-auto text-zinc-400 text-lg mb-8">
              Explore our portfolio of successful advertising campaigns, media partnerships, and corporate events that have helped our clients achieve their marketing goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Filter buttons */}
        <div className="filter-container flex flex-wrap justify-center mb-12 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`filter-button flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {category.id === 'all' && <Filter className="mr-2 h-4 w-4" />}
              {category.id === 'case-study' && <BarChart3 className="mr-2 h-4 w-4" />}
              {category.id === 'media' && <PlayCircle className="mr-2 h-4 w-4" />}
              {category.id === 'event' && <Calendar className="mr-2 h-4 w-4" />}
              {category.id === 'newspaper' && <Newspaper className="mr-2 h-4 w-4" />}
              {category.id === 'tv' && <Tv className="mr-2 h-4 w-4" />}
              {category.id === 'radio' && <Radio className="mr-2 h-4 w-4" />}
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Case Studies Slider - Only show when All or Case Studies is selected */}
        {(selectedCategory === 'all' || selectedCategory === 'case-study') && featuredItems.length > 0 && (
          <div className="mb-20 relative">
            <div className="overflow-hidden rounded-lg shadow-2xl bg-zinc-900 border border-zinc-800">
              <div className="relative aspect-video md:aspect-[16/7] overflow-hidden">
                <img 
                  src={currentFeatured.imageUrl} 
                  alt={currentFeatured.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs uppercase tracking-wider rounded-full">
                      {currentFeatured.industry}
                    </span>
                    <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs uppercase tracking-wider rounded-full flex items-center">
                      {currentFeatured.type === 'case-study' && (
                        <>
                          <BarChart3 className="mr-1 h-3 w-3" />
                          Case Study
                        </>
                      )}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    {currentFeatured.title}
                  </h3>
                  
                  <p className="text-zinc-300 mb-6 max-w-3xl">
                    {currentFeatured.description}
                  </p>
                  
                  {currentFeatured.type === 'case-study' && currentFeatured.before && currentFeatured.after && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {Object.entries(currentFeatured.before).map(([key, beforeValue], index) => {
                        const afterValue = currentFeatured.after?.[key];
                        return (
                          <div key={key} className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4">
                            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">{key}</p>
                            <div className="flex flex-col">
                              <p className="text-zinc-300 line-through opacity-70">{beforeValue}</p>
                              <p className="text-indigo-400 font-bold">{afterValue}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="text-zinc-400">Client: <span className="text-white">{currentFeatured.client}</span></span>
                    <a 
                      href={currentFeatured.link} 
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      View Full Case Study <ExternalLink className="ml-1 h-4 w-4" />
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
        )}

        {/* Stats ticker - shown with all filters */}
        <div 
          ref={statsRef}
          className="relative h-12 mb-12 overflow-hidden bg-zinc-900 border-y border-zinc-800 flex items-center"
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
          
          <div className="stats-ticker flex whitespace-nowrap">
            <div className="flex items-center gap-8 px-4">
              <div className="flex items-center text-indigo-400">
                <Award className="h-4 w-4 mr-2" />
                <span>120+ successful campaigns</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Avg. ROI increase: +35%</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <PieChart className="h-4 w-4 mr-2" />
                <span>25+ industries served</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Newspaper className="h-4 w-4 mr-2" />
                <span>12 major newspaper partnerships</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Tv className="h-4 w-4 mr-2" />
                <span>8 TV channels featured</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Radio className="h-4 w-4 mr-2" />
                <span>15 radio station collaborations</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>20+ corporate events organized</span>
              </div>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-8 px-4">
              <div className="flex items-center text-indigo-400">
                <Award className="h-4 w-4 mr-2" />
                <span>120+ successful campaigns</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Avg. ROI increase: +35%</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <PieChart className="h-4 w-4 mr-2" />
                <span>25+ industries served</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Newspaper className="h-4 w-4 mr-2" />
                <span>12 major newspaper partnerships</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Tv className="h-4 w-4 mr-2" />
                <span>8 TV channels featured</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Radio className="h-4 w-4 mr-2" />
                <span>15 radio station collaborations</span>
              </div>
              <div className="flex items-center text-indigo-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>20+ corporate events organized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.filter(item => !item.featured || selectedCategory !== 'all').map((item) => (
            <div 
              key={item.id} 
              className={`portfolio-item group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-lg transition-all duration-300 ${
                item.type === 'media' ? `media-card media-${(item as MediaPartnership).mediaType}` : ''
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-xs uppercase tracking-wider
                    ${item.type === 'case-study' ? 'bg-indigo-600/90 text-white' : ''}
                    ${item.type === 'media' ? 'bg-red-600/90 text-white' : ''}
                    ${item.type === 'event' ? 'bg-amber-600/90 text-white' : ''}
                  `}>
                    {getIconForType(item)}
                    {item.type === 'media' 
                      ? `${(item as MediaPartnership).mediaType}` 
                      : item.type.split('-').join(' ')}
                  </span>
                </div>
                
                {/* Industry badge */}
                <span className="absolute top-4 right-4 bg-zinc-800/80 text-zinc-300 px-2 py-1 rounded text-xs">
                  {item.industry}
                </span>
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                
                {/* Media partnership specific info */}
                {item.type === 'media' && (
                  <div className="mb-4">
                    <p className="text-indigo-400 text-sm font-medium mb-2">
                      {(item as MediaPartnership).mediaBrand}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(item as MediaPartnership).campaignType.map((type, index) => (
                        <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-xs">
                      Reach: {(item as MediaPartnership).reach}
                    </p>
                  </div>
                )}
                
                {/* Event specific info */}
                {item.type === 'event' && (
                  <div className="mb-4">
                    <div className="flex items-center text-zinc-400 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {(item as CorporateEvent).date}
                    </div>
                    <p className="text-zinc-400 text-sm mb-1">
                      Location: {(item as CorporateEvent).location}
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Attendees: {(item as CorporateEvent).attendees}
                    </p>
                  </div>
                )}
                
                {/* Common sections */}
                <p className="text-zinc-400 text-sm mb-4">
                  {item.description.length > 100 
                    ? `${item.description.substring(0, 100)}...` 
                    : item.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Client: {item.client}</span>
                  
                  {item.type === 'case-study' && item.before && item.after ? (
                    <button 
                      onClick={() => toggleCaseStudy(item.id)}
                      className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors"
                    >
                      {showCaseStudy === item.id ? 'Hide Results' : 'View Results'} 
                      <ChevronRight className={`ml-1 h-3 w-3 transition-transform ${showCaseStudy === item.id ? 'rotate-90' : ''}`} />
                    </button>
                  ) : (
                    <a 
                      href={item.link} 
                      className="text-indigo-400 text-sm flex items-center hover:text-indigo-300 transition-colors"
                    >
                      Details <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
                
                {/* Expandable case study results */}
                {item.type === 'case-study' && showCaseStudy === item.id && item.before && item.after && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 animate-fadeIn">
                    <h5 className="text-sm font-medium text-white mb-3">Campaign Results:</h5>
                    <div className="space-y-3">
                      {Object.entries(item.before).map(([key, beforeValue], index) => {
                        const afterValue = item.after?.[key];
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-zinc-400 text-xs">{key}:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 line-through text-xs">{beforeValue}</span>
                              <ChevronRight className="h-3 w-3 text-indigo-400" />
                              <span className="text-indigo-400 font-medium text-xs">{afterValue}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {(item as CaseStudy).testimonial && (
                      <div className="mt-4 italic text-zinc-300 text-sm">
                        "{(item as CaseStudy).testimonial}"
                        <p className="text-right text-zinc-400 text-xs mt-1 not-italic">
                          — {(item as CaseStudy).testimonialAuthor}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Add special styling for different media types */}
              {item.type === 'media' && (item as MediaPartnership).mediaType === 'newspaper' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-400 via-white to-zinc-400"></div>
              )}
              
              {item.type === 'media' && (item as MediaPartnership).mediaType === 'tv' && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 tv-static"></div>
              )}
              
              {item.type === 'media' && (item as MediaPartnership).mediaType === 'radio' && (
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full border-2 border-zinc-700 flex items-center justify-center pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-red-600/50 animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;