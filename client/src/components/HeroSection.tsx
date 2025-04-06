import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import profileImg from "@assets/prof_photo.jpeg";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="pt-28 pb-20 sm:pt-32 sm:pb-24 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:gap-12">
            <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-autumn shadow-lg transition-transform duration-500 hover:scale-105">
                <img 
                  src={profileImg} 
                  alt="Aryan Saxena" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Hi, I'm <span className="text-autumn">Aryan Saxena</span>
              </h2>
              <h3 className="text-xl sm:text-2xl font-light mb-6 bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                Data-driven collaborator, crafting innovative solutions to drive business impact!
              </h3>
              <p className="text-lg text-steel mb-8 leading-relaxed">
                I'm a graduate student at Purdue University, studying MS in Business Analytics and 
                Information Management with experience in consulting, analytics, and data science.
              </p>
              <div className="flex space-x-4">
                <Link href="#projects">
                  <Button size="lg" className="bg-gradient-to-r from-autumn to-amber-600 hover:from-autumn/90 hover:to-amber-500 text-white transition-all duration-300 transform hover:-translate-y-1">View My Work</Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="lg" className="border-autumn text-autumn hover:text-autumn/90 transition-all duration-300 transform hover:-translate-y-1">Contact Me</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-10 border-t border-sky grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            <div className="transform transition-transform duration-300 hover:scale-110">
              <h4 className="font-semibold text-lg text-charcoal">10+</h4>
              <p className="text-steel">Projects Completed</p>
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <h4 className="font-semibold text-lg text-charcoal">1+</h4>
              <p className="text-steel">Years Experience</p>
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <h4 className="font-semibold text-lg text-charcoal">2</h4>
              <p className="text-steel">Scholarships</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
