
import type { Project, SkillCategory, Experience, Education } from '@/types/portfolio';
import { Briefcase, GraduationCap, Brain, Database, Cloud, Code, Cpu, AppWindow, BarChart3, Workflow, Settings2, Puzzle } from 'lucide-react';

export const projects: Project[] = [
  {
    id: 'new-chest-xray-project',
    title: 'Multi-Domain Medical AI - Advanced Chest X-ray Pathology Detection System',
    description: "This advanced medical AI system addresses a critical challenge in healthcare AI: ensuring model reliability across different hospital systems and imaging equipment. The project implements a novel multi-domain balanced sampling strategy that significantly improves out-of-distribution generalization compared to traditional merged dataset approaches. The system processes chest X-rays from four major medical datasets (NIH ChestX-ray8, PadChest, CheXpert, MIMIC-CXR) to predict four key pathologies: Cardiomegaly, Effusion, Edema, and Consolidation. Key innovations include custom weighted loss functions for handling medical data imbalance, sophisticated domain adaptation through balanced mini-batch sampling, and comprehensive leave-one-out cross-validation across medical institutions. The production pipeline features automated experiment tracking, robust checkpoint management, and quantization-aware training for deployment in resource-constrained clinical environments. Performance optimization includes cosine annealing learning rate scheduling with warmup, advanced data augmentation strategies, and efficient GPU/CPU inference modes. The system achieved publication at Medical Imaging meets NeurIPS 2021, demonstrating both research excellence and practical clinical applicability with deployment-ready model variants that maintain high accuracy.",
    carouselDescription: "Published research achieving state-of-the-art out-of-distribution generalization for chest X-ray pathology prediction across multiple hospital systems, with 4%+ improvement in cross-domain performance and deployment-ready quantized model variants.",
    imageUrl: 'https://placehold.co/600x400/EA4335/FFFFFF.png', // Google Red
    imageHint: 'medical AI',
    techStack: ['PyTorch', 'TorchXRayVision', 'Weights & Biases', 'scikit-learn', 'NumPy', 'DenseNet-121', 'ResNet-50', 'CUDA Optimization', 'CPU Optimization', 'Model Quantization', 'Medical Imaging'],
    githubUrl: 'https://github.com/etetteh/OoD_Gen-Chest_Xray',
    liveUrl: 'https://arxiv.org/abs/2112.13734',
  },
  {
    id: '2',
    title: 'Proactive Anomaly Detection for Large-Scale Systems',
    description: "Developed and implemented a machine learning system using TensorFlow and Scikit-learn for real-time anomaly detection in distributed systems, significantly reducing critical incident response times and improving system reliability for a platform serving over 10 million users. Deployed on GKE.",
    carouselDescription: "ML system (TensorFlow, Scikit-learn) for real-time anomaly detection in distributed systems, improving reliability for 10M+ users.",
    imageUrl: 'https://placehold.co/600x400/34A853/FFFFFF.png', // Google Green background, White text
    imageHint: 'detection system',
    techStack: ['Python', 'TensorFlow', 'Scikit-learn', 'Prometheus', 'GKE', 'BigQuery'],
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Next-Generation Recommendation Engine (TensorFlow Recommenders)',
    description: "Engineered a high-performance recommendation system leveraging TensorFlow Recommenders (TFRS) and deployed on Google Cloud. Achieved a 25% uplift in user engagement and a 15% increase in conversion rates for a major e-commerce client by delivering highly personalized content suggestions.",
    carouselDescription: "Recommendation engine using TFRS on GCP, achieving 25% user engagement uplift for an e-commerce client.",
    imageUrl: 'https://placehold.co/600x400/FBBC05/000000.png', // Google Yellow background, Black text
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
    skills: ['Natural Language Processing', 'Computer Vision', 'Deep Learning', 'Reinforcement Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'JAX', 'Vertex AI', 'Google AI Platform', 'TorchXRayVision', 'Model Quantization', 'Domain Adaptation', 'Data Augmentation'],
  },
  {
    name: 'Data Science & Google Cloud Data',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark', 'BigQuery', 'Looker', 'Cross-Validation Techniques'],
  },
  {
    name: 'Web Technologies & Distributed Systems',
    icon: AppWindow,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'REST APIs', 'GraphQL', 'gRPC'],
  },
  {
    name: 'Google Cloud, MLOps & DevOps',
    icon: Cloud,
    skills: ['Google Cloud Platform (GCP)', 'Vertex AI', 'GKE', 'Cloud Run', 'AWS', 'Azure ML', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Terraform', 'Weights & Biases (W&B)'],
  },
];

export const experiences: Experience[] = [
  {
    id: 'new-chest-xray-experience',
    role: 'Lead ML/AI Engineer (Medical Imaging Research)',
    company: 'Advanced AI Research Group (Research Project)',
    period: '2021 - Present', // Placeholder, adjust as needed
    description: [
      "Architected multi-domain balanced sampling framework for chest X-ray pathology prediction using PyTorch and TorchXRayVision, achieving improved out-of-distribution generalization across 4 major medical datasets (NIH ChestX-ray8, PadChest, CheXpert, MIMIC-CXR) with 12 cross-validation configurations handling 100K+ medical images.",
      "Implemented advanced computer vision pipeline with DenseNet-121 and ResNet-50 architectures for 4-class pathology classification (Cardiomegaly, Effusion, Edema, Consolidation), optimizing ROC-AUC performance through custom weighted BCE loss functions and cosine annealing scheduling with warmup periods for robust medical AI deployment.",
      "Developed production-ready MLOps infrastructure with comprehensive experiment tracking via W&B, automated checkpoint management, and quantization-aware training for CPU deployment, reducing model size by 75% while maintaining clinical-grade accuracy for resource-constrained environments.",
      "Engineered domain adaptation methodology using balanced mini-batch sampling strategy that outperformed baseline merged dataset approaches, implementing leave-one-out cross-validation across medical institutions to ensure robust generalization for real-world clinical deployment scenarios."
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

    