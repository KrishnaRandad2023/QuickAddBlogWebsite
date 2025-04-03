import { Link } from "wouter";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                <span className="font-montserrat font-bold text-white text-xl">QA</span>
              </div>
              <h4 className="font-montserrat font-bold text-lg">
                <span className="text-primary">Quick</span>
                <span className="text-accent">Add</span>
              </h4>
            </Link>
            <p className="opacity-80 mb-6 text-balance">
              Elevating brands with innovative advertising solutions since 1981.
              Your success is our business.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-montserrat font-semibold text-lg mb-6">Services</h5>
            <ul className="space-y-3">
              <li>
                <a  className="hover:text-primary transition-colors">
                  Print Media Branding
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Television Advertising
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Digital Branding
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Radio Advertising
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Outdoor Advertising
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Corporate Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-montserrat font-semibold text-lg mb-6">Our Team</h5>
            <ul className="space-y-3">
              <li>
                <a  className="hover:text-primary transition-colors">
                  Vijaykumar Randad
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Shivam Randad
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors">
                  Shubhnagi Randad
                </a>
              </li>
              <li>
                <a  className="hover:text-primary transition-colors">
                  Krishna Randad
                </a>
              </li>
              
              
            </ul>
          </div>

          <div>
            <h5 className="font-montserrat font-semibold text-lg mb-6">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span>Akola, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary" />
                <span>quickadd2020@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary" />
                <span>+91 9823072929</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Quick Add Advertising Agency. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
