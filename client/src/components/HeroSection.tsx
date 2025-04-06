import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-7/12">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Hi, I'm <span className="text-autumn">Aryan Saxena</span>
              </h2>
              <h3 className="text-xl sm:text-2xl text-steel font-light mb-6">
                Data Analyst & Business Analytics Professional
              </h3>
              <p className="text-lg text-steel mb-8 leading-relaxed">
                I'm a graduate student at Purdue University, studying MS in Business Analytics and 
                Information Management with experience in consulting, analytics, and data science.
              </p>
              <div className="flex space-x-4">
                <Link href="#projects">
                  <Button size="lg" className="bg-autumn hover:bg-autumn/90 text-white">View My Work</Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="lg" className="border-autumn text-autumn hover:text-autumn/90">Contact Me</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-5/12 hidden md:block">
              <div className="relative w-full h-80">
                <img 
                  src="/prof_photo.jpeg" 
                  alt="Aryan Saxena" 
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-10 border-t border-sky grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-lg text-charcoal">3+</h4>
              <p className="text-steel">Projects Completed</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-charcoal">1+</h4>
              <p className="text-steel">Years Experience</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-charcoal">35%</h4>
              <p className="text-steel">Cost Optimization</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-charcoal">2</h4>
              <p className="text-steel">Scholarships</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
