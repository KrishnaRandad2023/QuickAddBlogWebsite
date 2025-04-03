import { useEffect, useState } from "react";
import { useTheme } from "@/lib/themeUtils";
import { Moon, Sun, Menu, Radio, Search } from "lucide-react";
import { Link } from "wouter";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
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
        isScrolled 
          ? "bg-zinc-900 dark:bg-zinc-900 light:bg-white shadow-md" 
          : "bg-zinc-900 dark:bg-zinc-900 light:bg-white"
      }`}
    >
      {/* Progress bar */}
      <div id="progress-bar" className="h-[3px] bg-indigo-600 fixed top-0 left-0 z-[100]"></div>
      
      {/* Top banner */}
      <div className="hidden md:block w-full bg-indigo-800 dark:bg-indigo-800 light:bg-indigo-700 text-white py-1 border-b border-indigo-700 dark:border-indigo-700 light:border-indigo-600">
        <div className="container mx-auto flex justify-between items-center text-xs px-4">
          <div>{currentDate}</div>
          <div className="flex items-center space-x-4">
            <span>Established 1981</span>
            <span>|</span>
            <span className="text-indigo-200 dark:text-indigo-200 light:text-indigo-100">Premium Advertising</span>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 md:px-6 py-4 border-b border-zinc-800 dark:border-zinc-800 light:border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center mb-3 md:mb-0">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center md:items-start z-10 relative">
            <h1 className="font-bold text-3xl md:text-4xl tracking-tight text-white dark:text-white light:text-gray-800 mb-0 md:mb-1 flex items-center">
              <span className="text-indigo-500 mr-1">QUICK</span>
              <span className="text-white dark:text-white light:text-gray-800">ADD</span>
              <span className="ml-2 text-xs bg-indigo-600 dark:bg-indigo-600 light:bg-indigo-500 px-2 py-1 rounded uppercase text-white">Agency</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 light:text-gray-600">Elevating brands through innovative advertising</p>
          </Link>

          {/* Search */}
          <div className="flex items-center mt-3 md:mt-0 bg-zinc-800 dark:bg-zinc-800 light:bg-gray-100 rounded-full px-4 py-2 w-full md:w-auto max-w-xs">
            <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-400 light:text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="bg-transparent text-sm border-none focus:outline-none text-white dark:text-white light:text-gray-800 w-full"
            />
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center py-3">
          <nav className="hidden md:flex">
            {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm tracking-wide px-4 py-2 text-zinc-300 dark:text-zinc-300 light:text-gray-700 
                hover:text-white dark:hover:text-white light:hover:text-gray-900 
                hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-100 
                rounded-md transition-colors ${
                  index === 0 ? 'bg-zinc-800 dark:bg-zinc-800 light:bg-gray-100 text-white dark:text-white light:text-gray-900' : ''
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="#book-call"
              className="text-sm tracking-wide px-4 py-2 ml-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Book a Call
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 light:bg-gray-200 light:hover:bg-gray-300 transition-colors rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-500" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 light:bg-gray-200 light:hover:bg-gray-300 transition-colors rounded-full"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5 text-white dark:text-white light:text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-zinc-900 dark:bg-zinc-900 light:bg-white border-t border-zinc-800 dark:border-zinc-800 light:border-gray-200 shadow-lg py-3 px-6 transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col space-y-1">
          {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-zinc-300 dark:text-zinc-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-gray-900 text-sm py-3 px-3 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#book-call"
            className="text-white dark:text-white light:text-white text-sm py-3 px-3 bg-primary hover:bg-primary/90 rounded-md transition-colors mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Call
          </a>
        </nav>
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-zinc-800 dark:border-zinc-800 light:border-gray-200 text-zinc-400 dark:text-zinc-400 light:text-gray-500">
          <div className="text-xs">{currentDate}</div>
          <div className="text-xs">© 2025 QuickAdd</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
