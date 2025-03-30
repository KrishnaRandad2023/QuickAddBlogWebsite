import { useEffect, useState } from "react";
import { useTheme } from "@/lib/themeUtils";
import { Moon, Sun, Menu } from "lucide-react";
import { Link } from "wouter";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-lg" : ""
      }`}
    >
      <div id="progress-bar" className="h-[3px] bg-gradient-to-r from-primary to-accent fixed top-0 left-0 z-[100]"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 z-10 relative">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <span className="font-montserrat font-bold text-white text-xl">QA</span>
          </div>
          <h1 className="font-montserrat font-bold text-lg md:text-xl hidden sm:block">
            <span className="text-primary">Quick</span>
            <span className="text-accent">Add</span>
          </h1>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-8">
          <nav className="hidden md:flex space-x-6">
            <a
              href="#services"
              className="font-medium relative hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="font-medium relative hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="font-medium relative hover:text-primary transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              className="font-medium relative hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-secondary/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-secondary shadow-lg py-4 px-6 transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col space-y-4">
          <a
            href="#services"
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#about"
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#testimonials"
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Work
          </a>
          <a
            href="#contact"
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
