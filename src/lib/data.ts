import type { Project, SkillCategory, Experience, Education } from '@/types/portfolio';
import { Briefcase, GraduationCap, Lightbulb, Sparkles, Brain, Bot, Database, Cloud, Users, Code } from 'lucide-react';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Intelligent Document Analyzer',
    description: 'An AI-powered tool to extract key information and insights from various document types, improving data processing efficiency by 40%.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'document analysis',
    techStack: ['Python', 'NLP', 'OpenCV', 'TensorFlow', 'React'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Predictive Maintenance System',
    description: 'Developed a machine learning model to predict equipment failures, reducing downtime and maintenance costs for industrial clients.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'industrial machinery',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'AWS SageMaker', 'Grafana'],
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Personalized Recommendation Engine',
    description: 'Built a recommendation system for an e-commerce platform, increasing user engagement and sales through tailored suggestions.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'online shopping',
    techStack: ['Collaborative Filtering', 'Matrix Factorization', 'Spark MLlib', 'Next.js'],
    liveUrl: '#',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
  },
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    skills: ['Natural Language Processing', 'Computer Vision', 'Deep Learning', 'Reinforcement Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
  },
  {
    name: 'Data Science & Analytics',
    icon: Database,
    skills: ['Data Mining', 'Statistical Analysis', 'Data Visualization (Tableau, PowerBI)', 'Pandas', 'NumPy', 'Spark'],
  },
  {
    name: 'Web Technologies',
    icon: Users,
    skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS (SageMaker, EC2, S3)', 'Azure ML', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior AI Engineer',
    company: 'Innovatech Solutions',
    period: '2021 - Present',
    description: [
      'Led development of AI-driven products from conception to deployment, resulting in new revenue streams.',
      'Mentored junior engineers and contributed to best practices in machine learning model development and deployment.',
      'Collaborated with cross-functional teams to integrate AI capabilities into existing platforms.',
    ],
    icon: Briefcase,
  },
  {
    id: '2',
    role: 'Machine Learning Researcher',
    company: 'Tech Forward Labs',
    period: '2019 - 2021',
    description: [
      'Conducted research on cutting-edge NLP techniques, publishing findings in top-tier conferences.',
      'Developed novel algorithms for text summarization and sentiment analysis.',
      'Built and evaluated proof-of-concept models for various industry applications.',
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
    description: 'Specialized in Deep Learning and Natural Language Processing. Thesis on "Advanced Techniques for Neural Machine Translation".',
    icon: GraduationCap,
  },
  {
    id: '2',
    degree: 'B.S. in Computer Science',
    institution: 'Massachusetts Institute of Technology (MIT)',
    period: '2013 - 2017',
    description: 'Graduated with honors. Focus on algorithms and software development. Capstone project on "AI-Powered Chess Engine".',
    icon: GraduationCap,
  },
];

export const portfolioOwner = {
  name: "Alex Johnson",
  title: "AI Solutions Architect & Innovator",
  bio: "Passionate about leveraging artificial intelligence to solve complex problems and drive business value. With a strong foundation in machine learning, data science, and software engineering, I specialize in developing and deploying innovative AI solutions across various industries. My goal is to transform data into actionable insights and create intelligent systems that make a tangible impact.",
  contactEmail: "alex.johnson.ai@example.com",
  linkedinUrl: "https://www.linkedin.com/in/example",
  githubUrl: "https://github.com/example",
};
