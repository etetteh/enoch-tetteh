
import type { Project, SkillCategory, Experience, Education } from '@/types/portfolio';
import { Briefcase, GraduationCap, Brain, Database, Cloud, Code, Cpu, AppWindow } from 'lucide-react';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Scalable Document Intelligence Platform (GCP)',
    description: "Architected and deployed an AI-powered platform on Google Cloud (Vertex AI, Document AI) to extract and analyze insights from millions of documents, boosting data processing efficiency by over 45% and enabling new data-driven business decisions.",
    carouselDescription: "AI platform on GCP (Vertex AI, Document AI) for processing millions of documents, boosting efficiency by 45%.",
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud data platform',
    techStack: ['Google Cloud Platform', 'Vertex AI', 'Document AI', 'Python', 'TensorFlow', 'Kubernetes', 'React'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Proactive Anomaly Detection for Large-Scale Systems',
    description: "Developed and implemented a machine learning system using TensorFlow and Scikit-learn for real-time anomaly detection in distributed systems, significantly reducing critical incident response times and improving system reliability for a platform serving over 10 million users. Deployed on GKE.",
    carouselDescription: "ML system (TensorFlow, Scikit-learn) for real-time anomaly detection in distributed systems, improving reliability for 10M+ users.",
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'anomaly detection system',
    techStack: ['Python', 'TensorFlow', 'Scikit-learn', 'Prometheus', 'GKE', 'BigQuery'],
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Next-Generation Recommendation Engine (TensorFlow Recommenders)',
    description: "Engineered a high-performance recommendation system leveraging TensorFlow Recommenders (TFRS) and deployed on Google Cloud. Achieved a 25% uplift in user engagement and a 15% increase in conversion rates for a major e-commerce client by delivering highly personalized content suggestions.",
    carouselDescription: "Recommendation engine using TFRS on GCP, achieving 25% user engagement uplift for an e-commerce client.",
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'recommendation engine',
    techStack: ['TensorFlow Recommenders', 'Python', 'Google Cloud AI Platform', 'BigQuery', 'Next.js'],
    liveUrl: '#',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Go'],
  },
  {
    name: 'AI/ML & Google AI',
    icon: Brain,
    skills: ['Natural Language Processing', 'Computer Vision', 'Deep Learning', 'Reinforcement Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'JAX', 'Vertex AI', 'Google AI Platform'],
  },
  {
    name: 'Data Science & Google Cloud Data',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark', 'BigQuery', 'Looker'],
  },
  {
    name: 'Web Technologies & Distributed Systems',
    icon: AppWindow,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'REST APIs', 'GraphQL', 'gRPC'],
  },
  {
    name: 'Google Cloud & DevOps',
    icon: Cloud,
    skills: ['Google Cloud Platform (GCP)', 'Vertex AI', 'GKE', 'Cloud Run', 'AWS', 'Azure ML', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Terraform'],
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Lead AI Engineer (Google Cloud Focus)',
    company: 'Innovatech Solutions',
    period: '2021 - Present',
    description: [
      "Led a team of 5 engineers in designing and deploying AI solutions on Google Cloud Platform, directly contributing to a 20% YOY revenue growth from AI products.",
      "Pioneered the use of Vertex AI pipelines for MLOps, reducing model deployment times by 60% and improving model monitoring.",
      "Drove cross-functional collaboration with product and infrastructure teams to integrate cutting-edge AI, like large language models (LLMs), into flagship products, enhancing user experience for 1M+ active users."
    ],
    icon: Briefcase,
  },
  {
    id: '2',
    role: 'Machine Learning Engineer & Researcher',
    company: 'Tech Forward Labs',
    period: '2019 - 2021',
    description: [
      "Researched and developed novel deep learning models for NLP tasks, resulting in 2 publications in ACL and NeurIPS workshops and demonstrating significant improvements over SOTA.",
      "Engineered and optimized data processing pipelines for large-scale text datasets using Apache Beam on Google Cloud Dataflow.",
      "Built and rigorously evaluated proof-of-concept AI models, demonstrating feasibility for projects later adopted for Google Cloud integration."
    ],
    icon: Briefcase,
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'M.S. in Artificial Intelligence',
    institution: 'Stanford University',
    period: '2017 - 2019',
    description: "Specialized in Deep Learning and Natural Language Processing. Thesis: 'Scalable Neural Machine Translation with Attention Mechanisms on Distributed TensorFlow'. Contributed to open-source TensorFlow projects.",
    icon: GraduationCap,
  },
  {
    id: '2',
    degree: 'B.S. in Computer Science',
    institution: 'Massachusetts Institute of Technology (MIT)',
    period: '2013 - 2017',
    description: "Graduated with high honors. Focus on algorithms, distributed systems, and software engineering. Capstone: 'AI-Powered Search Optimization using Reinforcement Learning', deployed on a simulated large-scale environment.",
    icon: GraduationCap,
  },
];

export const portfolioOwner = {
  name: "Alex Johnson",
  title: "Innovative AI Engineer & Google Cloud Specialist",
  bio: "Driven AI Engineer with a proven track record of developing scalable, high-impact machine learning solutions. Expertise in Google Cloud Platform, TensorFlow, and building production-grade AI systems. Passionate about tackling complex challenges and eager to contribute to Google's mission of organizing the world's information and making it universally accessible and useful.",
  contactEmail: "alex.johnson.ai@example.com",
  linkedinUrl: "https://www.linkedin.com/in/example",
  githubUrl: "https://github.com/example",
};
