import { useEffect, useState } from "react";
import { useTheme } from "@/lib/themeUtils";
import { Moon, Sun, Menu, Radio } from "lucide-react";
import { Link } from "wouter";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

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
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div id="progress-bar" className="h-[3px] bg-gradient-to-r from-primary to-primary/70 fixed top-0 left-0 z-[100]"></div>
      
      {/* Top banner - Newspaper style */}
      <div className="hidden md:block w-full bg-primary text-white py-1 border-b border-primary/30">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div>{currentDate}</div>
          <div className="flex items-center space-x-4">
            <span>Established 1981</span>
            <span>|</span>
            <span>Vol. 42 No. 12</span>
          </div>
        </div>
      </div>
      
      {/* Masthead */}
      <div className="container mx-auto px-4 md:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center mb-3 md:mb-0">
          <Link href="/" className="flex flex-col items-center md:items-start z-10 relative">
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary mb-0 md:mb-1">
              <span className="border-b-2 border-primary">QUICK</span>
              <span>ADD</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-serif">Advertising that stands the test of time</p>
          </Link>

          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <div className="radio-dial hidden md:flex">
              <Radio className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500">On Air Since</span>
              <span className="font-display font-bold text-primary">1981</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center py-2">
          <nav className="hidden md:flex space-x-1">
            {['Services', 'About', 'Work', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-serif uppercase text-sm tracking-wider px-3 py-1 border-r border-gray-200 hover:bg-gray-100 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 transition-colors rounded"
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
              className="md:hidden p-2 hover:bg-gray-100 transition-colors rounded"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg py-3 px-6 transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col divide-y divide-gray-100">
          {['Services', 'About', 'Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-serif uppercase text-sm tracking-wider py-3 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">{currentDate}</div>
          <div className="text-xs text-gray-500">Established 1981</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
