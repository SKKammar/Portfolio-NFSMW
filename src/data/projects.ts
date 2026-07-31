export interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  year: number | null;
  category: string | null;
  bounty: string;
  costToState: string;
  blacklistRank: number;
}

export const blacklistProjects: Project[] = [
  {
    id: 'dognose-scanner',
    title: 'CANID',
    subtitle: 'Canine biometric identification system',
    description:
      'A biometric backend that identifies dogs by nose prints using ArcFace embeddings and pgvector similarity search. Features a SECURITY DEFINER RPC for cross-owner public lookup, FastAPI backend, full JWT auth, and CORS handling.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'pgvector', 'ArcFace'],
    liveUrl: null,
    githubUrl: 'https://github.com/SKKammar/CANID',
    year: 2026,
    category: 'Backend / AI',
    bounty: '1,500,000',
    costToState: '$500,000',
    blacklistRank: 7,
  },
  {
    id: 'inventory-system',
    title: 'Inventory System',
    subtitle: 'Production-ready Spring Boot backend',
    description:
      'A full-stack inventory and order platform built with Spring Boot 3 and Java 17, featuring JWT authentication, role-based access control, and real-time stock management with optimistic locking to prevent overselling. Load tested at ~9,000 requests, 126 req/s, 0% error rate.',
    technologies: ['Spring Boot', 'Java', 'MySQL', 'JWT', 'React', 'Docker'],
    liveUrl: null,
    githubUrl: 'https://github.com/SKKammar/InventoryManagement',
    year: 2026,
    category: 'Backend',
    bounty: '1,850,000',
    costToState: '$750,000',
    blacklistRank: 6,
  },
  {
    id: 'inspectai-anomaly-detection',
    title: 'InspectAI',
    subtitle: 'Unsupervised industrial defect detection',
    description:
      'A computer vision system that detects surface defects in industrial images without any anomaly labels, trained only on normal samples. Compares a convolutional autoencoder baseline against PatchCore, reaching 1.00 image AUROC and 0.99 pixel AUROC on MVTec AD. Includes a Flask app for real-time inference.',
    technologies: ['Python', 'PyTorch', 'PatchCore', 'Flask', 'Computer Vision'],
    liveUrl: null,
    githubUrl: 'https://github.com/SKKammar/Anomaly-detection',
    year: 2026,
    category: 'Computer Vision',
    bounty: '2,200,000',
    costToState: '$1,100,000',
    blacklistRank: 5,
  },
  {
    id: 'churnops',
    title: 'ChurnOps',
    subtitle: 'Production-ready MLOps pipeline',
    description:
      "A production-ready MLOps pipeline that predicts e-commerce customer churn. Instead of just chasing accuracy, it optimizes for net profit by factoring in retention offer costs against Customer Lifetime Value (CLV). It achieves 91% recall, includes a FastAPI backend, a Streamlit dashboard for monitoring, and is fully containerized with Docker—demonstrating end-to-end machine learning deployment.",
    technologies: ['Python', 'FastAPI', 'Streamlit', 'Docker', 'MLOps'],
    liveUrl: null,
    githubUrl: 'https://github.com/SKKammar/ChurnOps',
    year: 2026,
    category: 'MLOps',
    bounty: '3,000,000',
    costToState: '$1,500,000',
    blacklistRank: 4,
  },
  {
    id: 'codementor',
    title: 'CodeMentor',
    subtitle: 'AI-powered coding assistant with Socratic hints',
    description:
      'An AI-powered coding assistant built with Next.js 15 and TypeScript that uses a Socratic hint engine to guide users toward solutions rather than giving direct answers. It features a knowledge graph to visualize learning progress, conducts structured code reviews with severity tags, and integrates Supabase for auth/database and the Gemini API for AI generation.',
    technologies: ['Next.js 15', 'TypeScript', 'Supabase', 'Gemini API'],
    liveUrl: null,
    githubUrl: 'https://github.com/SKKammar/CodeMentor',
    year: 2026,
    category: 'Full Stack / AI',
    bounty: '4,500,000',
    costToState: '$2,200,000',
    blacklistRank: 3,
  },
  {
    id: 'pr-pilot',
    title: 'pr-pilot',
    subtitle: 'AI-driven PR reviewer GitHub App',
    description:
      "A GitHub App that automatically reviews pull requests using the Gemini API, posting inline comments just like a human reviewer. It's engineered with a background task pattern to handle webhook timeouts, processes files concurrently to avoid API rate limits, and secures requests with HMAC-SHA256 verification—making it a robust, developer-friendly CI/CD addition.",
    technologies: ['FastAPI', 'Python', 'Next.js 15', 'GitHub Apps', 'Gemini API', 'CI/CD'],
    liveUrl: 'https://pr-pilot-two.vercel.app',
    githubUrl: 'https://github.com/SKKammar/pr-pilot',
    year: 2026,
    category: 'CI/CD / Tooling',
    bounty: '6,000,000',
    costToState: '$3,500,000',
    blacklistRank: 2,
  },
  {
    id: 'secretshield',
    title: 'SecretShield',
    subtitle: 'GitHub Action for secret scanning',
    description:
      "A GitHub Action that scans repositories for accidentally committed secrets—such as API keys, tokens, and sensitive files—before they reach production. It's fully documented, easy for other developers to drop into their workflows, and shows strong attention to security automation and the developer experience in CI/CD pipelines.",
    technologies: ['GitHub Actions', 'Security', 'CI/CD'],
    liveUrl: 'https://secret-shield-topaz.vercel.app/',
    githubUrl: 'https://github.com/SKKammar/SecretShield',
    year: 2026,
    category: 'Security',
    bounty: '10,000,000',
    costToState: '$5,500,000',
    blacklistRank: 1,
  },
];
