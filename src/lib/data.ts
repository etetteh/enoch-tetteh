
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
    techStack: ['PyTorch', 'TorchXRayVision', 'Weights & Biases', 'scikit-learn', 'NumPy', 'DenseNet-121', 'ResNet-50', 'CUDA Optimization', 'CPU Optimization', 'Model Quantization', 'Medical Imaging', 'Domain Adaptation', 'Data Augmentation'],
    githubUrl: 'https://github.com/etetteh/OoD_Gen-Chest_Xray',
    liveUrl: 'https://arxiv.org/abs/2112.13734',
  },
  {
    id: '2',
    title: 'DeepMindFlow - Production-Ready Computer Vision Classification System',
    description: "Developed a comprehensive computer vision classification system leveraging 50+ state-of-the-art models from the TIMM library with advanced training optimizations including CutMix/MixUp data augmentation, global model pruning (25% parameter reduction), and adversarial robustness through FGSM attack training. Implemented production-ready MLOps infrastructure using HuggingFace Accelerate for seamless distributed training across CPUs, GPUs, and TPUs, with automated experiment tracking via MLflow and hyperparameter optimization through Ray Tune's Population-Based Training algorithm. The system features advanced model optimization techniques including Exponential Moving Average weight updates, intelligent checkpoint averaging of top-performing models, and ONNX export for optimized inference deployment. Built comprehensive model interpretability pipeline using SHAP analysis with automated performance visualization including confusion matrices and ROC curves. Deployed FastAPI-based inference endpoints supporting both single and batch image processing with JSON configuration, enabling real-time production deployment with robust error handling and scalable architecture.",
    carouselDescription: "Engineered enterprise-grade image classification framework achieving 100% validation accuracy across 18 SOTA models with comprehensive MLOps pipeline, supporting distributed training and real-time inference deployment.",
    imageUrl: 'https://placehold.co/600x400/34A853/FFFFFF.png', // Google Green
    imageHint: 'vision system',
    techStack: ['PyTorch', 'HuggingFace Accelerate', 'TIMM', 'TorchMetrics', 'MLflow', 'Ray Tune', 'SHAP', 'ONNX', 'FastAPI', 'Python 3.10+', 'Model Pruning', 'Adversarial Training', 'CutMix/MixUp Augmentation'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Production-Ready Sentence Embedding Fine-Tuning Framework',
    carouselDescription: "Comprehensive MLOps solution for fine-tuning pre-trained sentence transformers on custom datasets, featuring parameter-efficient LoRA adaptation and intelligent hard negative mining for enhanced semantic similarity tasks.",
    description: "Built an enterprise-grade framework for fine-tuning sentence embedding models from the sentence-transformers library, supporting multiple downstream tasks including semantic similarity, classification, and information retrieval. The system features a modular architecture with automated dataset preprocessing, intelligent loss function selection based on data format, and advanced hard negative mining using FAISS for efficient similarity search. Implemented parameter-efficient fine-tuning through LoRA (Low-Rank Adaptation) integration, enabling resource-efficient training while maintaining model performance. The framework includes comprehensive configuration management via Pydantic models, supports mixed-precision training (FP16/BF16), and provides flexible evaluation metrics. Production-ready features include automated device detection (CUDA/MPS/CPU), reproducible training through seed management, configurable logging, and integration with popular ML tracking platforms like Weights & Biases and TensorBoard.",
    imageUrl: 'https://placehold.co/600x400/FBBC05/000000.png', // Google Yellow
    imageHint: 'embedding framework',
    techStack: ['PyTorch', 'Sentence-Transformers', 'Hugging Face (Transformers/Datasets/PEFT)', 'Python', 'FAISS', 'Pydantic', 'pytest', 'GitHub Actions', 'Docker', 'Mixed-Precision Training', 'LoRA adaptation'],
    githubUrl: '#', // Placeholder
    liveUrl: '#',   // Placeholder
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: ['Python (3.10+)', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Go'],
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
      'Hard Negative Mining', 'Contrastive Learning', 'Mixed-Precision Training'
    ],
  },
  {
    name: 'Data Science & Google Cloud Data',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark', 'BigQuery', 'Looker', 'Cross-Validation Techniques', 'SHAP'],
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
      'Pydantic', 'pytest', 'flake8', 'mypy', 'GitHub Actions'
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'new-chest-xray-experience',
    role: 'Lead ML/AI Engineer (Medical Imaging Research)',
    company: 'Advanced AI Research Group (Research Project)',
    period: '2021 - Present',
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
    role: 'ML Framework Architect',
    company: 'EmbedLLM Innovations (Example Company)',
    period: '2019 - 2021',
    description: [
      "Architected modular sentence embedding fine-tuning framework supporting 4 dataset formats (triplet, pair, pair-score, pair-class) with automated loss function selection, enabling parameter-efficient training via LoRA adaptation and hard negative mining for contrastive learning optimization.",
      "Implemented production-ready MLOps pipeline with comprehensive configuration management using Pydantic validation, supporting both Hugging Face Hub and local dataset integration with automated train/validation/test splitting and FP16/BF16 mixed-precision training for enhanced performance.",
      "Developed advanced hard negative mining system with FAISS-accelerated similarity search for pair datasets, incorporating configurable sampling strategies and margin-based negative selection to improve contrastive learning effectiveness by up to 2x training efficiency.",
      "Engineered robust CI/CD workflow with automated testing, linting, and type checking using pytest, flake8, mypy, and GitHub Actions, ensuring code quality standards and reproducible model training across CUDA/MPS/CPU environments."
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

    