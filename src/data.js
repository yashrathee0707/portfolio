export const profile = {
  name: 'Yash Rathee',
  email: 'yashrathee3333@gmail.com',
  phone: '+91 82210 03939',
  phoneHref: 'tel:+918221003939',
  linkedin: 'https://www.linkedin.com/in/yashyash/',
  github: 'https://github.com/yashrathee0707',
}

// "I build ___"
export const phrases = [
  'LLM agents',
  'event-driven systems',
  'scalable microservices',
  'real-time pipelines',
  'computer vision models',
]

export const marqueeA = ['Java', 'Spring Boot', 'Apache Kafka', 'LLM Agents', 'LangChain', 'Redis', 'Microservices', 'PostgreSQL']
export const marqueeB = ['React', 'Python', 'Spark', 'Computer Vision', 'FastAPI', 'Angular', 'OpenAI', 'Multithreading']

// Words prefixed with * are highlighted.
export const statement =
  "I'm a software engineer who turns messy, high-volume problems into clean, *scalable *systems. From *LLM *agents that watch warehouses in real time to event pipelines moving *100K+ signals every day."

export const stats = [
  { to: 100, suffix: 'K+', label: 'Daily device signals handled' },
  { to: 92, suffix: '%', label: 'Accuracy on satellite imagery' },
  { to: 25, suffix: '%', label: 'Faster image processing' },
  { to: 8.45, decimals: 2, label: 'CGPA, B.Tech CSE' },
]

export const experience = [
  {
    role: 'Software Engineer',
    date: 'Jul 2025 — Now',
    org: 'BarCode India Ltd · Gurgaon',
    points: [
      ['Architected and deployed ', 'BCI NAVI', ', an enterprise LLM-powered warehouse management agent using OpenAI APIs and LangChain for real-time anomaly detection and predictive inventory optimization.'],
      ['Engineered a scalable Java/Spring Boot microservices architecture with Kafka streaming and Redis caching, handling ', '100K+ daily signals', ' from warehouse devices.'],
      ['Refactored legacy supply chain systems with Java concurrency patterns, streamlining order processing and fulfillment without breaking existing infrastructure.'],
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'OpenAI', 'LangChain'],
  },
  {
    role: 'Software Engineer Intern',
    date: 'Jan — Jul 2025',
    org: 'BarCode India Ltd · Gurgaon',
    points: [
      ['Built and maintained production-grade ', 'Spring Boot REST APIs', ' for core warehouse operations.'],
      ['Designed event-driven microservice communication with ', 'Kafka and Spring Cloud Stream', ' for a loosely coupled architecture.'],
    ],
    tags: ['Spring Boot', 'REST', 'Kafka', 'Spring Cloud Stream'],
  },
  {
    role: 'Research Intern',
    date: 'Jun — Jul 2023',
    org: 'IIT Roorkee · India',
    points: [
      ['Optimized a large-scale image pipeline with Segment Anything Model, cutting processing time by ', '25%', ' and reaching ', '92% accuracy', ' on satellite imagery.'],
      ['Co-authored a ', 'published research paper', ' on satellite image segmentation and geospatial analysis.'],
    ],
    tags: ['Python', 'SAM', 'Computer Vision'],
  },
]

export const projects = [
  {
    icon: '🔮',
    kind: 'Live Product · AI SaaS',
    accent: '#f59e0b',
    title: 'EchoForge: Private AI Knowledge Vault',
    desc: '"Your documents finally talk back." Upload PDFs, notes and research, then ask questions in plain English and get answers cited down to the exact page.',
    points: [
      'Natural-language Q&A with precise document and page citations.',
      'Auto-syncs Google Drive and Gmail into a personal vault.',
      'Encrypted at rest and in transit; shared team vaults with concurrent AI chats.',
    ],
    flow: ['PDFs · Drive · Gmail', 'Ingest', 'Encrypted Vault', 'Retrieval', 'LLM', 'Cited Answer'],
    tags: ['RAG', 'LLMs', 'Google Drive API', 'Gmail API', 'Encryption'],
    link: 'https://echoforge.in/',
  },
  {
    icon: '📦',
    kind: 'Distributed Systems',
    accent: '#8b5cf6',
    title: 'Multi-Warehouse Inventory Sync Engine',
    desc: 'Real-time inventory synchronization across warehouses with Spring Boot microservices streaming over Apache Kafka.',
    points: [
      'Smart stock allocation routing orders by proximity, stock levels and SLAs.',
      'Distributed transactions with optimistic locking.',
      'PostgreSQL read replicas, Redis caching, live dashboard.',
    ],
    flow: ['Warehouse Events', 'Kafka', 'Inventory Svc', 'Allocation Svc', 'Postgres + Redis', 'Dashboard'],
    tags: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Angular'],
  },
  {
    icon: '🕵️',
    kind: 'Agentic AI · FinTech',
    accent: '#f472b6',
    title: 'AI Financial Fraud Investigator',
    desc: 'High-throughput payment pipeline where specialized LLM agents debate each transaction to catch fraud.',
    points: [
      'Transaction, Behavior and AML agents reason together over context.',
      'Real-time graph analysis and behavioral clustering on Spark.',
      'Explainable audit trails and automatic compliance actions.',
    ],
    flow: ['Payment Events', 'Kafka', 'Spark Graph', 'LLM Agents ×3', 'Risk Score', 'Compliance'],
    tags: ['Java', 'Scala', 'Kafka', 'Spark', 'LLMs'],
  },
  {
    icon: '🤖',
    kind: 'Production · GenAI',
    accent: '#22d3ee',
    title: 'BCI NAVI: Warehouse AI Agent',
    desc: 'Enterprise LLM agent for warehouse management, running in production at BarCode India.',
    points: [
      'Real-time anomaly detection on device signal streams.',
      'Predictive inventory optimization.',
      'OpenAI + LangChain on a Kafka and Redis backbone.',
    ],
    flow: ['Device Signals', 'Kafka', 'Redis', 'LangChain Agent', 'Anomaly Alerts'],
    tags: ['OpenAI', 'LangChain', 'Java', 'Kafka', 'Redis'],
  },
  {
    icon: '🛰️',
    kind: 'Research · IIT Roorkee',
    accent: '#a3e635',
    title: 'Satellite Image Segmentation',
    desc: 'Large-scale geospatial image analysis using Segment Anything Model, published as a research paper.',
    points: [
      '25% reduction in pipeline processing time.',
      '92% accuracy on satellite imagery.',
      'Co-authored published research paper.',
    ],
    flow: ['Satellite Imagery', 'SAM', 'Segmentation', 'Geo Analysis'],
    tags: ['Python', 'SAM', 'Computer Vision'],
  },
]

export const skillCats = {
  lang: 'Languages',
  backend: 'Backend',
  ai: 'AI & Data',
  frontend: 'Frontend',
  tools: 'Foundations',
}

export const skills = [
  ['C++', 'lang'], ['Python', 'lang'], ['Java', 'lang'], ['JavaScript', 'lang'], ['MySQL', 'lang'], ['Scala', 'lang'],
  ['Spring Boot', 'backend'], ['Microservices', 'backend'], ['REST APIs', 'backend'], ['Kafka', 'backend'],
  ['RabbitMQ', 'backend'], ['Redis', 'backend'], ['Django', 'backend'], ['Flask', 'backend'],
  ['FastAPI', 'backend'], ['Multithreading', 'backend'], ['Streams API', 'backend'], ['Collections', 'backend'],
  ['Generative AI', 'ai'], ['LangChain', 'ai'], ['Computer Vision', 'ai'], ['Data Science', 'ai'],
  ['Data Analytics', 'ai'], ['DuckDB', 'ai'], ['SageMaker', 'ai'], ['Model Design', 'ai'], ['Spark', 'ai'],
  ['React', 'frontend'], ['Angular', 'frontend'], ['HTML', 'frontend'], ['CSS', 'frontend'],
  ['DSA', 'tools'], ['SOLID', 'tools'], ['Networking', 'tools'], ['Git', 'tools'], ['GitHub', 'tools'], ['Linux', 'tools'],
]

export const achievements = [
  { icon: '🏆', k: 'Leadership', title: 'Chief Strategist, ACM', desc: 'Bennett University. Led the chapter in organizing a technical fest and hosting talks with industry experts.' },
  { icon: '📄', k: 'Research', title: 'Published Researcher', desc: 'IIT Roorkee. Co-authored and published a paper on satellite image segmentation and geospatial analysis.' },
]
