import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Link as LinkIcon, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with product management, user authentication, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/ecommerce.svg", // This is handled by the SVG below
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team workflows.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    imageUrl: "/taskmanager.svg", // This is handled by the SVG below
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather application with location-based forecasts and historical data visualization.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
    imageUrl: "/weather.svg", // This is handled by the SVG below
    demoUrl: "#",
    githubUrl: "#"
  }
];

// Component to render a placeholder SVG for each project
const ProjectSVG = ({ id }: { id: number }) => {
  // Different patterns for different projects
  const patterns = [
    { bg: "#EBF5FF", fg: "#2563EB" }, // Blue
    { bg: "#F0FDF4", fg: "#16A34A" }, // Green
    { bg: "#FEF2F2", fg: "#DC2626" }  // Red
  ];
  
  const { bg, fg } = patterns[(id - 1) % patterns.length];
  
  return (
    <svg className="w-full h-48" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill={bg} />
      <circle cx="200" cy="100" r="50" fill={fg} fillOpacity="0.2" />
      <rect x="50" y="50" width="300" height="30" rx="5" fill={fg} fillOpacity="0.3" />
      <rect x="50" y="100" width="300" height="10" rx="5" fill={fg} fillOpacity="0.5" />
      <rect x="50" y="120" width="200" height="10" rx="5" fill={fg} fillOpacity="0.5" />
      <rect x="50" y="140" width="250" height="10" rx="5" fill={fg} fillOpacity="0.5" />
    </svg>
  );
};

export default function ProjectsSection() {
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
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-100 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Projects</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Here's a selection of my recent work. Each project showcases different skills and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform"
            >
              <div className="w-full">
                <ProjectSVG id={project.id} />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, index) => {
                    // Different colors for different tech types
                    const colors = {
                      React: "bg-blue-100 text-blue-800",
                      "Node.js": "bg-green-100 text-green-800",
                      MongoDB: "bg-purple-100 text-purple-800",
                      Stripe: "bg-yellow-100 text-yellow-800",
                      "Vue.js": "bg-emerald-100 text-emerald-800",
                      Firebase: "bg-orange-100 text-orange-800",
                      "Tailwind CSS": "bg-cyan-100 text-cyan-800",
                      JavaScript: "bg-yellow-100 text-yellow-800",
                      "OpenWeather API": "bg-sky-100 text-sky-800",
                      "Chart.js": "bg-rose-100 text-rose-800",
                    };
                    
                    const colorClass = colors[tech as keyof typeof colors] || "bg-gray-100 text-gray-800";
                    
                    return (
                      <span 
                        key={index} 
                        className={`px-2 py-1 ${colorClass} text-xs rounded-full`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center">
                  <a href={project.demoUrl} className="text-primary hover:text-primary/80 transition font-medium flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" /> View Details
                  </a>
                  <a href={project.githubUrl} className="text-gray-600 hover:text-gray-900 transition">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="link" className="group">
            View All Projects
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
