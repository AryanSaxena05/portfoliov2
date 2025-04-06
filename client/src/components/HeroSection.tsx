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
                Hi, I'm <span className="text-primary">John Doe</span>
              </h2>
              <h3 className="text-xl sm:text-2xl text-gray-600 font-light mb-6">
                Full-Stack Developer & UI/UX Enthusiast
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                I create elegant solutions to complex problems through clean, 
                efficient code and thoughtful user experiences.
              </p>
              <div className="flex space-x-4">
                <Link href="#projects">
                  <Button size="lg">View My Work</Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="lg">Contact Me</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-5/12 hidden md:block">
              <div className="relative w-full h-80">
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="80" fill="#2563eb" />
                  <path
                    fill="#ffffff"
                    d="M100,30 C130,30 155,55 155,85 C155,115 130,140 100,140 C70,140 45,115 45,85 C45,55 70,30 100,30 Z"
                  />
                  <circle cx="75" cy="75" r="5" fill="#1e293b" />
                  <circle cx="125" cy="75" r="5" fill="#1e293b" />
                  <path
                    fill="#1e293b"
                    d="M70,105 C80,115 120,115 130,105"
                    stroke="#1e293b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-10 border-t border-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-lg">10+</h4>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">5+</h4>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">15+</h4>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">3</h4>
              <p className="text-gray-600">Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
