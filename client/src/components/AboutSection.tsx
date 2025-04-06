import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, Linkedin, Github, LineChart, Database, PanelRight, Layers, 
  BarChart3, FileSpreadsheet, Cloud, Monitor, Server, Activity,
  Mail as MailIcon, BookOpen as BookOpenIcon
} from "lucide-react";
import { 
  SiPython, SiR, SiTableau, SiMysql, SiPostgresql, SiGooglecloud, 
  SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, SiGit, 
  SiJupyter, SiApachespark, SiApachehadoop, SiDocker, 
  SiAmazon 
} from "react-icons/si";

type Skill = {
  name: string;
  category: 'language' | 'tool' | 'platform' | 'database' | 'framework' | 'cloud';
  size: 'sm' | 'md' | 'lg' | 'xl'; // Different sizes for the word cloud
  icon: React.ReactNode;
};

// Expanded list of skills with their categories, sizes, and icons
const skills: Skill[] = [
  // Languages
  { name: "Python", category: 'language', size: 'xl', icon: <SiPython /> },
  { name: "R", category: 'language', size: 'lg', icon: <SiR /> },
  { name: "SQL", category: 'language', size: 'xl', icon: <Database /> },
  
  // Tools & Software
  { name: "Tableau", category: 'tool', size: 'xl', icon: <SiTableau /> },
  { name: "Power BI", category: 'tool', size: 'lg', icon: <Monitor /> },
  { name: "Excel", category: 'tool', size: 'lg', icon: <FileSpreadsheet /> },
  { name: "Git", category: 'tool', size: 'md', icon: <SiGit /> },
  { name: "Jupyter", category: 'tool', size: 'md', icon: <SiJupyter /> },
  { name: "SAS EM", category: 'tool', size: 'lg', icon: <Activity /> },
  
  // Databases
  { name: "MySQL", category: 'database', size: 'lg', icon: <SiMysql /> },
  { name: "PostgreSQL", category: 'database', size: 'md', icon: <SiPostgresql /> },
  
  // Frameworks & Libraries
  { name: "TensorFlow", category: 'framework', size: 'lg', icon: <SiTensorflow /> },
  { name: "Scikit-learn", category: 'framework', size: 'lg', icon: <SiScikitlearn /> },
  { name: "Pandas", category: 'framework', size: 'md', icon: <SiPandas /> },
  { name: "NumPy", category: 'framework', size: 'md', icon: <SiNumpy /> },
  
  // Cloud Platforms
  { name: "AWS", category: 'cloud', size: 'lg', icon: <SiAmazon /> },
  { name: "Azure", category: 'cloud', size: 'md', icon: <Server /> },
  { name: "GCP", category: 'cloud', size: 'sm', icon: <SiGooglecloud /> },
  
  // Big Data
  { name: "Spark", category: 'platform', size: 'md', icon: <SiApachespark /> },
  { name: "Hadoop", category: 'platform', size: 'sm', icon: <SiApachehadoop /> },
  
  // Analytics & Business Skills (extracted from project descriptions)
  { name: "Data Analysis", category: 'framework', size: 'xl', icon: <LineChart /> },
  { name: "Business Analytics", category: 'framework', size: 'xl', icon: <BarChart3 /> },
  { name: "Machine Learning", category: 'framework', size: 'xl', icon: <Layers /> },
  { name: "Data Visualization", category: 'framework', size: 'lg', icon: <PanelRight /> },
  { name: "Statistical Analysis", category: 'framework', size: 'lg', icon: <Activity /> },
  { name: "Exploratory Data Analysis", category: 'framework', size: 'lg', icon: <PanelRight /> },
  { name: "Predictive Modeling", category: 'framework', size: 'lg', icon: <LineChart /> },
  { name: "Data Mining", category: 'framework', size: 'lg', icon: <Database /> },
  { name: "K-means Clustering", category: 'framework', size: 'md', icon: <Layers /> },
  { name: "Regression Analysis", category: 'framework', size: 'md', icon: <LineChart /> },
  
  // Domain Knowledge
  { name: "Education Analytics", category: 'platform', size: 'md', icon: <BookOpenIcon /> },
  { name: "Entertainment Analytics", category: 'platform', size: 'md', icon: <Monitor /> },
  { name: "Market Analysis", category: 'platform', size: 'md', icon: <BarChart3 /> },
  
  // Project Skills
  { name: "Project Planning", category: 'platform', size: 'md', icon: <FileText /> },
  { name: "Strategic Communications", category: 'platform', size: 'md', icon: <MailIcon /> },
  { name: "Project Management", category: 'platform', size: 'lg', icon: <Layers /> },
  { name: "Strategy Consulting", category: 'platform', size: 'lg', icon: <FileText /> },
  { name: "Value Chain Optimization", category: 'platform', size: 'md', icon: <Activity /> },
  { name: "Cost Reduction", category: 'platform', size: 'md', icon: <Activity /> },
  
  // Technical Skills
  { name: "Docker", category: 'tool', size: 'sm', icon: <SiDocker /> },
  { name: "API Integration", category: 'framework', size: 'md', icon: <Server /> },
  { name: "Microsoft Office", category: 'platform', size: 'md', icon: <FileText /> },
  { name: "Cloud Computing", category: 'cloud', size: 'lg', icon: <Cloud /> },
  { name: "Data Processing", category: 'framework', size: 'md', icon: <Database /> }
];

export default function AboutSection() {
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
      id="about" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="w-full mt-8 lg:mt-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm Aryan Saxena — a data-driven problem solver with a strong foundation in business analytics, consulting, and technology. I thrive at the intersection of logic and creativity, turning data into actionable insights that drive strategic decisions.
                </p>
                <p>
                  Currently pursuing my MS in Business Analytics from Purdue University, I've led cross-functional teams in fast-paced consulting projects, built scalable analytics pipelines, and presented at national conferences. My experience spans everything from AI-powered customer tools to predictive modeling systems, including a published research paper in educational data mining.
                </p>
                <p>
                  Outside of analytics, I'm equally passionate about music. I've been recognized with multiple Awards of Excellence in music during my undergrad and have been a top scorer three times at Trinity College London. Whether I'm fine-tuning a model or a melody, I bring the same intensity: clarity, discipline, and a desire to create lasting impact.
                </p>
                <p>
                  Let's connect — whether you're into analytics, strategy, or just good music.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-6 text-charcoal">My Skills</h3>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
                  {/* Word cloud with random positioning */}
                  {skills.map((skill, index) => {
                    // Define sizes based on skill.size
                    const sizes = {
                      'sm': 'text-xs md:text-sm',
                      'md': 'text-sm md:text-base',
                      'lg': 'text-base md:text-lg',
                      'xl': 'text-lg md:text-xl'
                    };
                    
                    // Define colors based on skill.category
                    const colors = {
                      'language': 'bg-blue-100 text-blue-700 border-blue-200',
                      'tool': 'bg-green-100 text-green-700 border-green-200',
                      'platform': 'bg-yellow-100 text-yellow-700 border-yellow-200',
                      'database': 'bg-purple-100 text-purple-700 border-purple-200',
                      'framework': 'bg-red-100 text-red-700 border-red-200',
                      'cloud': 'bg-cyan-100 text-cyan-700 border-cyan-200'
                    };
                    
                    // Apply the appropriate size and color classes
                    const sizeClass = sizes[skill.size];
                    const colorClass = colors[skill.category];
                    
                    // Random rotation between -6 and 6 degrees
                    const rotation = Math.floor(Math.random() * 13) - 6;
                    
                    return (
                      <div 
                        key={index}
                        className={`
                          ${sizeClass} ${colorClass}
                          px-3 py-2 rounded-full border 
                          flex items-center gap-1.5
                          hover:scale-110 transition-transform
                          shadow-sm
                        `}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Legend for categories */}
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-steel">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200"></div>
                    <span>Languages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
                    <span>Tools</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-200"></div>
                    <span>Platforms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-100 border border-purple-200"></div>
                    <span>Databases</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
                    <span>Frameworks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-cyan-100 border border-cyan-200"></div>
                    <span>Cloud</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="link" className="text-autumn hover:text-autumn/80 transition-all duration-300 font-medium transform hover:scale-105" asChild>
                  <a href="/resume/Aryan_Saxena_5_4_BA_NAW.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Button>
                <Button variant="link" className="text-autumn hover:text-autumn/80 transition-all duration-300 font-medium transform hover:scale-105" asChild>
                  <a href="https://www.linkedin.com/in/aryan-saxena-7726b1218/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile
                  </a>
                </Button>
                <Button variant="link" className="text-autumn hover:text-autumn/80 transition-all duration-300 font-medium transform hover:scale-105" asChild>
                  <a href="https://github.com/AryanSaxena05" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
