/**
 * All site content lives here as static, typed data.
 *
 * Every string below is taken verbatim from the attached resume (Gaurav
 * Rathore). Nothing has been invented, inferred, or embellished. If a section
 * has no supporting information in the resume, it is omitted from the site.
 */

export type Social = {
  label: string;
  href?: string;
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  /** Dialable phone number (letters/digits only) for tel: links. */
  phoneLink: string;
  role: string;
  company: string;
  location: string;
  socials: Social[];
  /** Profile picture: drop the file at /public/profile/portrait.jpg. */
  avatar?: { src: string; alt: string };
};

export const profile: Profile = {
  name: "Gaurav Rathore",
  email: "gauravrathore856@gmail.com",
  phone: "+91-6397987863",
  phoneLink: "+916397987863",
  // The resume lists the role/company/location under Experience. Reused in
  // the hero meta line only as presented there.
  role: "Software Engineer",
  company: "JMAN Group",
  location: "Chennai",
  socials: [
    // Mentioned on the resume header as plain labels without URLs.
    { label: "GitHub" },
    { label: "LinkedIn" },
  ],
  avatar: {
    src: "/profile/portrait.jpg",
    alt: "Portrait of Gaurav Rathore",
  },
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "C++", "SQL", "JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Backend & Web",
    items: ["REST APIs", "Next.js", "React.js", "Flask", "Node.js"],
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    items: [
      "Microsoft Azure",
      "Azure DevOps (CI/CD)",
      "Docker",
      "Terraform",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "Data & Databases",
    items: ["SQL", "Databricks", "PySpark", "Delta Lake", "Data Modeling"],
  },
  {
    title: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "JMAN Group",
    location: "Chennai",
    period: "June 2026 – Present",
    bullets: [
      "Build backend services and REST APIs powering Next.js/TypeScript applications, owning features end-to-end from data model to UI.",
      "Containerize and deploy services on Microsoft Azure via Docker, automating builds and releases through Azure DevOps CI/CD pipelines.",
      "Write PySpark and SQL transformations in Databricks to prepare structured datasets for downstream analytics.",
      "Collaborate with backend, frontend, and data engineers to scope tickets, review pull requests, and ship production features on schedule.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "JMAN Group",
    location: "Chennai",
    period: "Feb 2026 – May 2026",
    bullets: [
      "Built and deployed a full-stack application on Microsoft Azure, covering both backend API development and cloud configuration.",
      "Automated environment setup with Terraform (IaC) and Docker, and configured Azure DevOps CI/CD pipelines for testing and deployment.",
      "Extended application functionality with LLM-based retrieval components, integrating them into the existing service architecture.",
    ],
  },
];

export type Project = {
  /** May contain "\n" to control the line-break in the display title. */
  title: string;
  bullets: string[];
  stack: string[];
  /** GitHub repo URL — leave undefined until a URL is available. */
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Subscription Analytics\nData Pipeline",
    bullets: [
      "Built a Databricks ETL pipeline on a Bronze/Silver/Gold architecture to clean, transform, and aggregate subscription data from multiple sources.",
      "Applied dimensional (star schema) modeling to cut query complexity for downstream reporting.",
      "Delivered Gold-layer tables powering revenue, churn, and retention dashboards across 10+ business KPIs.",
    ],
    stack: [
      "Python",
      "SQL",
      "Databricks",
      "PySpark",
      "Azure Data Lake",
      "Delta Lake",
    ],
  },
  {
    title: "Stock Analyzer –\nMulti-Tool Agent System",
    bullets: [
      "Built a Python service routing stock queries to independent tools for market data retrieval, computation, and response generation.",
      "Decoupled the orchestration layer from individual tools, enabling new data sources to be added without changing core logic.",
    ],
    stack: ["Python", "Google ADK", "Gemini 2.5 Flash API"],
  },
];

export type Education = {
  institution: string;
  lines: string[];
  period?: string;
};

export const education: Education[] = [
  {
    institution: "Graphic Era Hill University",
    lines: [
      "Bachelor of Technology in Computer Science",
      "CGPA: 8.07 / 10",
    ],
    period: "2022 – 2026",
  },
  {
    institution: "The Sapience School",
    lines: [
      "Class XII (CBSE) – 88%",
      "Class X (CBSE) – 90.8%",
    ],
  },
];

export const achievements: string[] = [
  "Solved 700+ Data Structures and Algorithms problems across LeetCode and other competitive programming platforms.",
  "Completed the Microsoft Student Education Program, covering the Software Development Life Cycle (SDLC) and Agile methodology.",
  "Oracle Cloud Infrastructure Foundations Associate – certified.",
];