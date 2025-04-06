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
              <h1 className="text-xl font-bold cursor-pointer bg-gradient-to-r from-autumn to-amber-600 text-transparent bg-clip-text transition-all duration-300 transform hover:scale-105">Aryan Saxena</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/#home"
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 ${
                    location === "/#home" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#projects"
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 ${
                    location === "/#projects" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#experience"
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 ${
                    location === "/#experience" ? "text-autumn font-medium" : ""
                  }`}
                >
                  Experience
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about"
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 ${
                    location === "/#about" ? "text-autumn font-medium" : ""
                  }`}
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-autumn transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className={`relative nav-link group text-steel hover:text-autumn transition-all duration-300 ${
                    location === "/#contact" ? "text-autumn font-medium" : ""
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
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                location === "/#home" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/#projects"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                location === "/#projects" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="/#experience"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                location === "/#experience" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link 
              href="/#about"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                location === "/#about" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/#contact"
              className={`block py-2 px-3 rounded-md text-steel hover:text-autumn hover:bg-autumn/10 transition-all duration-300 transform hover:translate-x-1 ${
                location === "/#contact" ? "font-medium text-autumn bg-autumn/5" : ""
              }`}
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
