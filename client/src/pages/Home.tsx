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

const Home = () => {
  useEffect(() => {
    // Setup theme CSS variables
    setupThemeVariables();
    
    // Initialize GSAP animations
    initializeAnimations();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      // Clean up event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ServiceSection />
        <FeaturesSection />
        <TrendsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
