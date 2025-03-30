import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Testimonials based on the provided image
const testimonials = [
  {
    company: "Global",
    industry: "Electronics Retailer",
    quote: "Quick Add took our brand visibility to new heights with their integrated marketing approach. Their TV commercials and digital strategy resulted in a 40% increase in foot traffic to our stores.",
    author: "Marketing Director",
    position: "Electronics Retailer",
    rating: 5,
  },
  {
    company: "FinTech Corporation",
    industry: "Financial Institution",
    quote: "Quick Add transformed our enrollment strategy with digital marketing. Their data-driven approach and authentic content creation increased our application rates by 35% year-over-year.",
    author: "Director of Marketing",
    position: "Financial Institution",
    rating: 5,
  },
  {
    company: "Luxury Brand",
    industry: "Premium Jewelry",
    quote: "The team at Quick Add truly understands the luxury market. Their print campaigns and outdoor advertising strategy helped us establish a premium brand presence that resonates with our target clientele.",
    author: "Brand Marketing",
    position: "Retail Jewelry",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ratingStarsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;

    // Create the stars animation
    const createStars = () => {
      if (!ratingStarsRef.current) return;
      
      const stars = ratingStarsRef.current;
      stars.innerHTML = '';
      
      for (let i = 0; i < 7; i++) {
        const star = document.createElement('div');
        star.className = 'star inline-block text-red-600 mx-1';
        star.innerHTML = '★';
        star.style.fontSize = '24px';
        stars.appendChild(star);
      }
      
      // Animate the stars
      gsap.from('.star', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out"
      });
    };
    
    createStars();
    
    // Create text reveal animations
    gsap.utils.toArray<HTMLElement>('.testimonial-item').forEach((testimonial, i) => {
      const quote = testimonial.querySelector('.quote');
      const companyElement = testimonial.querySelector('.company');
      
      gsap.set([quote, companyElement], { opacity: 0, y: 20 });
      
      ScrollTrigger.create({
        trigger: testimonial,
        start: "top 80%",
        onEnter: () => {
          gsap.to(quote, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          gsap.to(companyElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
          });
        },
        once: true
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="testimonials" className="relative py-16 md:py-24 bg-zinc-950 text-white">
      <div className="absolute top-0 left-0 w-full h-12 bg-indigo-900 overflow-hidden flex items-center">
        <div ref={ratingStarsRef} className="absolute right-4 top-1/2 transform -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            What Our Clients Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item group relative">
              {/* Company Identifier */}
              <div className="absolute left-4 top-3 text-5xl font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                {testimonial.company.charAt(0)}
              </div>
              
              {/* Industry Label */}
              <div className="absolute -left-3 top-12 -rotate-90 origin-left text-sm tracking-wide text-indigo-400 opacity-70">
                {testimonial.industry}
              </div>
              
              {/* Quote Block */}
              <div className="quote relative z-10 pl-12 pr-8 py-12 italic text-lg font-serif leading-relaxed">
                {testimonial.quote.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={`inline-block ${
                      i % 7 === 0 ? 'font-bold text-xl text-indigo-400' : ''
                    }`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
              
              {/* Author Info */}
              <div className="company mt-8 pl-12 opacity-80 flex flex-col">
                <span className="text-base font-semibold text-indigo-300">{testimonial.author}</span>
                <span className="text-sm text-gray-400">{testimonial.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
