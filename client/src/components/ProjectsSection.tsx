import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Github, Link as LinkIcon, ChevronRight, ExternalLink, Youtube, BarChart3, BookOpen, Briefcase } from "lucide-react";

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
};

type WorkExperience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
};

// Sample data - Academic Projects
const academicProjects: AcademicProject[] = [
  {
    id: 1,
    title: "NYC Public Schools Analysis",
    description: "This report analyzes the SAT performance of NYC schools, focusing on identifying schools with the best math results, listing the top 10 performing schools based on combined SAT scores, and determining which borough exhibits the largest standard deviation in combined SAT scores.",
    technologies: ["Data Analysis", "Education Analytics", "Statistical Analysis", "DataCamp Project"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Investigating Netflix Movies",
    description: "Analysis of Netflix movies released in the 1990s to uncover insights about this iconic decade in cinema. The project assists a production company specializing in nostalgic styles by examining trends and patterns in Netflix's extensive film library from this period.",
    technologies: ["Data Analysis", "Entertainment Analytics", "Trend Analysis", "DataCamp Project"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Bankruptcy Prediction Modeling",
    description: "Conducted robust EDA using SAS Enterprise Miner to address skewed attributes, significant outliers, and collinearity. Built an ensemble modeling approach combining Gradient Boosting, Neural Networks, and LASSO regression, achieving a final accuracy of 94.15% on private leaderboard test data.",
    technologies: ["SAS Enterprise Miner", "Data Engineering", "Exploratory Data Analysis", "Analytical Skills"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Student Performance Analysis System",
    description: "Developed a system that uses data visualization and machine learning to analyze and improve student performance. The project empowers educators with actionable insights to personalize learning and improve academic outcomes, creating more effective education choices.",
    technologies: ["Data Visualization", "Machine Learning", "Education Analytics", "Personalized Learning"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Union Pacific – Tech Transformation",
    description: "Developed a strategic roadmap to digitally transform Union Pacific's operations using IoT sensors, AI/ML integration, and digital twins. Enhanced the value chain through enriched data flow, better customer experience, and higher reliability while improving operational metrics.",
    technologies: ["Project Planning", "Cost Reduction Management", "Value Chain Optimization", "Strategic Communications"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Airbnb Market Segmentation",
    description: "Enhanced Airbnb's host network optimization using advanced data analytics to segment hosts and generate predictive insights. Used K-means clustering to identify six distinct host segments and developed predictive models for revenue drivers and Superhost probability.",
    technologies: ["Regression Analysis", "Market Analysis", "Machine Learning", "K-means Clustering"],
    demoUrl: "#",
    githubUrl: "#"
  }
];

// Sample data - Tableau Dashboards
const tableauDashboards: TableauDashboard[] = [
  {
    id: 1,
    title: "Marketing Dashboard",
    description: "Interactive marketing analytics dashboard providing insights into campaign performance, customer engagement, and ROI metrics for data-driven decision making.",
    dashboardUrl: "https://public.tableau.com/views/marketingdashboard_17218934198700/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  },
  {
    id: 2,
    title: "House Prices Analysis",
    description: "Comprehensive analysis of real estate market trends, property valuations, and price determinants across different regions and time periods.",
    dashboardUrl: "https://public.tableau.com/views/HousePrices_17187827408920/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  },
  {
    id: 3,
    title: "British Airways YouTube Analytics",
    description: "In-depth analysis of British Airways' YouTube channel performance, including engagement metrics, viewer demographics, and content effectiveness.",
    dashboardUrl: "https://public.tableau.com/views/britishairwaysyoutube/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  }
];

// Video Projects
const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "Data Analytics Project Showcase",
    description: "Demonstration of my analytical approach and project methodology in this comprehensive video showcasing the techniques and insights derived from my data science work.",
    videoUrl: "https://youtu.be/1BEwNre9-wo"
  },
  {
    id: 2,
    title: "Business Analytics Presentation",
    description: "Video presentation explaining key business analytics concepts and their real-world applications, with a focus on how data-driven decision making can transform organizations.",
    videoUrl: "https://youtu.be/1BEwNre9-wo"
  }
];

// Research Papers
const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "Research Paper on Data Analytics",
    journal: "International Journal of Innovative Research in Technology",
    abstract: "This research paper explores innovative approaches to data analytics and their applications in business decision-making.",
    publicationDate: "2023",
    link: "https://ijirt.org/Article?manuscript=164572"
  }
];

// Work Experience
const workExperience: WorkExperience[] = [
  {
    id: 1,
    company: "Ernst & Young",
    role: "Business Consulting Intern",
    duration: "May 2023 - July 2023",
    description: "Optimized operational strategy for a home essentials client, resulting in 30-35% cost reduction and product innovation.",
    skills: ["Strategy Consulting", "Data Analysis", "Project Management"]
  },
  {
    id: 2,
    company: "Telecom Startup",
    role: "Data Science Consultant",
    duration: "Jan 2023 - Apr 2023",
    description: "Improved AI/ML model accuracy by 40% through Python frameworks and API integrations for better data processing.",
    skills: ["Python", "Machine Learning", "API Integration", "Data Processing"]
  }
];

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
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-charcoal">My Work</h2>
          <p className="max-w-2xl mx-auto text-steel">
            Explore my academic projects, Tableau dashboards, and YouTube videos showcasing my skills and abilities.
          </p>
        </div>

        <Tabs defaultValue="academic" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 w-full">
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Academic Projects</span>
              <span className="inline md:hidden">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="tableau" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Tableau Dashboards</span>
              <span className="inline md:hidden">Tableau</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              <span className="hidden md:inline">YouTube Videos</span>
              <span className="inline md:hidden">YouTube</span>
            </TabsTrigger>
          </TabsList>

          {/* Academic Projects Tab */}
          <TabsContent value="academic" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academicProjects.map((project) => (
                <Card 
                  key={project.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform border-sky border-opacity-20"
                >
                  <div className="w-full">
                    <ProjectSVG id={project.id} type="academic" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-charcoal">{project.title}</h3>
                    <p className="text-steel mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      {project.demoUrl && (
                        <a href={project.demoUrl} className="text-autumn hover:text-autumn/80 transition font-medium flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" /> View Details
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="text-steel hover:text-charcoal transition">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tableau Dashboards Tab */}
          <TabsContent value="tableau" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tableauDashboards.map((dashboard) => (
                <Card 
                  key={dashboard.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform border-sky border-opacity-20"
                >
                  <div className="w-full">
                    <ProjectSVG id={dashboard.id} type="tableau" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-charcoal">{dashboard.title}</h3>
                    <p className="text-steel mb-4">
                      {dashboard.description}
                    </p>
                    <TableauEmbed dashboardUrl={dashboard.dashboardUrl} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* YouTube Videos Tab */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 gap-8">
              {videoProjects.map((video) => (
                <Card 
                  key={video.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform border-sky border-opacity-20"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-charcoal">{video.title}</h3>
                    <p className="text-steel mb-4">
                      {video.description}
                    </p>
                    <YouTubeEmbed videoUrl={video.videoUrl} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Papers Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="grid grid-cols-1 gap-8">
              {researchPapers.map((paper) => (
                <Card 
                  key={paper.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform border-sky border-opacity-20"
                >
                  <div className="w-full">
                    <ProjectSVG id={paper.id} type="research" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{paper.journal}</Badge>
                    <h3 className="text-xl font-semibold mb-2 text-charcoal">{paper.title}</h3>
                    <p className="text-sm text-steel mb-2">Published: {paper.publicationDate}</p>
                    <p className="text-steel mb-6">
                      {paper.abstract}
                    </p>
                    <a 
                      href={paper.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-autumn text-white hover:bg-autumn/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="work" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workExperience.map((job) => (
                <Card 
                  key={job.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform border-sky border-opacity-20"
                >
                  <div className="w-full">
                    <ProjectSVG id={job.id} type="work" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2 bg-amber-100 text-amber-800 hover:bg-amber-200">{job.duration}</Badge>
                    <h3 className="text-xl font-semibold mb-1 text-charcoal">{job.role}</h3>
                    <p className="text-autumn font-medium mb-3">{job.company}</p>
                    <p className="text-steel mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.skills.map((skill, index) => (
                        <TechBadge key={index} tech={skill} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
