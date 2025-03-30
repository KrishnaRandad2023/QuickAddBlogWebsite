import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="service-card bg-secondary rounded-xl p-6 border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h4 className="text-xl font-montserrat font-semibold mb-3">{title}</h4>
      <p className="opacity-80 mb-4 text-balance">{description}</p>
      <a href="#" className="inline-flex items-center text-primary hover:text-accent transition-colors">
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
};

export default ServiceCard;
