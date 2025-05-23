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
      ref={sectionRef}
      className="w-full min-h-screen bg-white py-24 transform opacity-0 translate-y-10 transition-all duration-700 ease-in-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-['Press_Start_2P'] text-3xl text-[#FFB71F] drop-shadow-[0_2px_2px_rgba(255,183,31,0.3)] mb-8">
            Work Experience
          </h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0D1B2A] border-2 border-[#89CFF0] p-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:border-[#FFB71F]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="font-['Press_Start_2P'] text-[#FFB71F] text-lg mb-2">
                    {exp.company}
                  </h3>
                  <p className="text-[#89CFF0] font-['Press_Start_2P'] text-sm mb-2">
                    {exp.role}
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                  <div className="flex items-center text-[#89CFF0]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs font-['Press_Start_2P']">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4">
                <MapPin className="w-4 h-4 text-[#89CFF0] mt-1" />
                <p className="text-[#89CFF0] text-sm font-['Press_Start_2P']">
                  {exp.location}
                  {exp.isRemote && (
                    <span className="ml-2 text-[#FFB71F]">(Remote)</span>
                  )}
                </p>
              </div>

              <ul className="list-none space-y-2 mb-4">
                {exp.description.map((desc, index) => (
                  <li
                    key={index}
                    className="text-white text-sm pl-4 relative leading-relaxed"
                  >
                    <span className="absolute left-0 text-[#FFB71F]">›</span>
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#89CFF0] text-[#0D1B2A] px-3 py-1 rounded text-xs font-['Press_Start_2P'] inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}