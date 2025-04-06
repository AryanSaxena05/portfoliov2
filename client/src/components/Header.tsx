import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full bg-white z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-sm bg-opacity-95" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-charcoal cursor-pointer">Aryan Saxena</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/#home"
                  className={`relative nav-link text-steel hover:text-autumn transition-colors ${
                    location === "/#home" ? "text-autumn" : ""
                  }`}
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#projects"
                  className={`relative nav-link text-steel hover:text-autumn transition-colors ${
                    location === "/#projects" ? "text-autumn" : ""
                  }`}
                >
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#experience"
                  className={`relative nav-link text-steel hover:text-autumn transition-colors ${
                    location === "/#experience" ? "text-autumn" : ""
                  }`}
                >
                  Experience
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about"
                  className={`relative nav-link text-steel hover:text-autumn transition-colors ${
                    location === "/#about" ? "text-autumn" : ""
                  }`}
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className={`relative nav-link text-steel hover:text-autumn transition-colors ${
                    location === "/#contact" ? "text-autumn" : ""
                  }`}
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 focus:outline-none" 
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
            <Link 
              href="/#home"
              className="block py-2 text-steel hover:text-autumn transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/#projects"
              className="block py-2 text-steel hover:text-autumn transition-colors"
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="/#experience"
              className="block py-2 text-steel hover:text-autumn transition-colors"
              onClick={closeMobileMenu}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link 
              href="/#about"
              className="block py-2 text-steel hover:text-autumn transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/#contact"
              className="block py-2 text-steel hover:text-autumn transition-colors"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
