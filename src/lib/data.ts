
import type { Project, SkillCategory, Experience, Education, Publication, Certification } from '@/types/portfolio';
import { Briefcase, GraduationCap, Brain, Database, Cloud, Code, Cpu, AppWindow, BarChart3, Workflow, Settings2, Puzzle, ToyBrick, Palette, TestTube2, Microscope, Cog, FileText, MessageCircle, Award, ShieldCheck, VideoIcon } from 'lucide-react';

export const projects: Project[] = [
  {
    id: 'synthetic-data-generator',
    title: 'Enterprise Synthetic NLP Data Generation Platform',
    carouselDescription: "Production-ready Python application leveraging Google Gemini LLMs to generate diverse, high-quality synthetic training datasets for NLP tasks, processing 5000+ samples with 95%+ uniqueness and supporting multiple data formats through modular architecture.",
    keyAchievement: "Generated over 5,000 unique synthetic NLP training samples with 95%+ uniqueness, boosting model training efficiency.",
    description: "Developed a comprehensive synthetic data generation platform that combines advanced LLM capabilities with enterprise-grade engineering practices. The system utilizes Google's Gemini models through LangChain to create diverse training datasets for various NLP tasks including question-answering, textual entailment, and semantic similarity. Implemented sophisticated duplicate detection using hashing algorithms to ensure data uniqueness, while incorporating incremental batch processing to handle large-scale generation efficiently. The modular architecture employs dependency injection and strategy patterns for maintainability, featuring comprehensive error handling with exponential backoff retry logic for API resilience. Built robust data pipeline supporting document context integration, automated query refinement, and flexible output formatting. Achieved significant performance optimizations including 60% memory usage reduction for large datasets and configurable generation parameters for optimal model performance. The system includes extensive testing suite with pytest, comprehensive logging infrastructure, and production-ready CLI interface supporting various deployment scenarios.",
    imageUrl: 'https://placehold.co/600x400/009688/FFFFFF.png', // Teal (accent)
    imageHint: 'synthetic data',
    techStack: ['Python', 'LangChain', 'Google Gemini API', 'PyTorch', 'Pandas', 'pytest', 'Parquet'],
    githubUrl: 'https://github.com/etetteh/synthetic-data-generator',
    liveUrl: '#',
  },
  {
    id: 'deepmindflow-cv',
    title: 'DeepMindFlow - Production-Ready Computer Vision Classification System',
    carouselDescription: "Engineered enterprise-grade image classification framework achieving 100% validation accuracy across 18 SOTA models with comprehensive MLOps pipeline, supporting distributed training and real-time inference deployment.",
    keyAchievement: "Achieved 100% validation accuracy with 18 SOTA models and reduced model size by 25% via pruning.",
    description: "Developed a comprehensive computer vision classification system leveraging 50+ state-of-the-art models from the TIMM library with advanced training optimizations including CutMix/MixUp data augmentation, global model pruning (25% parameter reduction), and adversarial robustness through FGSM attack training. Implemented production-ready MLOps infrastructure using HuggingFace Accelerate for seamless distributed training across CPUs, GPUs, and TPUs, with automated experiment tracking via MLflow and hyperparameter optimization through Ray Tune's Population-Based Training algorithm. The system features advanced model optimization techniques including Exponential Moving Average weight updates, intelligent checkpoint averaging of top-performing models, and ONNX export for optimized inference deployment. Built comprehensive model interpretability pipeline using SHAP analysis with automated performance visualization including confusion matrices and ROC curves. Deployed FastAPI-based inference endpoints supporting both single and batch image processing with JSON configuration, enabling real-time production deployment with robust error handling and scalable architecture.",
    imageUrl: 'https://placehold.co/600x400/4285F4/FFFFFF.png', // Primary Blue
    imageHint: 'vision system',
    techStack: ['PyTorch', 'HuggingFace Accelerate', 'TIMM', 'TorchMetrics', 'MLflow', 'Ray Tune', 'SHAP', 'ONNX', 'FastAPI', 'Python'],
    githubUrl: 'https://github.com/etetteh/e/tree/main/deepmindflow/image_classification',
    liveUrl: '#',
  },
  {
    id: 'sentence-embedding-framework',
    title: 'Production-Ready Sentence Embedding Fine-Tuning Framework',
    carouselDescription: "Comprehensive MLOps solution for fine-tuning pre-trained sentence transformers on custom datasets, featuring parameter-efficient LoRA adaptation and intelligent hard negative mining for enhanced semantic similarity tasks.",
    keyAchievement: "Improved contrastive learning effectiveness by up to 2x in training efficiency using FAISS-accelerated hard negative mining.",
    description: "Built an enterprise-grade framework for fine-tuning sentence embedding models from the sentence-transformers library, supporting multiple downstream tasks including semantic similarity, classification, and information retrieval. The system features a modular architecture with automated dataset preprocessing, intelligent loss function selection based on data format, and advanced hard negative mining using FAISS for efficient similarity search. Implemented parameter-efficient fine-tuning through LoRA (Low-Rank Adaptation) integration, enabling resource-efficient training while maintaining model performance. The framework includes comprehensive configuration management via Pydantic models, supports mixed-precision training (FP16/BF16), and provides flexible evaluation metrics. Production-ready features include automated device detection (CUDA/MPS/CPU), reproducible training through seed management, configurable logging, and integration with popular ML tracking platforms like Weights & Biases and TensorBoard.",
    imageUrl: 'https://placehold.co/600x400/FBBC05/000000.png', // Chart 3 (Google Yellow)
    imageHint: 'embedding framework',
    techStack: ['PyTorch', 'Sentence-Transformers', 'Hugging Face (Transformers/Datasets/PEFT)', 'Python', 'FAISS', 'Pydantic', 'pytest', 'GitHub Actions', 'Docker', 'Mixed-Precision Training', 'LoRA adaptation'],
    githubUrl: 'https://github.com/etetteh/finetune-embedding',
    liveUrl: '#',
  },
  {
    id: 'multi-domain-xray',
    title: 'Multi-Domain Medical AI - Advanced Chest X-ray Pathology Detection System',
    carouselDescription: "Published research achieving state-of-the-art out-of-distribution generalization for chest X-ray pathology prediction across multiple hospital systems, with 4%+ improvement in cross-domain performance and deployment-ready quantized model variants.",
    keyAchievement: "Improved out-of-distribution generalization by over 4% for chest X-ray pathology prediction, published at Med-NeurIPS 2021.",
    description: "This advanced medical AI system addresses a critical challenge in healthcare AI: ensuring model reliability across different hospital systems and imaging equipment. The project implements a novel multi-domain balanced sampling strategy that significantly improves out-of-distribution generalization compared to traditional merged dataset approaches. The system processes chest X-rays from four major medical datasets (NIH ChestX-ray8, PadChest, CheXpert, MIMIC-CXR) to predict four key pathologies: Cardiomegaly, Effusion, Edema, and Consolidation. Key innovations include custom weighted loss functions for handling medical data imbalance, sophisticated domain adaptation through balanced mini-batch sampling, and comprehensive leave-one-out cross-validation across medical institutions. The production pipeline features automated experiment tracking, robust checkpoint management, and quantization-aware training for deployment in resource-constrained clinical environments. Performance optimization includes cosine annealing learning rate scheduling with warmup, advanced data augmentation strategies, and efficient GPU/CPU inference modes. The system achieved publication at Medical Imaging meets NeurIPS 2021, demonstrating both research excellence and practical clinical applicability with deployment-ready model variants that maintain high accuracy.",
    imageUrl: 'https://placehold.co/600x400/EA4335/FFFFFF.png', // Chart 2 (Google Red)
    imageHint: 'medical AI',
    techStack: ['PyTorch', 'TorchXRayVision', 'Weights & Biases', 'scikit-learn', 'NumPy', 'CUDA/CPU Optimization', 'Model Quantization', 'Domain Adaptation', 'Data Augmentation', 'Medical Imaging'],
    githubUrl: 'https://github.com/etetteh/OoD_Gen-Chest_Xray',
    liveUrl: 'https://arxiv.org/abs/2112.13734',
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'AI/ML & Generative AI',
    icon: Brain,
    skills: [
      'Natural Language Processing', 'Computer Vision', 'Deep Learning',
      'PyTorch', 'Scikit-learn', 'Vertex AI', 'Google AI Platform',
      'TorchXRayVision', 'Model Quantization', 'Domain Adaptation', 'Data Augmentation',
      'TIMM', 'TorchMetrics', 'HuggingFace Accelerate', 'Model Pruning', 'Adversarial Training', 'CutMix/MixUp Augmentation',
      'Sentence-Transformers', 'Hugging Face (Transformers/Datasets/PEFT)', 'FAISS', 'LoRA adaptation',
      'Hard Negative Mining', 'Mixed-Precision Training',
      'LangChain', 'Google Gemini API', 'Prompt Engineering',
    ],
  },
  {
    name: 'Data Science & Analytics',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark', 'BigQuery', 'Looker', 'Cross-Validation Techniques', 'SHAP', 'Parquet'],
  },
  {
    name: 'Web Technologies & Distributed Systems',
    icon: AppWindow,
    skills: ['React', 'Next.js', 'Node.js', 'Flask', 'REST APIs', 'FastAPI', 'ONNX'],
  },
  {
    name: 'Cloud, MLOps & DevOps',
    icon: Cloud,
    skills: [
      'Google Cloud Platform (GCP)', 'Vertex AI', 'GKE', 'Cloud Run',
      'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Terraform', 'LLMOps',
      'Weights & Biases (W&B)', 'MLflow', 'Ray Tune', 'Population-Based Training',
      'Pydantic', 'pytest', 'flake8', 'mypy', 'GitHub Actions',
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'synthetic-data-exp',
    role: 'Generative AI Engineer | End-to-End Synthetic Data Generation',
    company: 'Freelance',
    period: '2025',
    description: [
      "Architected enterprise-grade synthetic data generation pipeline leveraging Google Gemini LLMs via LangChain, implementing modular architecture with dependency injection and strategy patterns to generate 5000+ high-quality NLP training samples with 95%+ uniqueness through advanced duplicate detection and hashing algorithms.",
      "Developed production-ready MLOps infrastructure with comprehensive error handling, retry logic, and incremental batch processing capabilities, reducing memory usage by 60% for large datasets while supporting multiple output formats (JSONL, CSV, Parquet) and configurable model parameters (temperature, top_p, top_k).",
      "Implemented advanced NLP data generation system supporting 5 predefined formats (QA pairs, textual entailment, semantic similarity) and custom JSON schema definitions, with automated query refinement and document context integration achieving 40% improvement in data quality over baseline approaches.",
      "Engineered scalable data processing pipeline with comprehensive logging, input validation, and automated testing suite using pytest, delivering robust document loading capabilities and flexible CLI interface supporting batch sizes up to 1000 samples with configurable retry mechanisms."
    ],
    icon: ToyBrick,
  },
  {
    id: 'ml-framework-architect-exp',
    role: 'Generative AI Engineer | End-to-End Embedding Model Fine-tuning',
    company: 'Freelance',
    period: '2025',
    description: [
      "Architected modular sentence embedding fine-tuning framework supporting 4 dataset formats (triplet, pair, pair-score, pair-class) with automated loss function selection, enabling parameter-efficient training via LoRA adaptation and hard negative mining for contrastive learning optimization.",
      "Implemented production-ready MLOps pipeline with comprehensive configuration management using Pydantic validation, supporting both Hugging Face Hub and local dataset integration with automated train/validation/test splitting and FP16/BF16 mixed-precision training for enhanced performance.",
      "Developed advanced hard negative mining system with FAISS-accelerated similarity search for pair datasets, incorporating configurable sampling strategies and margin-based negative selection to improve contrastive learning effectiveness by up to 2x training efficiency.",
      "Engineered robust CI/CD workflow with automated testing, linting, and type checking using pytest, flake8, mypy, and GitHub Actions, ensuring code quality standards and reproducible model training across CUDA/MPS/CPU environments."
    ],
    icon: Palette,
  },
  {
    id: 'xray-ood-exp',
    role: 'Deep Learning Research Engineer | OOD Medical Image Classification',
    company: 'Mila - Quebec Artificial Intelligence Institute',
    period: '2020 - 2019',
    description: [
      "Architected multi-domain balanced sampling framework for chest X-ray pathology prediction using PyTorch and TorchXRayVision, achieving improved out-of-distribution generalization across 4 major medical datasets (NIH ChestX-ray8, PadChest, CheXpert, MIMIC-CXR) with 12 cross-validation configurations handling 100K+ medical images.",
      "Implemented advanced computer vision pipeline with DenseNet-121 and ResNet-50 architectures for 4-class pathology classification (Cardiomegaly, Effusion, Edema, Consolidation), optimizing ROC-AUC performance through custom weighted BCE loss functions and cosine annealing scheduling with warmup periods for robust medical AI deployment.",
      "Developed production-ready MLOps infrastructure with comprehensive experiment tracking via W&B, automated checkpoint management, and quantization-aware training for CPU deployment, reducing model size by 75% while maintaining clinical-grade accuracy for resource-constrained environments.",
      "Engineered domain adaptation methodology using balanced mini-batch sampling strategy that outperformed baseline merged dataset approaches, implementing leave-one-out cross-validation across medical institutions to ensure robust generalization for real-world clinical deployment scenarios."
    ],
    icon: Microscope,
  },
  {
    id: 'cv-framework-architect-exp',
    role: 'Senior Computer Vision Engineer | End-to-End Image Classification',
    company: 'Freelance',
    period: '2023',
    description: [
      "Architected state-of-the-art computer vision pipeline with 50+ SOTA models from TIMM library achieving 100% accuracy on validation sets, implementing advanced techniques including CutMix/MixUp augmentation, model pruning (25% compression), and adversarial training with FGSM attacks.",
      "Developed production-ready MLOps infrastructure with HuggingFace Accelerate for distributed training across CPUs/GPUs/TPUs, integrated MLflow experiment tracking, and deployed FastAPI inference endpoints with ONNX model optimization for real-time image classification.",
      "Implemented advanced training optimization techniques including Exponential Moving Average (EMA), checkpoint averaging across top-5 models, and hyperparameter tuning with Ray Tune Population-Based Training, achieving robust model performance and automated model selection.",
      "Built comprehensive model interpretability framework using SHAP explainability analysis with automated confusion matrix and ROC curve generation, enabling production model monitoring and validation across multi-class classification tasks."
    ],
    icon: Settings2,
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: "Master's Degree in Machine Intelligence",
    institution: 'African Institute for Mathematical Sciences, Rwanda',
    period: '2018 - 2019',
    description: [
      "African Masters in Machine Intelligence (AMMI). Major Courses: Machine Learning, Deep Learning, Reinforcement Learning.",
      "Thesis: Out-of-Distribution Generalization of Chest Pathologies Prediction."
    ],
    icon: GraduationCap,
  },
  {
    id: '2',
    degree: "Bachelor's Degree in Mathematics",
    institution: 'Kwame Nkrumah University of Science and Technology (KNUST), Ghana',
    period: '2012 - 2016',
    description: [
      "Bachelor of Science Mathematics. Minor Courses: Micro & Macro Economics, DBMS with Microsoft Access.",
      "Thesis: Function Approximation Using Artificial Neural Networks."
    ],
    icon: GraduationCap,
  },
];

export const publications: Publication[] = [
  {
    id: 'med-neurips-2021',
    title: 'Multi-Domain Balanced Sampling Improves Out-of-Distribution Generalization of Chest X-ray Pathology Prediction Models.',
    authors: 'E. Tetteh, J. Viviano, Y. Bengio, D. Krueger, J.P. Cohen',
    conference: 'Medical Imaging meets NeurIPS (Med-NeurIPS 2021)',
    githubUrl: 'https://github.com/etetteh/OoD_Gen-Chest_Xray',
    paperUrl: 'https://arxiv.org/abs/2112.13734',
    icon: FileText,
  },
];

export const certifications: Certification[] = [
  {
    id: 'gcp-mlops-genai',
    title: 'Machine Learning Operations (MLOps) for Generative AI',
    issuer: 'Google Cloud Skills Boost',
    dateObtained: 'April 13, 2025',
    credentialUrl: 'https://www.cloudskillsboost.google/public_profiles/3b19899c-db1e-4ec3-8c3e-8e14502b1c8f/badges/14840035',
    icon: ShieldCheck,
  },
];


export const portfolioOwner = {
  name: "Enoch Tetteh",
  title: "Innovative AI Engineer & MLOps Expert",
  bio: "Proven AI/ML Engineer adept at transforming complex challenges into impactful, enterprise-grade solutions across NLP, Computer Vision, and Generative AI. My expertise in MLOps, advanced model optimization (LoRA, quantization, pruning), and cutting-edge tools like Google Gemini & LangChain consistently drives tangible results: from 75% model size reductions and 40% data quality boosts to pioneering out-of-distribution generalization for critical, large-scale systems. I build AI that delivers.",
  contactEmail: "enoch.tetteh.2099@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/enoch-tetteh-80450211a",
  githubUrl: "https://github.com/etetteh",
};

    
