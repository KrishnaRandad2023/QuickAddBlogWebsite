import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./ui/testimonial-card";

const testimonials = [
  {
    company: "Samarth Electronics",
    industry: "Electronics Retailer",
    quote:
      "Quick Add took our brand visibility to new heights with their integrated marketing approach. Their TV commercials and digital strategy resulted in a 40% increase in foot traffic to our stores.",
    author: "Rahul Patil",
    position: "Marketing Director",
    initial: "S",
    rating: 5,
  },
  {
    company: "Lakshmi Jewellers",
    industry: "Premium Jewelry Brand",
    quote:
      "The team at Quick Add truly understands the luxury market. Their print campaigns and outdoor advertising strategy helped us establish a premium brand presence that resonates with our target clientele.",
    author: "Priya Sharma",
    position: "CEO",
    initial: "L",
    rating: 5,
  },
  {
    company: "Global Education",
    industry: "Educational Institution",
    quote:
      "Quick Add transformed our enrollment strategy with targeted digital marketing. Their data-driven approach and authentic content creation increased our application rates by 35% year-over-year.",
    author: "Dr. Vikram Singh",
    position: "Director of Admissions",
    initial: "G",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const updateSliderDimensions = () => {
    if (!sliderRef.current) return;

    const containerWidth = sliderRef.current.offsetWidth;
    
    if (window.innerWidth >= 1024) {
      // lg breakpoint - 3 slides
      setSlidesPerView(3);
      setSlideWidth(containerWidth / 3);
    } else if (window.innerWidth >= 768) {
      // md breakpoint - 2 slides
      setSlidesPerView(2);
      setSlideWidth(containerWidth / 2);
    } else {
      // sm breakpoint - 1 slide
      setSlidesPerView(1);
      setSlideWidth(containerWidth);
    }
  };

  useEffect(() => {
    updateSliderDimensions();
    window.addEventListener("resize", updateSliderDimensions);
    
    return () => {
      window.removeEventListener("resize", updateSliderDimensions);
    };
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    
    sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }, [currentSlide, slideWidth]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === testimonials.length - slidesPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonials.length - slidesPerView : prev - 1
    );
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
            Client Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
            What Our Clients Say
          </h3>
          <p className="max-w-2xl mx-auto text-lg opacity-80 text-balance">
            We take pride in our client relationships and the results we deliver.
            Here's what some of our valued clients have to say about our services.
          </p>
        </div>

        <div className="overflow-hidden">
          <div 
            ref={sliderRef} 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${testimonials.length * slideWidth}px` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="px-4"
                style={{ width: `${slideWidth}px` }}
              >
                <TestimonialCard
                  company={testimonial.company}
                  industry={testimonial.industry}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  position={testimonial.position}
                  initial={testimonial.initial}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
