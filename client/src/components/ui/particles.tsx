import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

const colors = ["#9933FF33", "#FF336633", "#2E319233"];

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 15;
    
    // Create initial particles
    const createParticles = () => {
      const particles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.floor(Math.random() * 80) + 40;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particles.push({
          x,
          y,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1
        });
      }
      
      particlesRef.current = particles;
      
      // Create particle elements
      container.innerHTML = '';
      particles.forEach(particle => {
        const element = document.createElement('div');
        element.className = 'particle absolute rounded-full opacity-50';
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.backgroundColor = particle.color;
        element.style.left = `${particle.x}%`;
        element.style.top = `${particle.y}%`;
        
        container.appendChild(element);
      });
    };
    
    // Animate particles
    const animateParticles = () => {
      if (!containerRef.current) return;
      
      const particles = particlesRef.current;
      const particleElements = containerRef.current.children;
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < -10) particle.x = 110;
        if (particle.x > 110) particle.x = -10;
        if (particle.y < -10) particle.y = 110;
        if (particle.y > 110) particle.y = -10;
        
        // Update DOM element
        const element = particleElements[i] as HTMLElement;
        element.style.left = `${particle.x}%`;
        element.style.top = `${particle.y}%`;
      }
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    createParticles();
    animateParticles();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
    ></div>
  );
};

export default Particles;
