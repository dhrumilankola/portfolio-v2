"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Updated data structure without 'image' property
interface ProjectStack {
  id: string;
  stackName: string;
  description: string;
  longDescriptionParts?: Array<{
    text: string;
    highlight?: boolean;
    className?: string;
  }>;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  category: string;
}

const CATEGORIES = ["AI & Full-Stack Applications", "Data Connectors & Tooling", "Web3 & Blockchain", "Data Science & Research"];

const projectStacks: ProjectStack[] = [
  {
    id: "study-buddy-ai",
    stackName: "Study Buddy: AI RAG Tutor",
    technologies: ["React.js", "FastAPI", "ChromaDB", "LangChain", "Gemma2:9b", "Hume AI"],
    description: "Emotionally aware learning assistant combining RAG with voice-based empathy.",
    longDescriptionParts: [
      { text: "Born at the " },
      { text: "UC Berkeley AI Hackathon", highlight: true, className: "text-orange-400 font-semibold" },
      { text: ", Study Buddy evolved from a document-aware chatbot to a " },
      { text: "fully immersive AI tutor", highlight: true, className: "text-primary font-bold" },
      { text: ". Users upload materials, trigger " },
      { text: "hybrid semantic search", highlight: true },
      { text: ", and receive streaming responses from a fine-tuned " },
      { text: "Gemma2:9b model", highlight: true, className: "text-green-400 font-semibold" },
      { text: ". I integrated " },
      { text: "Hume AI's Empathic Voice Interface", highlight: true, className: "text-purple-400 font-semibold" },
      { text: ", enabling spoken responses that adapt tone based on emotional context. Learners don't just read; they " },
      { text: "feel the explanations", highlight: true, className: "italic" },
      { text: "." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/Study-Buddy",
  },
  {
    id: "createflow",
    stackName: "CreateFlow: Multi-Agent Content Engine",
    technologies: ["LLaMA3 8B", "LangGraph", "React.js", "PostgreSQL", "LangChain"],
    description: "A multi-agent system that automates content generation and scheduling.",
    longDescriptionParts: [
      { text: "At " },
      { text: "CalHacks 11.0", highlight: true, className: "text-orange-400 font-semibold" },
      { text: ", I built a platform linking " },
      { text: "specialized AI agents", highlight: true, className: "text-primary font-bold" },
      { text: " with " },
      { text: "LangGraph", highlight: true, className: "text-sky-400 font-semibold" },
      { text: " to automate the content lifecycle. It crafts content, schedules posts with " },
      { text: "LinkedIn insights", highlight: true, className: "text-blue-400 font-semibold" },
      { text: ", and tracks metrics. I fine-tuned " },
      { text: "LLaMA3 8B", highlight: true, className: "text-green-400 font-semibold" },
      { text: " with " },
      { text: "LoRA", highlight: true },
      { text: " to ensure relevance, showing how AI agents can collaborate like a real team." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/Calhacks11_CreateFlow",
  },
  {
    id: "fillr-auto-apply",
    stackName: "Fillr: Auto Apply Jobs with AI Agents",
    technologies: ["Python", "Selenium", "Puppeteer", "Docker", "React.js", "Gemini AI"],
    description: "Intelligent engine that automates job form submissions using AI agents.",
    longDescriptionParts: [
        { text: "Fillr automates job applications using " },
        { text: "browser automation", highlight: true, className: "text-sky-400 font-semibold" },
        { text: " and AI (" },
        { text: "Gemini", highlight: true, className: "text-purple-400 font-semibold" },
        { text: ") to generate " },
        { text: "tailored answers", highlight: true },
        { text: " for open-ended questions. It includes guardrails like " },
        { text: "rate limiting and intelligent error handling", highlight: true, className: "text-orange-400" },
        { text: ". With queue management and manual review flags, Fillr combines speed and accuracy." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/HighRes_Auto",
  },
  {
    id: "pyasterix",
    stackName: "PyAsterix: Python Connector for AsterixDB",
    technologies: ["Python", "Pandas", "SQL++", "AsterixDB", "AsyncIO"],
    description: "Open-source Python driver with a DataFrame-style API for AsterixDB.",
    longDescriptionParts: [
        { text: "I built "},
        { text: "PyAsterix", highlight: true, className: "text-primary font-bold"},
        { text: ", a "},
        { text: "PEP 249-compliant", highlight: true},
        { text: " Python driver for AsterixDB. It features a low-level interface and a high-level, "},
        { text: "Pandas-like API", highlight: true, className: "text-sky-400"},
        { text: ". With "},
        { text: "async support and connection pooling", highlight: true},
        { text: ", it enables seamless interaction with AsterixDB, opening it to Python's ecosystem."}
    ],
    githubLink: "https://github.com/dhrumilankola/asterixdb-python-driver",
    category: CATEGORIES[1],
  },
  {
    id: "asterixdb-js-connector",
    stackName: "AsterixDB JavaScript Connector",
    technologies: ["JavaScript", "SQL++", "AsterixDB", "LocalForage"],
    description: "MongoDB-style interface for AsterixDB with offline-first support.",
    longDescriptionParts: [
        { text: "This connector introduces a "},
        { text: "familiar CRUD API", highlight: true, className:"text-primary font-bold"},
        { text: " for developers and a "},
        { text: "modular query builder", highlight: true},
        { text: ". It supports "},
        { text: "offline caching, queuing, and sync", highlight: true, className:"text-green-400"},
        { text: ", lowering the barrier to AsterixDB adoption in modern JS stacks."}
    ],
    githubLink: "https://github.com/dhrumilankola/asterixdb-js-connector", 
    category: CATEGORIES[1],
  },
  {
    id: "soundwave-protocol",
    stackName: "SoundWave: Decentralized Music IP",
    technologies: ["Solidity", "IPFS", "Story Protocol", "Web3", "Next.js"],
    description: "Decentralized IP platform for music, enabling transparent and programmable licensing.",
    longDescriptionParts: [
      { text: "Presented at " },
      { text: "ETHGlobal SF", highlight: true, className: "text-orange-400 font-semibold" },
      { text: ", SoundWave leverages " },
      { text: "Story Protocol", highlight: true, className: "text-sky-400 font-semibold" },
      { text: " for programmable IP licensing. Using " },
      { text: "Solidity smart contracts", highlight: true, className: "text-green-400 font-semibold" },
      { text: " and " },
      { text: "IPFS", highlight: true, className: "text-purple-400 font-semibold" },
      { text: ", it shows how Web3 can build " },
      { text: "equitable models", highlight: true, className: "italic" },
      { text: " for creative industries." }
    ],
    category: CATEGORIES[2],
    // githubLink: "https://github.com/dhrumilankola/SoundWave-Protocol",
  },
  {
    id: "guardian-ai",
    stackName: "GuardianAI: Smart Contract Auditor",
    technologies: ["LLMs", "Solidity", "Python", "AI", "Blockchain"],
    description: "LLM-powered tool to identify vulnerabilities in Solidity code.",
    longDescriptionParts: [
      { text: "GuardianAI uses " },
      { text: "LLMs", highlight: true, className: "text-primary font-bold" },
      { text: " to find " },
      { text: "vulnerabilities and gas optimizations", highlight: true, className: "text-orange-400 font-semibold" },
      { text: " in " },
      { text: "Solidity code", highlight: true },
      { text: ". By " },
      { text: "fine-tuning models on contract datasets", highlight: true, className: "text-sky-400 font-semibold" },
      { text: ", it acts as an intelligent assistant for static analysis, improving " },
      { text: "code security and efficiency", highlight: true },
      { text: " and contributing to safer Web3 tooling." }
    ],
    category: CATEGORIES[2],
    // githubLink: "https://github.com/dhrumilankola/GuardianAI",
  },
  {
    id: "insure-search",
    stackName: "InsureSearch: AI Insurance Assistant",
    technologies: ["Next.js", "Flask", "Llama3", "Together.ai", "LlamaIndex", "Python", "React"],
    description: "AI-powered chatbot to help university students navigate and comprehend complex insurance documents.",
    longDescriptionParts: [
        { text: "Built for the "},
        { text: "Llama 3 Hackathon", highlight: true, className: "text-orange-400 font-semibold"},
        { text: ", InsureSearch is an AI assistant that helps students understand complex insurance policies. It supports both default university documents and user-uploaded files, using "},
        { text: "Llama3 and advanced NLP", highlight: true, className: "text-primary font-bold"},
        { text: " to deliver precise, document-based responses. The solution is especially helpful for international students and demonstrates versatile applications in law and finance."}
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/InsureSearch-AI-Insurance-Assistant",
  },
  {
    id: "prrp-graph-partitioning",
    stackName: "PRRP Graph Partitioning",
    technologies: ["Python", "Graph Theory", "Statistical Analysis", "Spatial Data"],
    description: "A novel module for implementing the PRRP algorithm in graph data structures, extending spatial regionalization methodologies.",
    longDescriptionParts: [
        { text: "A reimplementation and extension of spatial regionalization methodologies, this project introduces a novel module for the "},
        { text: "P-Regionalization through Recursive Partitioning (PRRP)", highlight: true, className: "text-primary font-bold"},
        { text: " algorithm, applied to "},
        { text: "graph data structures", highlight: true, className: "text-sky-400 font-semibold"},
        { text: ". It explores "},
        { text: "statistical inference for spatial regionalization", highlight: true},
        { text: ", tackling the NP-hard challenge of clustering spatial areas into contiguous regions. The implementation showcases PRRP's versatility in both spatial and graph-based representations."}
    ],
    category: CATEGORIES[3],
    githubLink: "https://github.com/sreekar9601/graph-partitioning-prrp",
  }
];

const gradientColors = [
  "from-violet-500 to-purple-500",
  "from-sky-500 to-indigo-500",
  "from-green-400 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-fuchsia-500 to-pink-500",
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  },
};

const ProjectCard = ({ project, index }: { project: ProjectStack, index: number }) => {
  const gradient = gradientColors[index % gradientColors.length];

  return (
    <motion.div 
      variants={cardVariants}
      className="relative group overflow-hidden rounded-2xl bg-card/50 backdrop-blur-lg border border-border/20"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)"
      }}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-500 ease-in-out`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {project.stackName}
          </h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="text-muted-foreground text-sm mb-6 flex-grow">
          {project.longDescriptionParts ? (
            <p>
              {project.longDescriptionParts.map((part, idx) => (
                <span key={idx} className={`${part.highlight ? (part.className || 'font-semibold text-foreground') : ''}`}>
                  {part.text}
                </span>
              ))}
            </p>
          ) : project.description }
        </div>

        <div className="flex gap-4 mt-auto">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
               className="flex-1 text-center font-semibold py-3 px-4 rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white hover:opacity-90 transition-opacity">
              <FaGithub className="inline mr-2" /> GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" 
               className="flex-1 text-center font-semibold py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity">
               <FaExternalLinkAlt className="inline mr-2" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const filteredProjects = projectStacks.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My Stacks & Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A selection of projects that showcase my passion for building modern applications and tools.
          </p>
        </motion.div>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12 md:mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-full transition-colors duration-300
                ${selectedCategory === category ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategory === category && (
                <motion.div 
                  className="absolute inset-0 bg-primary rounded-full"
                  layoutId="active-category-pill"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
