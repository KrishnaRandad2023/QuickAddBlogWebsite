import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";
import FeaturesSection from "@/components/FeaturesSection";
import TrendsSection from "@/components/TrendsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { setupThemeVariables } from "@/lib/themeUtils";
import { initializeAnimations } from "@/lib/animations";

// New interactive ad components
import NewsTicker from "@/components/NewsTicker";
import FilmReel from "@/components/FilmReel";
import SocialMediaFeed from "@/components/SocialMediaFeed";
import DigitalBillboard from "@/components/DigitalBillboard";
import RadioAd from "@/components/RadioAd";
import PortfolioSection from "@/components/PortfolioSection";
import BookCallSection from "@/components/BookCallSection";

// Sample news headlines for ticker
const headlines = [
  "Quick Add Agency wins 5 awards at Annual Advertising Excellence Summit",
  "New digital campaign increases client's conversion rate by 200%",
  "Introducing our revolutionary AI-powered ad targeting system",
  "Partnership with major social media platforms announced for exclusive ad placement",
  "Quick Add named Top Advertising Agency of 2025 by Industry Insider"
];

const Home = () => {
  useEffect(() => {
    // Setup theme CSS variables
    setupThemeVariables();
    
    // Initialize GSAP animations
    initializeAnimations();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        
        const anchorElement = e.currentTarget as HTMLAnchorElement;
        const href = anchorElement.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      });
    });
    
    // Add TV static effect to page transitions
    const addStaticTransitionEffect = () => {
      // Create static overlay element
      const staticOverlay = document.createElement('div');
      staticOverlay.className = 'tv-static-overlay fixed inset-0 z-[100] pointer-events-none opacity-0';
      staticOverlay.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";
      document.body.appendChild(staticOverlay);

      // Add event listener for internal links
      document.querySelectorAll('a:not([href^="http"])').forEach(link => {
        link.addEventListener('click', (e: Event) => {
          const linkElement = e.currentTarget as HTMLAnchorElement;
          const href = linkElement.getAttribute('href');
          if (!href || href.startsWith('#')) return; // Skip anchor links
          
          // Show static effect
          staticOverlay.style.opacity = '1';
          setTimeout(() => {
            staticOverlay.style.opacity = '0';
          }, 500);
        });
      });
    };
    
    addStaticTransitionEffect();
    
    return () => {
      // Clean up event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      
      // Remove static overlay
      const staticOverlay = document.querySelector('.tv-static-overlay');
      staticOverlay?.remove();
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-background text-foreground">
      {/* News ticker at the top */}
      <NewsTicker headlines={headlines} />
      
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Digital Billboard section */}
        <DigitalBillboard />
        
        <ServiceSection />
        
        {/* Film Reel section */}
        <div className="bg-zinc-100 dark:bg-zinc-900 py-6">
          <FilmReel />
        </div>
        
        <FeaturesSection />
        
        {/* Portfolio section */}
        <PortfolioSection />
        
        {/* Social Media Feed section */}
        <div className="bg-zinc-50 dark:bg-zinc-950 py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Social Media Impact</h2>
            <SocialMediaFeed />
          </div>
        </div>
        
        <TrendsSection />
        
        {/* Radio Ad section */}
        <div className="py-12 bg-zinc-100 dark:bg-zinc-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Listen to Our Podcast</h2>
            <RadioAd 
              title="The Advertising Insider"
              description="Listen to our experts break down the latest trends in advertising and marketing strategies for your brand."
            />
          </div>
        </div>
        
        <TestimonialsSection />
        
        {/* Book Call section */}
        <BookCallSection />
        
        <FaqSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      
      <Footer />
      {/* Global styles moved to index.css */}
    </div>
  );
};

export default Home;
