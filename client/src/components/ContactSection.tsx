import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    // Animate contact section elements
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    timeline
      .from(".contact-info", {
        x: -50,
        opacity: 0,
        duration: 0.8
      })
      .from(".contact-form", {
        x: 50,
        opacity: 0,
        duration: 0.8
      }, "-=0.6");
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section relative py-20 md:py-32 bg-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="contact-info">
            <h2 className="text-sm uppercase tracking-wider text-accent font-medium mb-3">
              Get In Touch
            </h2>
            <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-balance">
              Ready to Elevate Your Brand?
            </h3>
            <p className="text-lg opacity-80 mb-8 text-balance">
              Let's discuss how our advertising solutions can transform your brand
              presence and drive business growth. Contact us today to schedule a
              consultation.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Location</h4>
                  <p className="opacity-80">Akola, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Email</h4>
                  <p className="opacity-80">info@quickadd.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Phone</h4>
                  <a
                    href="tel:+912345678900"
                    className="opacity-80 hover:text-primary transition-colors"
                  >
                    +91 234 567 8900
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-montserrat font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-2xl blur opacity-20"></div>
            <div className="relative bg-background rounded-xl p-8 border border-border shadow-lg">
              <h4 className="text-2xl font-montserrat font-semibold mb-6">
                Send Us a Message
              </h4>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border ${
                        errors.name ? "border-red-500" : "border-border"
                      } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border ${
                        errors.email ? "border-red-500" : "border-border"
                      } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border ${
                      errors.subject ? "border-red-500" : "border-border"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border ${
                      errors.message ? "border-red-500" : "border-border"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                    placeholder="Tell us about your project..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
