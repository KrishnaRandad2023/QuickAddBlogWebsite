import React, { useState, useEffect } from 'react';
import { useTheme } from '../lib/themeUtils';
import { 
  Calendar, 
  Clock, 
  Calendar as CalendarIcon, 
  BarChart2, 
  Phone, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle,
  Users,
  BarChart,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Calendar component styles
import '@/components/ui/calendar.css';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

// Stats for the ticker
const businessStats = [
  "42+ Years of Experience",
  "10,000+ Campaigns Executed",
  "₹250+ Crores in Ad Spend Managed",
  "500+ Brands Scaled",
  "98% Client Satisfaction",
  "35+ Industry Awards"
];

// Available time slots for the booking
const availableTimeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Consultation types
const consultationTypes = [
  {
    id: "advertising",
    title: "Advertising Strategy Call",
    description: "Perfect for businesses needing a full-fledged ad campaign across platforms."
  },
  {
    id: "branding",
    title: "Brand Identity Consultation",
    description: "For logo, website, and overall brand presence improvement."
  },
  {
    id: "media",
    title: "Media Buying & Placement",
    description: "Strategic placement in newspaper, TV, radio, and digital platforms."
  },
  {
    id: "growth",
    title: "Custom Growth Plan",
    description: "Personalized business scaling strategies tailored to your needs."
  }
];

// Testimonials for the slider
const testimonials = [
  {
    text: "QuickAdd transformed our marketing strategy. Our ROI increased by 320% in just 6 months.",
    author: "Priya Sharma",
    company: "TechSprint Solutions",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "The consultation call was a game-changer for our brand identity. Their insights were invaluable.",
    author: "Rajiv Mehta",
    company: "GreenLeaf Organics",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "Their media buying strategy saved us 40% on ad spend while doubling our reach. Incredible!",
    author: "Aisha Khan",
    company: "Urban Lifestyle Brands",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const BookCallSection: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [statIndex, setStatIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState("advertising");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: ""
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Stats ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((prevIndex) => (prevIndex + 1) % businessStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Display success toast
      toast({
        title: "Consultation Booked!",
        description: `Your ${getConsultationTitle()} is scheduled for ${format(selectedDate, 'PPPP')} at ${selectedTime}.`,
        variant: "default"
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setCurrentStep(1);
        setSelectedDate(undefined);
        setSelectedTime(null);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          notes: ""
        });
      }, 3000);
    }, 1500);
  };

  // Get consultation type title
  const getConsultationTitle = () => {
    const found = consultationTypes.find(type => type.id === consultationType);
    return found ? found.title : "Consultation";
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep === 1 && !selectedDate) {
      toast({
        title: "Please Select a Date",
        description: "You need to choose a date before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !selectedTime) {
      toast({
        title: "Please Select a Time",
        description: "You need to choose a time slot before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
  };
  
  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  return (
    <section id="book-call" className="py-16 md:py-24 overflow-hidden relative">
      {/* Background gradient effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>

      {/* Moving ticker of business stats in newspaper style */}
      <div className="relative max-w-7xl mx-auto mb-10 overflow-hidden border-y border-primary/30">
        <div className="bg-primary/10 py-2">
          <div className="flex whitespace-nowrap animate-marquee">
            {businessStats.concat(businessStats).map((stat, index) => (
              <div key={index} className="mx-8 text-sm font-medium flex items-center">
                <span className="mr-2 text-primary"><BarChart size={14} /></span>
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breaking News style heading */}
        <div className="newspaper-heading flex items-center mb-10">
          <div className="px-3 py-1 bg-primary text-white font-bold text-sm mr-4">BREAKING NEWS</div>
          <h2 className="text-xl md:text-2xl font-display">Your Business Growth Starts Here!</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left column: Main content */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Unlock Your Brand's<br />
              <span className="text-primary">Full Potential</span>
              <span className="text-6xl ml-1">—</span> Let's Talk!
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl">
              Book a one-on-one consultation with our advertising experts and get a personalized 
              strategy to elevate your brand in today's competitive market.
            </p>
            
            <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="group relative overflow-hidden py-6 px-8">
                    <span className="relative z-10 flex items-center">
                      Schedule a Free Growth Consultation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="absolute inset-0 bg-primary-light transform transition-transform group-hover:translate-y-0 translate-y-full"></span>
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[600px]">
                  {!isSubmitted ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {currentStep === 1 && "Choose a Date"}
                          {currentStep === 2 && "Select a Time"}
                          {currentStep === 3 && "Consultation Type"}
                          {currentStep === 4 && "Your Details"}
                        </DialogTitle>
                        <DialogDescription>
                          {currentStep === 1 && "Select a date for your consultation call"}
                          {currentStep === 2 && "Choose a time slot that works for you"}
                          {currentStep === 3 && "What type of consultation do you need?"}
                          {currentStep === 4 && "Fill in your information to complete booking"}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-4">
                        {/* Step 1: Date Selection */}
                        {currentStep === 1 && (
                          <div className="flex justify-center py-4">
                            <DayPicker
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={[{ before: new Date() }]}
                              className="border rounded-md p-3"
                            />
                          </div>
                        )}
                        
                        {/* Step 2: Time Selection */}
                        {currentStep === 2 && (
                          <div className="grid grid-cols-3 gap-3 py-4">
                            {availableTimeSlots.map((time) => (
                              <div 
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                  flex items-center justify-center p-3 rounded-md border cursor-pointer
                                  hover:border-primary transition-colors
                                  ${selectedTime === time ? 'bg-primary/10 border-primary' : 'border-input'}
                                `}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{time}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Step 3: Consultation Type */}
                        {currentStep === 3 && (
                          <RadioGroup 
                            value={consultationType} 
                            onValueChange={setConsultationType}
                            className="space-y-3 py-4"
                          >
                            {consultationTypes.map((type) => (
                              <div 
                                key={type.id}
                                className={`
                                  flex items-start p-4 rounded-md border cursor-pointer
                                  hover:border-primary transition-colors
                                  ${consultationType === type.id ? 'bg-primary/10 border-primary' : 'border-input'}
                                `}
                              >
                                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                                <div className="ml-3">
                                  <Label htmlFor={type.id} className="font-medium text-base">{type.title}</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                        
                        {/* Step 4: Contact Information */}
                        {currentStep === 4 && (
                          <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input 
                                  id="name" 
                                  name="name" 
                                  value={formData.name} 
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input 
                                  id="email" 
                                  name="email" 
                                  type="email" 
                                  value={formData.email} 
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input 
                                  id="company" 
                                  name="company" 
                                  value={formData.company} 
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input 
                                  id="phone" 
                                  name="phone" 
                                  value={formData.phone} 
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="notes">What would you like to discuss?</Label>
                              <Textarea 
                                id="notes" 
                                name="notes" 
                                value={formData.notes} 
                                onChange={handleInputChange}
                                placeholder="Tell us about your business and marketing challenges..."
                                className="min-h-[100px]"
                              />
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full py-6"
                              >
                                {isSubmitting ? "Booking Your Call..." : "Book My Consultation Call"}
                              </Button>
                            </div>
                          </form>
                        )}
                      </div>
                      
                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-6">
                        {currentStep > 1 && (
                          <Button variant="outline" onClick={prevStep}>
                            Back
                          </Button>
                        )}
                        {currentStep < 4 && (
                          <Button onClick={nextStep} className="ml-auto">
                            Continue
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-medium mb-2">Booking Confirmed!</h3>
                      <p className="text-center text-muted-foreground mb-4">
                        Your consultation is scheduled for{' '}
                        <span className="font-medium">{format(selectedDate!, 'PPPP')}</span> at{' '}
                        <span className="font-medium">{selectedTime}</span>.
                      </p>
                      <p className="text-sm text-center">
                        Check your email for confirmation and calendar invitation.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span>No payment required • 30-minute strategy session</span>
              </div>
            </div>
            
            {/* Dynamic chart showing business growth */}
            <div className="relative h-64 border border-border rounded-lg p-4 mb-6 overflow-hidden">
              <div className="absolute top-3 left-3 text-sm font-medium">Business Growth Potential</div>
              <div className="absolute bottom-4 right-4 text-xs opacity-70">* Based on client averages</div>
              
              {/* Simple chart using CSS */}
              <div className="relative h-full w-full pt-10">
                <div className="h-full w-full flex items-end">
                  {[15, 25, 40, 30, 45, 60, 75].map((height, i) => (
                    <div key={i} className="flex-1 mx-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary/80 rounded-t-sm" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs mt-1">{i + 1}m</div>
                    </div>
                  ))}
                </div>
                
                {/* Growth line */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path 
                      d="M 0,200 L 50,170 L 100,150 L 150,120 L 200,130 L 250,100 L 300,80 L 350,40 L 400,10"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Testimonials and impacts */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Client Success Stories
              </h3>
              
              {/* Testimonial slider */}
              <div className="relative min-h-[180px] flex items-center">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                      index === testimonialIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <blockquote className="text-muted-foreground italic mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination dots */}
              <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      index === testimonialIndex ? 'bg-primary' : 'bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Key benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Strategy</h3>
                <p className="text-sm text-muted-foreground">Custom growth plans based on your industry, target audience and business goals</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">ROI-Focused Approach</h3>
                <p className="text-sm text-muted-foreground">Campaigns designed to maximize returns and deliver measurable business growth</p>
              </div>
              
              <div className="md:col-span-2 bg-card rounded-lg border border-border p-5">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="text-primary mr-2">→</span> After Your Booking
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Receive immediate confirmation and calendar invite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Get access to our exclusive "Business Growth Playbook" PDF</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Optional pre-call questionnaire to maximize consultation value</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom ticker */}
      <div className="w-full overflow-hidden border-t border-primary/30 mt-12">
        <div className="py-3 bg-primary/5">
          <div className="flex items-center whitespace-nowrap animate-marquee-slow">
            {Array(10).fill("Schedule a FREE 30-minute consultation today!").map((text, index) => (
              <div key={index} className="mx-12 text-base font-medium flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                {text}
                <ArrowRight className="h-4 w-4 ml-2 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCallSection;