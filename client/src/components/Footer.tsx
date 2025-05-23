import { Linkedin, Github, Instagram } from "lucide-react";
import { SiKaggle } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[color:var(--charcoal)] to-[color:var(--jet)] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">Aryan Saxena</h2>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/aryan-saxena-7726b1218/" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/AryanSaxena05" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.kaggle.com/aryansaxena2002" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <SiKaggle className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/_notaryansaxena_/" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">© {new Date().getFullYear()} Aryan Saxena. All rights reserved.</p>
            
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
