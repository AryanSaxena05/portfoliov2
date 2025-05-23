import { useEffect, useRef } from "react";
import { BriefcaseBusiness, Calendar, Globe, GlobeIcon, MapPin, FileSpreadsheet } from "lucide-react";
import { SiGooglecloud, SiPython, SiFirebase } from "react-icons/si";

type Experience = {
  id: number;
  company: string;
  role: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: 0,
    company: "Kearney Student Lab",
    role: "Business Analyst Intern",
    location: "West Lafayette, Indiana, United States",
    isRemote: false,
    startDate: "Jan 2025",
    endDate: "May 2025",
    description: [
      "Managed 6-member team to extract CRM data using SQL, Python & advanced Excel, developing scalable ETL workflows for high-volume client reporting (70K+ records), achieving $1.7M in cost savings and $204K in added profit.",
      "Conducted campaign ROI analyses & A/B test simulations to uncover a 24.2% perceived share gap, equipping investor relations teams with strategic collateral that increased client contribution by 20%.",
      "Collaborated with stakeholders to document client-specific pricing clauses & build custom financial models supporting contract-level profitability analysis, boosting data trust score by 18%.",
      "Constructed regression & classification models to forecast campaign & pricing outcomes; visualized marketing insights via Tableau."
    ],
    skills: ["SQL", "Python", "Excel", "ETL", "Data Analysis", "Financial Modeling", "Tableau", "Regression Analysis", "Team Leadership", "Stakeholder Management"]
  },
  {
    id: 1,
    company: "Confidential Telecommunication Start-up",
    role: "Management Consulting Engagement",
    location: "West Lafayette, Indiana, United States",
    isRemote: true,
    startDate: "Sep 2024",
    endDate: "Dec 2024",
    description: [
      "Analysed TCO (~$150K) across platforms using Python & Excel to support strategic investment decisions & fund reporting.",
      "Benchmarked peer financials (debt-to-equity, P&L) to enhance investor materials and contributed to a 15% reduction in client debt through improved reporting insights.",
      "Developed competitor product gap analyses & structured SWOT frameworks to inform due diligence responses for both business & technical stakeholders, strengthening marketing collateral for future.",
      "Assessed market growth, pricing sensitivity & service KPIs to support data-driven fundraising & GTM strategy development."
    ],
    skills: ["Management Consulting", "Teamwork", "Microsoft Excel", "Data Modeling"]
  },
  {
    id: 2,
    company: "mirrAR Innovation Technologies Pvt. Ltd.",
    role: "AI/ML Research Intern",
    location: "Bengaluru, India",
    isRemote: false,
    startDate: "Dec 2023",
    endDate: "Apr 2024",
    description: [
      "Analyzed large datasets using python frameworks, facilitating construction of optimum predictive models.",
      "Developed computer vision models, enabling hand mesh reconstruction applications and boosting accuracy by 40%."
    ],
    skills: ["Deep Learning", "Convolutional Neural Networks (CNN)", "Artificial Intelligence (AI)", "Business Insights", "Analytical Skills", "Research Skills", "Critical Thinking"]
  },
  {
    id: 3,
    company: "BoredLeaders Pvt. Ltd.",
    role: "Product Analyst Intern",
    location: "New Delhi, India",
    isRemote: false,
    startDate: "Oct 2023",
    endDate: "Dec 2023",
    description: [
      "Spearheaded the development of pipelines on Google's cloud platform to process raw data using ETL methods, resulting in a 20% increase in data accessibility in the CEO's office.",
      "Utilized SQL based scripts in BigQuery to create complex retention and churn analytics data, leading to a 50% boost in consumer usage.",
      "Engineered data warehouse & end-to-end pipelines on Google Analytics, improving data accessibility by 20%.",
      "Utilized Google Cloud Platform for advanced data visualizations, enabling data-driven decisions for CEO's office.",
      "Created complex customer retention management dashboards to enable data-driven decisions."
    ],
    skills: ["Data Visualization", "Google Analytics", "Problem Solving", "Data Analysis", "Databases", "Firebase", "Dashboards", "Analytical Skills", "Data Science"]
  }
];

export default function ExperienceSection() {
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

  const getSkillIcon = (skill: string) => {
    if (skill.includes('Excel')) return <FileSpreadsheet className="text-green-600" />;
    if (skill.includes('Python')) return <SiPython className="text-blue-500" />;
    if (skill.includes('Google')) return <SiGooglecloud className="text-red-500" />;
    if (skill.includes('Firebase')) return <SiFirebase className="text-yellow-500" />;
    return <div className="w-4 h-4 rounded-full bg-gray-200" />;
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-gray-50 opacity-0 translate-y-5 transition-all duration-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              My career journey and professional experiences
            </p>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-charcoal">{exp.role}</h3>
                      <p className="text-autumn font-medium mt-1">{exp.company}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center text-steel text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center text-steel text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{exp.location}</span>
                    {exp.isRemote && <span className="ml-2 inline-flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"><Globe className="h-3 w-3 mr-1" /> Remote</span>}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {exp.description.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-autumn mr-3 mt-1.5"></div>
                        </div>
                        <p className="text-steel">{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm font-medium text-charcoal mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <div key={idx} className="inline-flex items-center text-xs bg-gray-100 text-steel px-2.5 py-1.5 rounded-full">
                          {getSkillIcon(skill)}
                          <span className="ml-1.5">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}