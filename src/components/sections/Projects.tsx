"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// New data structure for stack-based projects
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

const CATEGORIES = ["AI & Full-Stack Applications", "Data Connectors & Tooling"];

const projectStacks: ProjectStack[] = [
  {
    id: "study-buddy-ai",
    stackName: "Study Buddy: AI-Powered RAG Tutor with Empathetic Voice",
    technologies: ["React.js", "FastAPI", "ChromaDB", "LangChain", "Gemma2:9b", "Hume AI", "Tailwind", "Vite", "Pandas"],
    description: "Built an emotionally aware learning assistant that combines Retrieval-Augmented Generation with voice-based empathy for personalized education.",
    longDescriptionParts: [
      { text: "Born at the " },
      { text: "UC Berkeley AI Hackathon", highlight: true, className: "text-orange-400 font-semibold" },
      { text: ", Study Buddy began as a " },
      { text: "document-aware chatbot", highlight: true, className: "text-sky-400 font-semibold" }, 
      { text: " and evolved into a " },
      { text: "fully immersive AI tutor", highlight: true, className: "text-primary font-bold" },
      { text: ". Users can upload study materials, trigger " },
      { text: "hybrid semantic search", highlight: true },
      { text: ", and receive " },
      { text: "streaming responses", highlight: true },
      { text: " powered by a fine-tuned " },
      { text: "Gemma2:9b model", highlight: true, className: "text-green-400 font-semibold" },
      { text: ". To enhance engagement, I integrated " },
      { text: "Hume AI's Empathic Voice Interface", highlight: true, className: "text-purple-400 font-semibold" },
      { text: " — enabling spoken responses that " },
      { text: "adapt tone and expression", highlight: true },
      { text: " based on the content's " },
      { text: "emotional context", highlight: true },
      { text: ". Learners not only read, but " },
      { text: "feel the explanations", highlight: true, className: "italic" },
      { text: ". This project embodies my drive to blend " },
      { text: "cutting-edge AI", highlight: true },
      { text: " with " },
      { text: "deeply human learning experiences", highlight: true, className: "italic" },
      { text: "." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/Study-Buddy",
  },
  {
    id: "createflow",
    stackName: "CreateFlow: Multi-Agent Content Engine",
    technologies: ["LLaMA3 8B", "LangGraph", "React.js", "PostgreSQL", "LangChain", "LinkedIn API"],
    description: "Designed a multi-agent system that automates content generation, scheduling, and engagement analysis in one intelligent flow.",
    longDescriptionParts: [
      { text: "At " },
      { text: "CalHacks 11.0", highlight: true, className: "text-orange-400 font-semibold" },
      { text: ", I built CreateFlow — a platform that links " },
      { text: "specialized AI agents", highlight: true, className: "text-primary font-bold" },
      { text: " using " },
      { text: "LangGraph", highlight: true, className: "text-sky-400 font-semibold" },
      { text: " to automate the " },
      { text: "content lifecycle for professionals", highlight: true },
      { text: ". Each agent handles a unique task: one crafts " },
      { text: "personalized content", highlight: true },
      { text: ", another schedules optimal posting times using " },
      { text: "LinkedIn insights", highlight: true, className: "text-blue-400 font-semibold" },
      { text: ", and another tracks " },
      { text: "engagement metrics", highlight: true },
      { text: ". I fine-tuned " },
      { text: "LLaMA3 8B", highlight: true, className: "text-green-400 font-semibold" },
      { text: " using " },
      { text: "LoRA and 4-bit quantization", highlight: true },
      { text: " to ensure responsiveness and relevance, especially in predicting " },
      { text: "content performance", highlight: true },
      { text: ". This project reflects how AI agents can " },
      { text: "collaborate like a real team", highlight: true, className: "italic" },
      { text: " — enhancing creativity, speed, and decision-making." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/Calhacks11_CreateFlow",
  },
  {
    id: "fillr-auto-apply",
    stackName: "Fillr: Auto Apply Jobs with AI Agents",
    technologies: ["Python", "Selenium", "Puppeteer", "Docker", "React.js", "Gemini AI", "Queue Systems"],
    description: "Built an intelligent job application engine that automates job form submissions using AI agents and smart browser automation.",
    longDescriptionParts: [
      { text: "Fillr was born from personal frustration — filling out the same job forms again and again. I built this system to change that. It " },
      { text: "automatically detects, fills, and submits application forms", highlight: true, className: "text-primary font-bold" },
      { text: " across job platforms using " },
      { text: "browser automation", highlight: true, className: "text-sky-400 font-semibold" },
      { text: ". But it's more than a bot — it uses AI (" },
      { text: "Gemini", highlight: true, className: "text-purple-400 font-semibold" },
      { text: ") to generate " },
      { text: "tailored answers for open-ended questions", highlight: true },
      { text: " and includes guardrails like " },
      { text: "rate limiting, spam prevention, and intelligent error handling", highlight: true, className: "text-orange-400" },
      { text: ". With " },
      { text: "queue management, screenshot proof, and manual review flags", highlight: true },
      { text: ", Fillr combines speed, accuracy, and oversight — offering a " },
      { text: "serious upgrade to the modern job search experience", highlight: true, className: "italic" },
      { text: "." },
    ],
    category: CATEGORIES[0],
    githubLink: "https://github.com/dhrumilankola/HighRes_Auto",
  },
  {
    id: "pyasterix",
    stackName: "PyAsterix: Python Connector for AsterixDB",
    technologies: ["Python", "Pandas", "SQL++", "AsterixDB", "AsyncIO"],
    description: "Bridged Python and AsterixDB with an open-source driver and DataFrame-style API for modern big data workflows.",
    longDescriptionParts: [
        { text: "As part of my Master's research, I designed and built "},
        { text: "PyAsterix", highlight: true, className: "text-primary font-bold"},
        { text: " — a "},
        { text: "PEP 249-compliant", highlight: true},
        { text: " Python driver for AsterixDB. It features both a low-level cursor interface and a high-level, "},
        { text: "Pandas-like API", highlight: true, className: "text-sky-400"},
        { text: " for intuitive, scalable querying of NoSQL data. With built-in "},
        { text: "async support, connection pooling, and native data type handling", highlight: true},
        { text: ", PyAsterix enables analysts and engineers to interact with AsterixDB as naturally as they would with SQL or Pandas — opening up the database to Python's vast ecosystem."}
    ],
    githubLink: "https://github.com/dhrumilankola/asterixdb-python-driver",
    category: CATEGORIES[1],
  },
  {
    id: "asterixdb-js-connector",
    stackName: "AsterixDB JavaScript Connector",
    technologies: ["JavaScript (Node.js)", "SQL++", "AsterixDB", "Offline Storage (LocalForage)", "Event-Driven Architecture"],
    description: "Created a developer-friendly, MongoDB-style interface for AsterixDB with offline-first support and fluent SQL++ query building.",
    longDescriptionParts: [
        { text: "After completing the Python version, I brought the same power to JavaScript. This connector introduces a "},
        { text: "familiar CRUD API", highlight: true, className:"text-primary font-bold"},
        { text: " for developers, supports raw SQL++ execution, and includes a "},
        { text: "modular query builder", highlight: true},
        { text: ". It's also built for resilience — supporting "},
        { text: "offline caching, queuing, and sync", highlight: true, className:"text-green-400"},
        { text: ", all tested in real-world Node.js environments. This project lowers the barrier to AsterixDB adoption in modern JS stacks and offline-capable apps."}
    ],
    githubLink: "https://github.com/dhrumilankola/asterixdb-js-connector", 
    category: CATEGORIES[1],
  },
];

// Animation variants (can be defined once and reused)
const carouselVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
};

const animatedTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
};

const animatedWordVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
};

// Internal component for rendering a single category's carousel
const ProjectCategoryCarousel = ({ projects, categoryTitle }: { projects: ProjectStack[], categoryTitle: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]); // Page state for AnimatePresence key

  if (projects.length === 0) {
    return (
      <motion.div 
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        className="text-center text-muted-foreground py-10 mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">{categoryTitle}</h3>
        <p className="text-lg">No projects in this category yet. Check back soon!</p>
      </motion.div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };
  
  const currentProject = projects[currentIndex];

  // Paginate function for this specific carousel instance
  const paginate = (newDirection: number) => {
    // Update page state for AnimatePresence to correctly trigger enter/exit based on current index
    // The 'page' can simply be the target index for simplicity if direction is handled for variants
    if (newDirection > 0) {
      setPage([currentIndex + 1, newDirection]); // Next page and direction
      handleNext();
    } else {
      setPage([currentIndex - 1 + projects.length, newDirection]); // Prev page and direction
      handlePrev();
    }
  };

  const goToProject = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    // Update page state for AnimatePresence: target index and direction
    setPage([index, newDirection]);
    setCurrentIndex(index);
  };

  const SWIPE_THRESHOLD = 30; // Min drag distance in pixels to trigger a swipe
  const SWIPE_VELOCITY_THRESHOLD = 0.3; // Min velocity to trigger a swipe

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number; }; velocity: { x: number; y: number; }; }) => {
    const { offset, velocity } = info;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -SWIPE_THRESHOLD * SWIPE_VELOCITY_THRESHOLD * 100) { // Adjusted threshold combination
      paginate(1); // Swipe left, go next
    } else if (swipePower > SWIPE_THRESHOLD * SWIPE_VELOCITY_THRESHOLD * 100) {
      paginate(-1); // Swipe right, go prev
    } else {
      // If not a strong swipe, check offset for a gentle drag
      if (offset.x < -SWIPE_THRESHOLD) {
        paginate(1);
      } else if (offset.x > SWIPE_THRESHOLD) {
        paginate(-1);
      }
    }
  };

  return (
    <div className="mb-16"> {/* Spacing between categories */}
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl md:text-3xl font-semibold mb-8 text-center text-primary"
      >
        {categoryTitle}
      </motion.h3>
      
      <div className="relative flex flex-col items-center max-w-3xl mx-auto">
        {/* Carousel Navigation Buttons (only if more than one project) */}
        {projects.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-3 rounded-full shadow-lg z-20 transition-colors duration-300"
              aria-label={`Previous Project in ${categoryTitle}`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-3 rounded-full shadow-lg z-20 transition-colors duration-300"
              aria-label={`Next Project in ${categoryTitle}`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${categoryTitle}-${page}`} 
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            dragElastic={0.1} // Makes it feel a bit more constrained
            // style={{ touchAction: "pan-y" }} // Add if swipe interferes with page scroll
            className="w-full bg-card rounded-xl shadow-2xl border border-border overflow-hidden p-8 md:p-12 flex flex-col items-center text-center"
            style={{ minHeight: '480px' }} // Ensure consistent height
          >
            {/* Stack Name */}
            <motion.h3 
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0, transition:{delay:0.2, duration:0.4} }}
              className="text-2xl md:text-3xl font-bold text-primary mb-4"
            >
              {currentProject.stackName}
            </motion.h3>

            {/* Technologies */}
            <motion.div 
              initial={{ opacity:0 }} animate={{ opacity:1, transition:{delay:0.3, duration:0.4} }}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              {currentProject.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity:0, scale:0.8 }}
                  animate={{ opacity:1, scale:1, transition:{delay:0.4 + currentProject.technologies.indexOf(tech) * 0.05} }}
                  whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--primary) / 0.2)"}}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium cursor-default transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Interactive Description Area */}
            <motion.div layout className="mb-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl w-full">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentProject.longDescriptionParts ? (
                  <motion.span
                    key={`${currentProject.id}-long-desc`}
                    variants={animatedTextContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="block"
                  >
                    {currentProject.longDescriptionParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        variants={animatedWordVariants}
                        className={`inline ${part.highlight ? (part.className || 'font-semibold text-foreground') : ''}`}
                      >
                        {part.text}
                      </motion.span>
                    ))}
                  </motion.span>
                ) : (
                  currentProject.description // Fallback if longDescriptionParts isn't available
                )}
              </p>
            </motion.div>

            {/* Links */}
            {(currentProject.githubLink || currentProject.liveLink) && (
              <motion.div 
                initial={{ opacity:0, y:10 }} 
                animate={{ opacity:1, y:0, transition:{delay:0.8, duration:0.4} }} // Adjusted delay
                className="flex gap-4 mt-auto pt-4 border-t border-border/20 w-full justify-center"
              >
                {currentProject.githubLink && (
                  <a
                    href={currentProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg border border-border hover:border-primary bg-background hover:bg-primary/5"
                  >
                    <FaGithub size={18} />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
                {currentProject.liveLink && (
                  <a
                    href={currentProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg border border-border hover:border-primary bg-background hover:bg-primary/5"
                  >
                    <FaExternalLinkAlt size={18} />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots for navigation (only if more than one project) */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => {
              const dotClassName = `w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50"
              }`;
              return (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={dotClassName}
                  aria-label={`Go to project ${index + 1} in ${categoryTitle}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Projects() {
  const aiProjects = projectStacks.filter(p => p.category === CATEGORIES[0]);
  const connectorProjects = projectStacks.filter(p => p.category === CATEGORIES[1]);

  return (
    <section id="projects" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16" // Overall section title moved up
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Stacks & Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the technologies and projects I've worked on, showcasing my journey in development across different domains.
          </p>
        </motion.div>

        <ProjectCategoryCarousel projects={aiProjects} categoryTitle={CATEGORIES[0]} />
        <ProjectCategoryCarousel projects={connectorProjects} categoryTitle={CATEGORIES[1]} />
        
      </div>
    </section>
  );
}
