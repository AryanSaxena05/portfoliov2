import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Linkedin, Github } from "lucide-react";

type Skill = {
  name: string;
  percentage: number;
};

const skills: Skill[] = [
  { name: "Frontend Development", percentage: 95 },
  { name: "Backend Development", percentage: 85 },
  { name: "UI/UX Design", percentage: 80 },
  { name: "Database Management", percentage: 90 }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          
          // Animate the skill bars
          const skillBars = document.querySelectorAll('.skill-bar-fill');
          skillBars.forEach((bar) => {
            const percentageAttr = bar.getAttribute('data-percentage');
            if (percentageAttr) {
              const percentage = parseInt(percentageAttr);
              (bar as HTMLElement).style.width = `${percentage}%`;
            }
          });
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
      id="about" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-primary/10">
                <svg
                  viewBox="0 0 500 300"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="500" height="300" fill="#EBF5FF" />
                  <path
                    d="M0,100 Q125,50 250,100 T500,100 V300 H0 Z"
                    fill="#2563eb"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M0,150 Q125,100 250,150 T500,150 V300 H0 Z"
                    fill="#2563eb"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M0,200 Q125,150 250,200 T500,200 V300 H0 Z"
                    fill="#2563eb"
                    fillOpacity="0.4"
                  />
                  <circle cx="250" cy="120" r="50" fill="#2563eb" fillOpacity="0.6" />
                  <circle cx="250" cy="100" r="30" fill="#ffffff" />
                  <rect x="220" y="170" width="60" height="80" rx="10" fill="#ffffff" />
                </svg>
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm a full-stack developer with 5+ years of experience building web applications that deliver exceptional user experiences. My journey in technology began with a degree in Computer Science, and I've been expanding my skills ever since.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks like React and Vue.js, paired with robust backend technologies. My approach combines technical excellence with an eye for design and usability.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-gray-500">{skill.percentage}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="skill-bar-fill bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: "0%" }}
                          data-percentage={skill.percentage}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="link" className="text-primary hover:text-primary/80 transition font-medium">
                  <FileText className="mr-2 h-4 w-4" /> Download Resume
                </Button>
                <Button variant="link" className="text-primary hover:text-primary/80 transition font-medium">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile
                </Button>
                <Button variant="link" className="text-primary hover:text-primary/80 transition font-medium">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
