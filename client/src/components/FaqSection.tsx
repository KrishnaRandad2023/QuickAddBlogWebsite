import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer:
      "We have extensive experience across various sectors including Education, Jewelry, Electronics, Automobiles, Restaurants, Malls, and Furniture brands. Our team tailors advertising strategies to meet the specific needs and challenges of each industry.",
  },
  {
    question: "How do you measure campaign success?",
    answer:
      "We implement comprehensive analytics and tracking systems to measure key performance indicators aligned with your business objectives. This includes metrics such as reach, engagement, conversion rates, ROI, and brand sentiment analysis. We provide regular reports detailing campaign performance and insights.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. A comprehensive brand campaign typically takes 4-6 weeks from initial consultation to launch, while individual advertising elements may require 1-3 weeks. We work closely with clients to establish realistic timelines that balance quality delivery with market timing requirements.",
  },
  {
    question: "Do you offer ongoing campaign management?",
    answer:
      "Yes, we offer comprehensive campaign management services including implementation, monitoring, optimization, and reporting. Our team continuously analyzes performance data to make real-time adjustments that maximize campaign effectiveness and return on investment.",
  },
  {
    question: "How do you stay current with industry trends?",
    answer:
      "Our team is committed to continuous learning through industry conferences, workshops, certifications, and partnerships with technology providers. We regularly research market trends, consumer behavior patterns, and emerging technologies to ensure our strategies remain innovative and effective.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Animate FAQ items appearing
    gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item, i) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
            Common Questions
          </h2>
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
            Frequently Asked Questions
          </h3>
          <p className="max-w-2xl mx-auto text-lg opacity-80 text-balance">
            Everything you need to know about our advertising services and processes.
            Can't find what you're looking for? Feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-secondary rounded-xl overflow-hidden border border-border"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <h4 className="font-montserrat font-semibold text-lg">
                    {faq.question}
                  </h4>
                  <ChevronDown 
                    className={`h-5 w-5 transform transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                <div
                  id={`faq-content-${index}`}
                  className={`transition-all duration-300 ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="opacity-80 text-balance">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
