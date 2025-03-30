import { Star } from "lucide-react";

interface TestimonialCardProps {
  company: string;
  industry: string;
  quote: string;
  author: string;
  position: string;
  initial: string;
  rating: number;
}

const TestimonialCard = ({
  company,
  industry,
  quote,
  author,
  position,
  initial,
  rating,
}: TestimonialCardProps) => {
  return (
    <div className="testimonial-card bg-background p-8 rounded-xl border border-border shadow-lg h-full transition-all duration-500 hover:shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
            <span className="text-xl font-bold text-primary">{initial}</span>
          </div>
          <div>
            <h4 className="font-montserrat font-semibold">{company}</h4>
            <p className="text-sm opacity-75">{industry}</p>
          </div>
        </div>
        <div className="flex text-accent">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5" fill="currentColor" />
          ))}
        </div>
      </div>
      <blockquote className="mb-6">
        <p className="italic opacity-90 text-balance">{quote}</p>
      </blockquote>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{author}</p>
        <p className="text-xs opacity-75">{position}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
