import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import profileImg from "@assets/prof_photo.jpeg";
import profPhotoAnimated from "@assets/profphotoanimated.png";

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
      style={{
        position: 'relative',
        fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #142850 0%, #27496D 50%, #0C7B93 100%)',
        boxShadow: 'inset 0 0 100px rgba(13, 27, 42, 0.5)',
      }}
    >
      {/* Animated gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 75%), linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.03) 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
          animation: 'gradient-move 5.5s linear infinite',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <style>
        {`
          @keyframes gradient-move {
            0% {
              background-position: 0 0, 30px 30px;
            }
            100% {
              background-position: 60px 60px, 90px 90px;
            }
          }
        `}
      </style>
      {/* Main content (ensure zIndex: 1 or higher) */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-autumn shadow-lg transition-transform duration-500 hover:scale-105">
                  <img 
                    src={profPhotoAnimated} 
                    alt="Aryan Saxena Animated" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
              <div className="w-full md:w-2/3">                  <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 font-['Press_Start_2P'] text-white">
                    Hi, I'm <span className="text-[#FFB71F] drop-shadow-[0_2px_2px_rgba(255,183,31,0.3)]">Aryan Saxena</span>
                  </h2>
                  <h3 className="text-xl sm:text-2xl font-light mb-6 text-[#89CFF0] drop-shadow-[0_2px_2px_rgba(137,207,240,0.3)]">
                    Data-driven collaborator, crafting innovative solutions to drive business impact!
                  </h3>
                  <p className="text-lg text-[#95A5A6] mb-8 leading-relaxed">
                  I'm a graduate student at Purdue University, studying MS in Business Analytics and 
                  Information Management with experience in consulting, analytics, and data science.
                </p>
                <div className="flex space-x-4">
                  <Button 
                    size="lg" 
                    className="font-['Press_Start_2P'] text-sm bg-[#FFB71F] hover:bg-[#FFB71F]/80 text-[#0D1B2A] transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#0D1B2A] shadow-[4px_4px_0px_#0D1B2A]"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View My Work
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="font-['Press_Start_2P'] text-sm border-2 border-[#89CFF0] text-[#89CFF0] hover:bg-[#89CFF0]/10 transition-all duration-300 transform hover:-translate-y-1 shadow-[4px_4px_0px_rgba(137,207,240,0.3)]"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-10 border-t border-[#89CFF0]/30 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
              <div className="transform transition-transform duration-300 hover:scale-110">
                <h4 className="font-['Press_Start_2P'] text-[#FFB71F] text-xl mb-2">10+</h4>
                <p className="text-[#89CFF0] font-medium">Projects Completed</p>
              </div>
              <div className="transform transition-transform duration-300 hover:scale-110">
                <h4 className="font-['Press_Start_2P'] text-[#FFB71F] text-xl mb-2">1+</h4>
                <p className="text-[#89CFF0] font-medium">Years Experience</p>
              </div>
              <div className="transform transition-transform duration-300 hover:scale-110">
                <h4 className="font-['Press_Start_2P'] text-[#FFB71F] text-xl mb-2">2</h4>
                <p className="text-[#89CFF0] font-medium">Scholarships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
