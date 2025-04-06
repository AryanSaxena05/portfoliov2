import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Check which section is currently visible
      const sections = ['home', 'projects', 'experience', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full bg-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-sm bg-opacity-95" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              <h1 className="text-xl font-bold cursor-pointer bg-gradient-to-r from-autumn to-amber-600 text-transparent bg-clip-text transition-all duration-300 transform hover:scale-105">Aryan Saxena</h1>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                  }}
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 cursor-pointer ${
                    activeSection === "home" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 cursor-pointer ${
                    activeSection === "projects" ? "text-autumn font-medium" : ""
                  }`}
                >
                  My Work
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('experience');
                  }}
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 cursor-pointer ${
                    activeSection === "experience" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Professional Experience
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }}
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 cursor-pointer ${
                    activeSection === "about" ? "text-autumn font-medium" : ""
                  }`}
                >
                  About Me
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 cursor-pointer ${
                    activeSection === "contact" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Get In Touch
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <button 
              className="text-gray-700 focus:outline-none ml-2" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white pb-4 px-4 border-t ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-3">
          <li>
            <a 
              href="#home"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === "home" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
                closeMobileMenu();
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#projects"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === "projects" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
                closeMobileMenu();
              }}
            >
              My Work
            </a>
          </li>
          <li>
            <a 
              href="#experience"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === "experience" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('experience');
                closeMobileMenu();
              }}
            >
              Professional Experience
            </a>
          </li>
          <li>
            <a 
              href="#about"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === "about" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
                closeMobileMenu();
              }}
            >
              About Me
            </a>
          </li>
          <li>
            <a 
              href="#contact"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                activeSection === "contact" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
                closeMobileMenu();
              }}
            >
              Get In Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
