import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Github, Link as LinkIcon, ChevronRight, ExternalLink, Youtube, BarChart3, BookOpen, Briefcase, Database, Code } from "lucide-react";
import ParallaxGradientBackground from "./ParallaxGradientBackground";

// Import project images
import airbnbImage from "@assets/Airbnb Market Segmentation.png";
import bankruptcyImage from "@assets/Bankruptcy Prediction Modeling.png";
import britishAirwaysImage from "@assets/British Airways YouTube Analytics.png";
import housePricesImage from "@assets/House Prices Analysis.png";
import netflixImage from "@assets/Investigating Netflix Movies.png";
import marketingDashboardImage from "@assets/Marketing Dashboard.png";
import nycPublicSchoolsImage from "@assets/NYC Public Schools Analysis.png";
import studentPerformanceImage from "@assets/Student Performance Analysis System.png";
import unionPacificImage from "@assets/Union Pacific – Tech Transformation.png";
import jetjinxImage from "@assets/jetjinx.png";
import researchPaperImage from "@assets/research paper .png";

// Google Drive portfolio folder URL
const portfolioUrl = "https://drive.google.com/drive/folders/1oo7CMqRGDqOLcvm6M52kU921UT9chnza?usp=sharing";

// Define the different types of projects
type AcademicProject = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
};

type TableauDashboard = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  dashboardUrl: string;
};

type VideoProject = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
};

type ResearchPaper = {
  id: number;
  title: string;
  journal: string;
  abstract: string;
  publicationDate: string;
  link: string;
  imageUrl?: string; // Add this line
};

type KaggleProject = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  kaggleUrl: string;
};

type GitHubProject = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
};

// Sample data - Academic Projects
const academicProjects: AcademicProject[] = [
  {
    id: 100,
    title: "Boiler Jet Jinx",
    description: `A Flask-based web application for flight delay prediction and optimization.\n\nFeatures:\n- Flight delay prediction using machine learning\n- Interactive data visualizations\n- Optimization recommendations\n- Modern, responsive UI`,
    technologies: ["Flask", "Machine Learning", "Data Visualization", "Optimization", "Responsive UI"],
    imageUrl: jetjinxImage,
    demoUrl: "https://github.com/AryanSaxena05/JetJinx/tree/master?tab=readme-ov-file",
    githubUrl: "https://github.com/AryanSaxena05/JetJinx/tree/master?tab=readme-ov-file"
  },
  {
    id: 1,
    title: "NYC Public Schools Analysis",
    description: "This report analyzes the SAT performance of NYC schools, focusing on identifying schools with the best math results, listing the top 10 performing schools based on combined SAT scores, and determining which borough exhibits the largest standard deviation in combined SAT scores.",
    technologies: ["Data Analysis", "Education Analytics", "Statistical Analysis", "DataCamp Project"],
    imageUrl: nycPublicSchoolsImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Investigating Netflix Movies",
    description: "Analysis of Netflix movies released in the 1990s to uncover insights about this iconic decade in cinema. The project assists a production company specializing in nostalgic styles by examining trends and patterns in Netflix's extensive film library from this period.",
    technologies: ["Data Analysis", "Entertainment Analytics", "Trend Analysis", "DataCamp Project"],
    imageUrl: netflixImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Bankruptcy Prediction Modeling",
    description: "Conducted robust EDA using SAS Enterprise Miner to address skewed attributes, significant outliers, and collinearity. Built an ensemble modeling approach combining Gradient Boosting, Neural Networks, and LASSO regression, achieving a final accuracy of 94.15% on private leaderboard test data.",
    technologies: ["SAS Enterprise Miner", "Data Engineering", "Exploratory Data Analysis", "Analytical Skills"],
    imageUrl: bankruptcyImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Student Performance Analysis System",
    description: "Developed a system that uses data visualization and machine learning to analyze and improve student performance. The project empowers educators with actionable insights to personalize learning and improve academic outcomes, creating more effective education choices.",
    technologies: ["Data Visualization", "Machine Learning", "Education Analytics", "Personalized Learning"],
    imageUrl: studentPerformanceImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Union Pacific – Tech Transformation",
    description: "Developed a strategic roadmap to digitally transform Union Pacific's operations using IoT sensors, AI/ML integration, and digital twins. Enhanced the value chain through enriched data flow, better customer experience, and higher reliability while improving operational metrics.",
    technologies: ["Project Planning", "Cost Reduction Management", "Value Chain Optimization", "Strategic Communications"],
    imageUrl: unionPacificImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Airbnb Market Segmentation",
    description: "Enhanced Airbnb's host network optimization using advanced data analytics to segment hosts and generate predictive insights. Used K-means clustering to identify six distinct host segments and developed predictive models for revenue drivers and Superhost probability.",
    technologies: ["Regression Analysis", "Market Analysis", "Machine Learning", "K-means Clustering"],
    imageUrl: airbnbImage,
    demoUrl: portfolioUrl,
    githubUrl: "#"
  }
];;

// Sample data - Tableau Dashboards
const tableauDashboards: TableauDashboard[] = [
  {
    id: 1,
    title: "Marketing Dashboard",
    description: "Interactive marketing analytics dashboard providing insights into campaign performance, customer engagement, and ROI metrics for data-driven decision making.",
    imageUrl: marketingDashboardImage,
    dashboardUrl: "https://public.tableau.com/views/marketingdashboard_17218934198700/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  },
  {
    id: 2,
    title: "House Prices Analysis",
    description: "Comprehensive analysis of real estate market trends, property valuations, and price determinants across different regions and time periods.",
    imageUrl: housePricesImage,
    dashboardUrl: "https://public.tableau.com/views/HousePrices_17187827408920/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  },
  {
    id: 3,
    title: "British Airways YouTube Analytics",
    description: "In-depth analysis of British Airways' YouTube channel performance, including engagement metrics, viewer demographics, and content effectiveness.",
    imageUrl: britishAirwaysImage,
    dashboardUrl: "https://public.tableau.com/views/britishairwaysyoutube/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  }
];;

// Video Projects
const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "Data Analytics Project Showcase",
    description: "Demonstration of my analytical approach and project methodology in this comprehensive video showcasing the techniques and insights derived from my data science work.",
    videoUrl: "https://youtu.be/1BEwNre9-wo"
  }
];;

// Research Papers
const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "Comparative Analysis of Machine Learning Algorithms for Predictive Analytics",
    journal: "International Journal of Innovative Research in Technology",
    abstract: "This research paper provides a comprehensive comparative analysis of various machine learning algorithms for predictive analytics applications. The study evaluates performance metrics, computational efficiency, and practical implementation challenges across different business domains.",
    publicationDate: "May 2023",
    link: "https://ijirt.org/Article?manuscript=164572",
    imageUrl: researchPaperImage
  }
];

// Kaggle Projects
const kaggleProjects: KaggleProject[] = [
  // This is a placeholder to be filled in later
];

// GitHub Projects
const githubProjects: GitHubProject[] = [
  // This is a placeholder to be filled in later
];

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  kaggleUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  demoUrl?: string;
}

// Component to render a placeholder SVG for each project
const ProjectSVG = ({ id, type }: { id: number; type: string }) => {
  // Different patterns for different project types
  const typeColors = {
    academic: [
      { bg: "#EBF5FF", fg: "#2563EB" }, // Blue
      { bg: "#F0FDF4", fg: "#16A34A" }, // Green
      { bg: "#FEF2F2", fg: "#DC2626" }  // Red
    ],
    tableau: [
      { bg: "#F0F9FF", fg: "#0284C7" }, // Light Blue
    ],
    video: [
      { bg: "#FEF2F2", fg: "#DC2626" }, // Red (YouTube)
    ],
    research: [
      { bg: "#F5F3FF", fg: "#7C3AED" }, // Purple
    ],
    work: [
      { bg: "#FFF7ED", fg: "#EA580C" }, // Orange
      { bg: "#ECFDF5", fg: "#10B981" }, // Emerald
    ],
    kaggle: [
      { bg: "#F0FDF9", fg: "#0C9488" }, // Teal
    ],
    github: [
      { bg: "#F1F5F9", fg: "#475569" }, // Slate
    ]
  };
  
  const colors = typeColors[type as keyof typeof typeColors] || typeColors.academic;
  const { bg, fg } = colors[(id - 1) % colors.length];
  
  return (
    <svg className="w-full h-36 md:h-48" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill={bg} />
      <circle cx="200" cy="100" r="50" fill={fg} fillOpacity="0.2" />
      <rect x="50" y="50" width="300" height="30" rx="5" fill={fg} fillOpacity="0.3" />
      <rect x="50" y="100" width="300" height="10" rx="5" fill={fg} fillOpacity="0.5" />
      <rect x="50" y="120" width="200" height="10" rx="5" fill={fg} fillOpacity="0.5" />
      <rect x="50" y="140" width="250" height="10" rx="5" fill={fg} fillOpacity="0.5" />
    </svg>
  );
};

// Technology badge component
const TechBadge = ({ tech }: { tech: string }) => {
  // Different colors for different tech types
  const colors: Record<string, string> = {
    "Data Analysis": "bg-blue-100 text-blue-800",
    "Supply Chain": "bg-green-100 text-green-800",
    "Cost Optimization": "bg-purple-100 text-purple-800",
    "Product Innovation": "bg-yellow-100 text-yellow-800",
    "Python": "bg-emerald-100 text-emerald-800",
    "AI/ML Models": "bg-orange-100 text-orange-800",
    "API Integration": "bg-cyan-100 text-cyan-800",
    "SAS EM": "bg-yellow-100 text-yellow-800",
    "Data Mining": "bg-sky-100 text-sky-800",
    "Machine Learning": "bg-rose-100 text-rose-800",
    "Predictive Modeling": "bg-indigo-100 text-indigo-800",
    "Strategy Consulting": "bg-amber-100 text-amber-800",
    "Project Management": "bg-blue-100 text-blue-800",
    "Data Processing": "bg-teal-100 text-teal-800",
  };
  
  const colorClass = colors[tech] || "bg-gray-100 text-gray-800";
  
  return (
    <span className={`px-2 py-1 ${colorClass} text-xs rounded-full inline-block`}>
      {tech}
    </span>
  );
};

// YouTube video component
const YouTubeEmbed = ({ videoUrl }: { videoUrl: string }) => {
  // Extract video ID from URL
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeID(videoUrl);
  
  if (!videoId) return <div className="text-red-500">Invalid YouTube URL</div>;
  
  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// Tableau Embed component
const TableauEmbed = ({ dashboardUrl }: { dashboardUrl: string }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-6 h-6 text-cyan-600 mr-2" />
        <h3 className="text-lg font-semibold">Interactive Tableau Dashboard</h3>
      </div>
      <p className="mb-4 text-gray-600">
        Explore my interactive data visualizations created in Tableau. Click the link below to view the dashboard.
      </p>
      <a 
        href={dashboardUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        View Dashboard
      </a>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="overflow-hidden border-2 border-[#89CFF0]/20 bg-[#0D1B2A]/80">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
          style={{
            objectPosition: project.title.includes("Bankruptcy") ? "center 20%" : // Show boy's head
                          project.title.includes("Union Pacific") ? "center 60%" : // Show train
                          "center"
          }}
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-charcoal">{project.title}</h3>
        <p className="text-steel mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech: string, index: number) => (
            <Badge
              key={index}
              className="bg-[#89CFF0]/10 text-[#2A4365] border border-[#89CFF0]/30"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-autumn hover:text-autumn/80 transition font-medium flex items-center gap-1">
              <LinkIcon className="h-4 w-4" /> View Details
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-charcoal transition">
              <Github className="h-5 w-5" /> 
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("academic");

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
    <ParallaxGradientBackground>
      <section
        id="projects"
        ref={sectionRef}
        className="w-full py-24 bg-gradient-to-br from-[#F0F8FF] to-[#E6F3FF] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Press_Start_2P'] text-3xl text-[color:var(--autumn)] drop-shadow-[0_2px_2px_rgba(255,183,31,0.3)] mb-4">
              My Work
            </h2>
            <p className="text-[color:var(--steel)] max-w-2xl mx-auto">
              A showcase of my projects and contributions
            </p>
          </div>

          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="flex justify-center mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-lg border-2 border-[#89CFF0]/30">
              <TabsTrigger
                value="academic"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="tableau"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                Dashboards
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                Research
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                YouTube
              </TabsTrigger>
              <TabsTrigger
                value="kaggle"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                Kaggle
              </TabsTrigger>
              <TabsTrigger
                value="github"
                className="px-4 py-2 font-['Press_Start_2P'] text-sm data-[state=active]:bg-[#89CFF0] data-[state=active]:text-white"
              >
                GitHub
              </TabsTrigger>
            </TabsList>

            <TabsContent value="academic" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {academicProjects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30">
                    <CardContent className="p-6">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        {project.imageUrl && (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                        {project.title}
                      </h3>
                      <p className="text-[#4A5568] mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge
                            key={index}
                            className="bg-[#89CFF0]/10 text-[#2A4365] border border-[#89CFF0]/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end space-x-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tableau" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tableauDashboards.map((dashboard) => (
                  <Card 
                    key={dashboard.id}
                    className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30"
                  >
                    <CardContent className="p-6">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        {dashboard.imageUrl ? (
                          <img 
                            src={dashboard.imageUrl} 
                            alt={dashboard.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <ProjectSVG id={dashboard.id} type="tableau" />
                        )}
                      </div>
                      <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                        {dashboard.title}
                      </h3>
                      <p className="text-[#4A5568] mb-4 line-clamp-3">
                        {dashboard.description}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <a 
                          href={dashboard.dashboardUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                        >
                          <BarChart3 className="w-5 h-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {researchPapers.map((paper) => (
                  <Card 
                    key={paper.id}
                    className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30"
                  >
                    <CardContent className="p-6">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        {paper.imageUrl ? (
                          <img 
                            src={paper.imageUrl} 
                            alt={paper.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <ProjectSVG id={paper.id} type="research" />
                        )}
                      </div>
                      <Badge className="mb-2 bg-[#89CFF0]/10 text-[#2A4365] border border-[#89CFF0]/30">
                        {paper.journal}
                      </Badge>
                      <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-[#4A5568] mb-2">
                        Published: {paper.publicationDate}
                      </p>
                      <p className="text-[#4A5568] mb-4 line-clamp-3">
                        {paper.abstract}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <a 
                          href={paper.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* YouTube Videos Tab */}
            <TabsContent value="video" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videoProjects.map((video) => (
                  <Card 
                    key={video.id}
                    className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30"
                  >
                    <CardContent className="p-6">
                      <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                        {video.title}
                      </h3>
                      <p className="text-[#4A5568] mb-4 line-clamp-3">
                        {video.description}
                      </p>
                      <YouTubeEmbed videoUrl={video.videoUrl} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Kaggle Projects Tab */}
            <TabsContent value="kaggle" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {kaggleProjects.length > 0 ? (
                  kaggleProjects.map((project) => (
                    <Card 
                      key={project.id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30"
                    >
                      <CardContent className="p-6">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                          <ProjectSVG id={project.id} type="kaggle" />
                        </div>
                        <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-[#4A5568] mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-[#89CFF0]/10 text-[#2A4365] border border-[#89CFF0]/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <a 
                            href={project.kaggleUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                          >
                            <Database className="w-5 h-5" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Database className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-[#2A4365] mb-2">Coming Soon</h3>
                    <p className="text-[#4A5568] max-w-md mx-auto">
                      I'm currently working on some interesting Kaggle projects. Check back soon to see my data science competitions and notebooks!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* GitHub Projects Tab */}
            <TabsContent value="github" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {githubProjects.length > 0 ? (
                  githubProjects.map((project) => (
                    <Card 
                      key={project.id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-[#89CFF0]/30"
                    >
                      <CardContent className="p-6">
                        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                          <ProjectSVG id={project.id} type="github" />
                        </div>
                        <h3 className="font-['Press_Start_2P'] text-lg text-[#2A4365] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-[#4A5568] mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-[#89CFF0]/10 text-[#2A4365] border border-[#89CFF0]/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-[#2A4365] hover:text-[#89CFF0] transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Github className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-[#2A4365] mb-2">Coming Soon</h3>
                    <p className="text-[#4A5568] max-w-md mx-auto">
                      I'm currently working on pushing my projects to GitHub. Check back soon to explore my code repositories!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </ParallaxGradientBackground>
  );
}
