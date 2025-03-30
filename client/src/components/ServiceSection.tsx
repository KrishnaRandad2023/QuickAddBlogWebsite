import { useEffect } from "react";
import { 
  Newspaper, 
  Video, 
  Globe, 
  Radio, 
  MapPin, 
  Calendar
} from "lucide-react";
import ServiceCard from "./ui/service-card";
import { animateServiceCards } from "@/lib/animations";

const services = [
  {
    icon: <Newspaper className="h-6 w-6 text-primary" />,
    title: "Print Media Branding",
    description: "Design and execution of compelling newspaper and magazine advertisements, brochures, and promotional materials."
  },
  {
    icon: <Video className="h-6 w-6 text-primary" />,
    title: "Television Advertising",
    description: "Production of high-quality TV commercials with our in-house film director, from concept to post-production."
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Digital Branding",
    description: "Development of robust online brand identities through website design, social media management, and content creation."
  },
  {
    icon: <Radio className="h-6 w-6 text-primary" />,
    title: "Radio Advertising",
    description: "Creation of catchy radio jingles that resonate with target audiences and strategic placement to maximize reach."
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Outdoor Advertising",
    description: "Design and placement of impactful hoardings in strategic locations to capture consumer attention in high-traffic areas."
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Corporate Events",
    description: "Planning and execution of corporate events aligned with brand objectives, including logistics and promotions."
  }
];

const ServiceSection = () => {
  useEffect(() => {
    animateServiceCards();
  }, []);

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
            Our Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
            Comprehensive Advertising Solutions
          </h3>
          <p className="max-w-2xl mx-auto text-lg opacity-80 text-balance">
            From traditional print media to cutting-edge digital marketing, we offer
            a full spectrum of services tailored to your brand's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
