import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email("Valid email is required")
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", data);
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-secondary rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4 text-balance">
              Stay Updated With Industry Trends
            </h3>
            <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto text-balance">
              Subscribe to our newsletter for the latest advertising insights,
              trends, and exclusive offers.
            </p>

            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg bg-background border ${
                    errors.email ? "border-red-500" : "border-border"
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.email && (
                  <p className="absolute text-sm text-red-500 mt-1 left-0">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 whitespace-nowrap disabled:opacity-70"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            <p className="text-xs opacity-70 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive marketing communications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
