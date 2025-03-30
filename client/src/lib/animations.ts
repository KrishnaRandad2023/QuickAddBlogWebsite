import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero animations
export const animateHeroElements = () => {
  // Animate hero title
  gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });

  // Animate hero subtitle
  gsap.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5,
  });

  // Animate buttons
  gsap.from(".hero-buttons", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.8,
  });

  // Animate hero image
  gsap.from(".hero-image", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.4,
  });
};

// Services section animations
export const animateServiceCards = () => {
  gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  });
};

// Features section animations
export const animateFeaturesSection = () => {
  // Animate feature image
  gsap.from(".features-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".features-section",
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
    },
  });

  // Animate feature items
  gsap.utils.toArray<HTMLElement>(".feature-item").forEach((item, i) => {
    gsap.from(item, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });
  });
};

// Testimonials animations
export const animateTestimonials = () => {
  gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
    gsap.from(card, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });
  });
};

// FAQ animations
export const animateFAQs = () => {
  gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item, i) => {
    gsap.from(item, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });
  });
};

// Contact section animations
export const animateContactSection = () => {
  gsap.from(".contact-info", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".contact-form", {
    x: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
    },
  });
};

// Create scroll progress indicator
export const createScrollProgress = () => {
  ScrollTrigger.create({
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const progress = document.getElementById("progress-bar");
      if (progress) {
        progress.style.width = `${self.progress * 100}%`;
      }
    },
  });
};

// Initialize all animations
export const initializeAnimations = () => {
  // Wait for DOM content to be fully loaded
  window.addEventListener("load", () => {
    createScrollProgress();
    animateHeroElements();
    
    // Set up other animations with a slight delay to ensure smooth initial load
    setTimeout(() => {
      animateServiceCards();
      animateFeaturesSection();
      animateTestimonials();
      animateFAQs();
      animateContactSection();
    }, 200);
  });
};
