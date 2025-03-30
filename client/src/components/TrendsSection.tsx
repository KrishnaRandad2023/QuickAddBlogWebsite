import { useEffect } from "react";
import { gsap } from "gsap";
import { 
  Lightbulb, 
  Video, 
  Heart, 
  BarChart 
} from "lucide-react";

const trends = [
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "AI Integration",
    description:
      "We harness artificial intelligence to enhance targeted advertising, personalize content, and improve campaign efficiency for maximum ROI.",
    source: "EXPLODINGTOPICS.COM",
  },
  {
    icon: <Video className="h-6 w-6 text-primary" />,
    title: "Short-Form Video Content",
    description:
      "We craft engaging short-form videos for platforms like TikTok and Instagram to capture audience attention in brief, impactful segments.",
    source: "EXPLODINGTOPICS.COM",
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Authentic Marketing",
    description:
      "We develop purpose-driven campaigns that reflect genuine brand values and resonate with consumers seeking authenticity in advertising.",
    source: "MEDIATOOL.COM",
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: "Data-Driven Strategies",
    description:
      "We leverage data analytics to inform decision-making, optimize campaigns, and deliver measurable results that exceed expectations.",
    source: "OUTBRAIN.COM",
  },
];

const TrendsSection = () => {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".trend-card").forEach((card, i) => {
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
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
            Embracing Innovation
          </h2>
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
            Industry Trends We Leverage
          </h3>
          <p className="max-w-2xl mx-auto text-lg opacity-80 text-balance">
            We stay at the forefront of advertising evolution, incorporating
            cutting-edge technologies and strategies to maximize your brand impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="trend-card bg-secondary rounded-xl p-8 border border-border hover:shadow-xl hover:shadow-primary/10 transition-all hover:border-primary/30"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  {trend.icon}
                </div>
                <div>
                  <h4 className="text-xl font-montserrat font-semibold mb-3">
                    {trend.title}
                  </h4>
                  <p className="opacity-80 mb-4 text-balance">{trend.description}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary inline-block">
                    {trend.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendsSection;
