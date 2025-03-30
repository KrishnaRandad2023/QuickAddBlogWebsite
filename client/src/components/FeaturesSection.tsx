import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  ShieldCheck, 
  LayoutGrid, 
  Zap,
  Users
} from "lucide-react";

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const features = featureItemsRef.current?.querySelectorAll('.feature-item');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animate image
    timeline.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate feature items sequentially
    if (features) {
      features.forEach((item, index) => {
        timeline.from(item, {
          x: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out"
        }, "-=0.3");
      });
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="features-section relative py-20 md:py-32 bg-secondary"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={featureItemsRef} className="space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
                Why Choose Us
              </h2>
              <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
                Elevating Your Brand With Proven Expertise
              </h3>
              <p className="text-lg opacity-80 mb-6 text-balance">
                With 42 years of industry leadership, we blend traditional advertising
                wisdom with cutting-edge innovations to create campaigns that deliver
                measurable results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="feature-item flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-montserrat font-semibold mb-2">
                    Proven Expertise
                  </h4>
                  <p className="opacity-80 text-balance">
                    Over four decades of experience crafting successful advertising
                    campaigns across diverse industries.
                  </p>
                </div>
              </div>

              <div className="feature-item flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-montserrat font-semibold mb-2">
                    Comprehensive Services
                  </h4>
                  <p className="opacity-80 text-balance">
                    A full suite of advertising solutions tailored to your specific
                    requirements and business objectives.
                  </p>
                </div>
              </div>

              <div className="feature-item flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-montserrat font-semibold mb-2">
                    Innovative Approach
                  </h4>
                  <p className="opacity-80 text-balance">
                    Adoption of the latest industry trends and technologies to keep
                    your brand ahead of the competition.
                  </p>
                </div>
              </div>

              <div className="feature-item flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-montserrat font-semibold mb-2">
                    Client-Centric Focus
                  </h4>
                  <p className="opacity-80 text-balance">
                    Dedicated to understanding your objectives and delivering
                    customized strategies for success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="features-image relative order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-accent to-secondary rounded-2xl blur opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Creative team brainstorming session"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 max-w-xs bg-background rounded-lg p-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h5 className="font-montserrat font-semibold">Proven Results</h5>
                  <p className="text-sm opacity-80">Success across multiple industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
