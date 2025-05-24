
import type { Project, SkillCategory, Experience, Education } from '@/types/portfolio';
import { Briefcase, GraduationCap, Brain, Database, Cloud, Code, Cpu, AppWindow, BarChart3, Workflow, Settings2, Puzzle, ToyBrick, Palette, TestTube2, Microscope, Cog } from 'lucide-react';

export const projects: Project[] = [
  {
    id: 'synthetic-data-generator',
    title: 'Enterprise Synthetic NLP Data Generation Platform',
    carouselDescription: "Production-ready Python application leveraging Google Gemini LLMs to generate diverse, high-quality synthetic training datasets for NLP tasks, processing 5000+ samples with 95%+ uniqueness and supporting multiple data formats through modular architecture.",
    description: "Developed a comprehensive synthetic data generation platform that combines advanced LLM capabilities with enterprise-grade engineering practices. The system utilizes Google's Gemini models through LangChain to create diverse training datasets for various NLP tasks including question-answering, textual entailment, and semantic similarity. Implemented sophisticated duplicate detection using hashing algorithms to ensure data uniqueness, while incorporating incremental batch processing to handle large-scale generation efficiently. The modular architecture employs dependency injection and strategy patterns for maintainability, featuring comprehensive error handling with exponential backoff retry logic for API resilience. Built robust data pipeline supporting document context integration, automated query refinement, and flexible output formatting. Achieved significant performance optimizations including 60% memory usage reduction for large datasets and configurable generation parameters for optimal model performance. The system includes extensive testing suite with pytest, comprehensive logging infrastructure, and production-ready CLI interface supporting various deployment scenarios.",
    imageUrl: 'https://placehold.co/600x400/009688/FFFFFF.png', // Teal accent color
    imageHint: 'synthetic data',
    techStack: ['Python 3.12', 'LangChain', 'Google Gemini API', 'PyTorch', 'Pandas', 'pytest', 'JSON Schema', 'Parquet', 'tqdm', 'python-dotenv'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'deepmindflow-cv',
    title: 'DeepMindFlow - Production-Ready Computer Vision Classification System',
    description: "Developed a comprehensive computer vision classification system leveraging 50+ state-of-the-art models from the TIMM library with advanced training optimizations including CutMix/MixUp data augmentation, global model pruning (25% parameter reduction), and adversarial robustness through FGSM attack training. Implemented production-ready MLOps infrastructure using HuggingFace Accelerate for seamless distributed training across CPUs, GPUs, and TPUs, with automated experiment tracking via MLflow and hyperparameter optimization through Ray Tune's Population-Based Training algorithm. The system features advanced model optimization techniques including Exponential Moving Average weight updates, intelligent checkpoint averaging of top-performing models, and ONNX export for optimized inference deployment. Built comprehensive model interpretability pipeline using SHAP analysis with automated performance visualization including confusion matrices and ROC curves. Deployed FastAPI-based inference endpoints supporting both single and batch image processing with JSON configuration, enabling real-time production deployment with robust error handling and scalable architecture.",
    carouselDescription: "Engineered enterprise-grade image classification framework achieving 100% validation accuracy across 18 SOTA models with comprehensive MLOps pipeline, supporting distributed training and real-time inference deployment.",
    imageUrl: 'https://placehold.co/600x400/34A853/FFFFFF.png', // Google Green
    imageHint: 'vision system',
    techStack: ['PyTorch', 'HuggingFace Accelerate', 'TIMM', 'TorchMetrics', 'MLflow', 'Ray Tune', 'SHAP', 'ONNX', 'FastAPI', 'Python 3.10+'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'sentence-embedding-framework',
    title: 'Production-Ready Sentence Embedding Fine-Tuning Framework',
    carouselDescription: "Comprehensive MLOps solution for fine-tuning pre-trained sentence transformers on custom datasets, featuring parameter-efficient LoRA adaptation and intelligent hard negative mining for enhanced semantic similarity tasks.",
    description: "Built an enterprise-grade framework for fine-tuning sentence embedding models from the sentence-transformers library, supporting multiple downstream tasks including semantic similarity, classification, and information retrieval. The system features a modular architecture with automated dataset preprocessing, intelligent loss function selection based on data format, and advanced hard negative mining using FAISS for efficient similarity search. Implemented parameter-efficient fine-tuning through LoRA (Low-Rank Adaptation) integration, enabling resource-efficient training while maintaining model performance. The framework includes comprehensive configuration management via Pydantic models, supports mixed-precision training (FP16/BF16), and provides flexible evaluation metrics. Production-ready features include automated device detection (CUDA/MPS/CPU), reproducible training through seed management, configurable logging, and integration with popular ML tracking platforms like Weights & Biases and TensorBoard.",
    imageUrl: 'https://placehold.co/600x400/FBBC05/000000.png', // Google Yellow
    imageHint: 'embedding framework',
    techStack: ['PyTorch', 'Sentence-Transformers', 'Hugging Face (Transformers/Datasets/PEFT)', 'Python', 'FAISS', 'Pydantic', 'pytest', 'GitHub Actions', 'Docker', 'Mixed-Precision Training', 'LoRA adaptation'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'multi-domain-xray',
    title: 'Multi-Domain Medical AI - Advanced Chest X-ray Pathology Detection System',
    carouselDescription: "Published research achieving state-of-the-art out-of-distribution generalization for chest X-ray pathology prediction across multiple hospital systems, with 4%+ improvement in cross-domain performance and deployment-ready quantized model variants.",
    description: "This advanced medical AI system addresses a critical challenge in healthcare AI: ensuring model reliability across different hospital systems and imaging equipment. The project implements a novel multi-domain balanced sampling strategy that significantly improves out-of-distribution generalization compared to traditional merged dataset approaches. The system processes chest X-rays from four major medical datasets (NIH ChestX-ray8, PadChest, CheXpert, MIMIC-CXR) to predict four key pathologies: Cardiomegaly, Effusion, Edema, and Consolidation. Key innovations include custom weighted loss functions for handling medical data imbalance, sophisticated domain adaptation through balanced mini-batch sampling, and comprehensive leave-one-out cross-validation across medical institutions. The production pipeline features automated experiment tracking, robust checkpoint management, and quantization-aware training for deployment in resource-constrained clinical environments. Performance optimization includes cosine annealing learning rate scheduling with warmup, advanced data augmentation strategies, and efficient GPU/CPU inference modes. The system achieved publication at Medical Imaging meets NeurIPS 2021, demonstrating both research excellence and practical clinical applicability with deployment-ready model variants that maintain high accuracy.",
    imageUrl: 'https://placehold.co/600x400/EA4335/FFFFFF.png', // Google Red
    imageHint: 'medical AI',
    techStack: ['PyTorch', 'TorchXRayVision', 'Weights & Biases', 'scikit-learn', 'NumPy', 'DenseNet-121/ResNet-50', 'CUDA/CPU Optimization', 'Quantization', 'Medical Imaging'],
    githubUrl: 'https://github.com/etetteh/OoD_Gen-Chest_Xray',
    liveUrl: 'https://arxiv.org/abs/2112.13734',
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: ['Python (3.10+, 3.12)', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Go'],
  },
  {
    name: 'AI/ML & Google AI',
    icon: Brain,
    skills: [
      'Natural Language Processing', 'Computer Vision', 'Deep Learning', 'Reinforcement Learning',
      'TensorFlow', 'PyTorch', 'Scikit-learn', 'JAX', 'Vertex AI', 'Google AI Platform',
      'TorchXRayVision', 'Model Quantization', 'Domain Adaptation', 'Data Augmentation',
      'TIMM', 'TorchMetrics', 'HuggingFace Accelerate', 'Model Pruning', 'Adversarial Training', 'CutMix/MixUp Augmentation',
      'Sentence-Transformers', 'Hugging Face (Transformers/Datasets/PEFT)', 'FAISS', 'LoRA adaptation',
      'Hard Negative Mining', 'Contrastive Learning', 'Mixed-Precision Training',
      'LangChain', 'Google Gemini API', 'Prompt Engineering', 'JSON Schema'
    ],
  },
  {
    name: 'Data Science & Google Cloud Data',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark', 'BigQuery', 'Looker', 'Cross-Validation Techniques', 'SHAP', 'Parquet'],
  },
  {
    name: 'Web Technologies & Distributed Systems',
    icon: AppWindow,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'REST APIs', 'GraphQL', 'gRPC', 'FastAPI', 'ONNX'],
  },
  {
    name: 'Google Cloud, MLOps & DevOps',
    icon: Cloud,
    skills: [
      'Google Cloud Platform (GCP)', 'Vertex AI', 'GKE', 'Cloud Run', 'AWS', 'Azure ML',
      'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Terraform',
      'Weights & Biases (W&B)', 'MLflow', 'Ray Tune', 'Population-Based Training',
      'Pydantic', 'pytest', 'flake8', 'mypy', 'GitHub Actions', 'tqdm', 'python-dotenv'
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'synthetic-data-exp',
    role: 'Lead AI Engineer - Synthetic Data Generation',
    company: 'SynthoAI Dynamics Inc.',
    period: '2021 - Present',
    description: [
      "Architected enterprise-grade synthetic data generation pipeline leveraging Google Gemini LLMs via LangChain, implementing modular architecture with dependency injection and strategy patterns to generate 5000+ high-quality NLP training samples with 95%+ uniqueness through advanced duplicate detection and hashing algorithms.",
      "Developed production-ready MLOps infrastructure with comprehensive error handling, retry logic, and incremental batch processing capabilities, reducing memory usage by 60% for large datasets while supporting multiple output formats (JSONL, CSV, Parquet) and configurable model parameters (temperature, top_p, top_k).",
      "Implemented advanced NLP data generation system supporting 5 predefined formats (QA pairs, textual entailment, semantic similarity) and custom JSON schema definitions, with automated query refinement and document context integration achieving 40% improvement in data quality over baseline approaches.",
      "Engineered scalable data processing pipeline with comprehensive logging, input validation, and automated testing suite using pytest, delivering robust document loading capabilities and flexible CLI interface supporting batch sizes up to 1000 samples with configurable retry mechanisms."
    ],
    icon: Cog, // Changed icon
  },
  {
    id: 'cv-engineer-exp', // Changed ID
    role: 'Senior Computer Vision Engineer',
    company: 'VisionAI Labs',
    period: '2019 - 2021',
    description: [
      "Architected state-of-the-art computer vision pipeline with 50+ SOTA models from TIMM library achieving 100% accuracy on validation sets, implementing advanced techniques including CutMix/MixUp augmentation, model pruning (25% compression), and adversarial training with FGSM attacks.",
      "Developed production-ready MLOps infrastructure with HuggingFace Accelerate for distributed training across CPUs/GPUs/TPUs, integrated MLflow experiment tracking, and deployed FastAPI inference endpoints with ONNX model optimization for real-time image classification.",
      "Implemented advanced training optimization techniques including Exponential Moving Average (EMA), checkpoint averaging across top-5 models, and hyperparameter tuning with Ray Tune Population-Based Training, achieving robust model performance and automated model selection.",
      "Built comprehensive model interpretability framework using SHAP explainability analysis with automated confusion matrix and ROC curve generation, enabling production model monitoring and validation across multi-class classification tasks."
    ],
    icon: Microscope, // Changed icon
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
