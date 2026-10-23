// Single source of truth for the 3D experience. Mirrors the latest resume (public/Sahil_Arya_Resume.pdf).

export const profile = {
  name: 'Sahil Arya',
  title: 'Senior Software Engineer',
  roles: [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Microfrontend Architect',
    'AI & LLM Integrations',
    'Data Integration & ETL',
  ],
  tagline:
    'Software Engineer with nearly 3 years of experience building scalable enterprise applications, data integration platforms, and AI-enabled analytics solutions.',
  email: 'sahilarya53@gmail.com',
  phone: '+91 9582006504',
  phoneHref: 'tel:+919582006504',
  location: 'Delhi, India',
  github: 'https://github.com/Sahilarya20',
  linkedin: 'https://linkedin.com/in/sahil-a-4a262211a',
  resume: '/Sahil_Arya_Resume.pdf',
};

export const about = {
  headline: 'Senior Software Engineer & Systems Architect',
  paragraphs: [
    'Software Engineer with nearly 3 years of experience building scalable enterprise applications, data integration platforms, and AI-enabled analytics solutions using React.js, TypeScript, Python, Node.js, and SQL. Experienced in REST APIs, microservices, ETL pipelines, structured and unstructured data processing, LLM integration, and vector-search retrieval. Focused on data quality, performance optimization, and reliable enterprise workflows.',
    "At Polestar Analytics I led the migration of a production-scale frontend monolith to a microfrontend architecture, enabling 4+ independent teams to build and release in parallel, and decomposed a Node.js monolith into 5+ Python microservices using gRPC, RabbitMQ, and Redis. I engineered PromoPulse, an AI-powered enterprise analytics platform that turns Databricks datasets into LLM-driven recommendations, scenario simulations, and KPI forecasts.",
    "I've also built OCR and document-processing pipelines using Claude Sonnet, Llama 3, and vector-search retrieval, achieving 92% extraction accuracy with support for 128K-token context windows, and I work directly with enterprise clients — Knipper, BDS, Zydus, and Insigneo. I'm a recipient of multiple Quarterly Impact Awards and hold the Databricks Certified Generative AI Engineer Associate certification.",
  ],
  stats: [
    { label: 'Years Experience', value: '3' },
    { label: 'Enterprise Clients', value: '4+' },
    { label: 'DSA Problems Solved', value: '400+' },
    { label: 'Microservices Built', value: '5+' },
  ],
  highlights: [
    {
      title: 'AI & LLM Engineering',
      text: 'Built AI-powered systems using Claude Sonnet, Llama 3, and vector-search retrieval, achieving 92% extraction accuracy on enterprise documents with 128K-token context support.',
    },
    {
      title: 'Distributed Systems',
      text: 'Decomposed a Node.js monolith into 5+ Python microservices using gRPC, RabbitMQ, and Redis for asynchronous processing, service isolation, and reliable inter-service communication.',
    },
    {
      title: 'Performance & Scale',
      text: 'Reduced API latency by approximately 30% (600 ms → 420 ms) and per-page payload from 2 MB to 20 KB through server-side pagination, lazy loading, and optimized Delta Lake queries.',
    },
  ],
};

export const education = {
  degree: 'Bachelor of Technology in Computer Science',
  institution: 'Maharaja Agrasen Institute of Technology',
  location: 'Delhi, India',
  duration: 'August 2019 – July 2023',
  cgpa: '8.50/10',
};

export const achievements = [
  {
    title: 'Quarterly Impact Award – Dashing Debut',
    org: 'Polestar Analytics',
    date: '2024',
    text: 'Received a Quarterly Impact Award at Polestar Analytics.',
  },
  {
    title: 'Quarterly Impact Award – Rising Star',
    org: 'Polestar Analytics',
    date: '2024',
    text: 'Received a Quarterly Impact Award at Polestar Analytics.',
  },
  {
    title: 'Appreciation Certificate for PromoPulse',
    org: 'Polestar Analytics',
    date: '2024',
    text: 'Received an Appreciation Certificate for developing PromoPulse to improve financial analytics for clients.',
  },
  {
    title: 'Databricks Certified Generative AI Engineer Associate',
    org: 'Databricks',
    date: 'Certification',
    text: 'Earned the Databricks Certified Generative AI Engineer Associate certification.',
  },
  {
    title: '400+ DSA Problems Solved',
    org: 'LeetCode, CodeStudio & CodeChef',
    date: 'Ongoing',
    text: 'Solved 400+ Data Structures and Algorithms problems across LeetCode, CodeStudio, and CodeChef, demonstrating strong problem-solving skills.',
  },
];

export const experience = [
  {
    title: 'Senior Software Engineer',
    company: 'Polestar Analytics',
    location: 'India',
    duration: 'September 2025 – Present',
    short: 'Sep 2025 – Present',
    achievements: [
      'Led the migration of a production-scale frontend monolith to a microfrontend architecture, enabling 4+ independent teams to develop and release features in parallel while improving scalability, maintainability, and deployment independence.',
      'Decomposed a Node.js monolith into 5+ Python microservices using gRPC, RabbitMQ, and Redis, enabling asynchronous processing, service isolation, and reliable inter-service communication.',
      'Engineered and launched PromoPulse, an AI-powered enterprise analytics platform that processes Databricks datasets and generates LLM-driven recommendations, scenario simulations, and KPI forecasts for ROI, trade spend, revenue uplift, and campaign effectiveness.',
      'Developed OCR and document-processing pipelines using Claude Sonnet, Llama 3, and vector-search retrieval to transform unstructured PDFs, invoices, reports, and emails into structured data, achieving 92% extraction accuracy with support for 128K-token context windows.',
    ],
    technologies: ['React.js', 'Microfrontend', 'Python', 'gRPC', 'RabbitMQ', 'Redis', 'Databricks', 'LLM', 'Claude Sonnet', 'Llama 3'],
  },
  {
    title: 'Software Engineer',
    company: 'Polestar Analytics',
    location: 'India',
    duration: 'November 2023 – August 2025',
    short: 'Nov 2023 – Aug 2025',
    achievements: [
      'Developed and scaled 1Platform, an enterprise B2B analytics and ETL SaaS platform using React.js, Node.js, PostgreSQL, Microsoft Azure, and Databricks. Supported 4+ enterprise clients across data ingestion, transformation, governance, and analytics workflows.',
      'Built data ingestion, validation, and transformation workflows that automated complex manual SQL operations, reducing data-engineering effort by approximately 90% and accelerating pipeline creation and execution.',
      'Improved application performance by reducing API latency approximately 30%, from 600 ms to 420 ms, through server-side pagination, lazy loading, and optimized Delta Lake queries; reduced per-page payload size from 2 MB to 20 KB.',
      'Collaborated with four enterprise clients—Knipper, BDS, Zydus, and Insigneo—to deliver proof-of-concept solutions, workflow automation, analytics features, and customer-specific data platforms.',
    ],
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Azure', 'Databricks', 'Delta Lake', 'ETL'],
  },
];

export const skillCategories = [
  { title: 'Programming', skills: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'C++'] },
  {
    title: 'Frontend',
    skills: ['React.js', 'HTML', 'CSS', 'Ant Design', 'Responsive Interfaces', 'Reusable Components', 'Dashboards'],
  },
  {
    title: 'Backend and Integration',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'gRPC', 'Microservices', 'API Integration', 'Error Handling'],
  },
  {
    title: 'Data Engineering',
    skills: [
      'PostgreSQL', 'Redis', 'Databricks', 'Delta Lake', 'SQL Query Optimization', 'ETL Pipelines',
      'Data Ingestion', 'Data Transformation', 'Data Quality',
    ],
  },
  {
    title: 'Generative AI',
    skills: [
      'LLMs', 'Claude Sonnet', 'Llama 3', 'Vector Search', 'Retrieval-Based Document Processing',
      'Structured and Unstructured Data Extraction',
    ],
  },
  {
    title: 'Engineering and Tools',
    skills: [
      'Microfrontend Architecture', 'Distributed Systems', 'RabbitMQ', 'OOP', 'Data Structures and Algorithms',
      'DBMS', 'Performance Optimization', 'Git', 'GitHub', 'Microsoft Azure',
    ],
  },
];

// Names orbiting the hologram in the scene
export const hologramSkills = [
  'React.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL',
  'Azure', 'gRPC', 'Redis', 'Databricks', 'LLMs',
];

// To feature another project (e.g. MDM Studio or Wormhole), add an entry here.
// Set `preview` to a file in public/projects/ (1280x720 JPG) to show a real screenshot; without it a placeholder card is shown.
export const projects = [
  {
    id: '1platform',
    title: '1Platform',
    category: 'Enterprise SaaS',
    description:
      'Enterprise B2B analytics and ETL SaaS platform supporting 4+ enterprise clients across data ingestion, transformation, governance, and analytics workflows.',
    features: [
      'Data ingestion, validation, and transformation workflows',
      'Automated manual SQL operations (~90% less data-engineering effort)',
      'API latency 600 ms → 420 ms',
      'Per-page payload 2 MB → 20 KB',
      'Server-side pagination and lazy loading',
      'Optimized Delta Lake queries',
    ],
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Azure', 'Databricks'],
    links: { live: 'https://mdm.polestarllp.com/login' },
    preview: null,
  },
  {
    id: 'packetlens',
    title: 'PacketLens',
    category: 'Network Tools',
    description:
      'A real-time network analysis dashboard using WebSockets to stream live data and classify traffic across 20+ applications with custom binary parsers and no external packet-library dependencies.',
    features: [
      'Live data streaming via WebSockets',
      'Traffic classification across 20+ applications',
      'Custom binary parsers, no external packet libraries',
      'Multithreaded load balancer with configurable parallel workers',
      'Rule-based traffic-blocking engine',
      'IP, application, and domain filtering',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Socket.IO', 'Tailwind CSS'],
    links: {
      live: 'https://packet-lens-4lco.vercel.app/',
      github: 'https://github.com/Sahilarya20/PacketLens',
    },
    preview: null,
  },
];
