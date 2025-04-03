import React, { useState } from 'react';
import { useTheme } from '../lib/themeUtils';
import { 
  Calendar, 
  Clock, 
  Phone, 
  ChevronRight, 
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Calendar component styles
import '@/components/ui/calendar.css';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

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

const BookCallSection: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields to proceed.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      notes: formData.notes,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      consultationType,
    };
  
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to book call");
      }
  
      setIsSubmitting(false);
      setIsSubmitted(true);
  
      toast({
        title: "Consultation Booked!",
        description: `Your ${getConsultationTitle()} is scheduled for ${format(
          selectedDate,
          "PPPP"
        )} at ${selectedTime}.`,
      });
  
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
          notes: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
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
    <section id="book-call" className="py-16 md:py-20 overflow-hidden relative bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Schedule a Meeting with an <span className="text-primary">Advertising Expert</span>
          </h2>
          
          <p className="text-lg mx-auto max-w-2xl mb-10 text-muted-foreground">
            Book a one-on-one consultation with our advertising consultants and get personalized 
            strategies to elevate your brand.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="py-6 px-8 text-lg">
                <span className="flex items-center">
                  Book a Free Consultation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </span>
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
          
          <div className="flex items-center mt-4 text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
            </div>
            <span className="text-sm">No payment required • 30-minute strategy session</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-muted-foreground">Choose a time that works best for you. We offer both daytime and evening slots.</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Consultation</h3>
            <p className="text-muted-foreground">Speak directly with our senior advertising strategists with years of industry experience.</p>
          </div>
          
          <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Strategy</h3>
            <p className="text-muted-foreground">Get a personalized growth plan tailored specifically to your business needs and goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCallSection;