"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const animatedParagraphs = [
  {
    id: 1,
    parts: [
      { text: "I design systems that ", highlight: false },
      { text: "SCALE", highlight: true, className: "text-primary font-bold" },
      { text: ", solve problems that ", highlight: false },
      { text: "MATTER", highlight: true, className: "text-primary font-bold" },
      { text: ", and turn ideas into real-world ", highlight: false },
      { text: "IMPACT", highlight: true, className: "text-primary font-bold" },
      { text: ".", highlight: false },
    ],
  },
  {
    id: 2,
    parts: [
      { text: "Fresh off a Master's from ", highlight: false },
      { text: "UC RIVERSIDE", highlight: true, className: "text-sky-500 font-semibold" },
      { text: ", I've led ", highlight: false },
      { text: "OPEN-SOURCE INNOVATIONS", highlight: true },
      { text: ", built ", highlight: false },
      { text: "AI-POWERED TOOLS", highlight: true },
      { text: ", and driven products used by ", highlight: false },
      { text: "THOUSANDS", highlight: true },
      { text: ".", highlight: false },
    ],
  },
  {
    id: 3,
    parts: [
      { text: "Whether it's ", highlight: false },
      { text: "OPTIMIZING DATA PIPELINES", highlight: true },
      { text: " or building new ", highlight: false },
      { text: "USER EXPERIENCES", highlight: true },
      { text: ", I bring ", highlight: false },
      { text: "CURIOSITY, GRIT, AND CLARITY", highlight: true, className: "italic" },
      { text: " to every challenge.", highlight: false },
    ],
  },
  {
    id: 4,
    parts: [
      { text: "This portfolio is how I ", highlight: false },
      { text: "THINK, BUILD, AND KEEP MOVING FORWARD", highlight: true, className: "font-semibold tracking-tight" },
      { text: ".", highlight: false },
    ],
  },
];

export default function Hero() {
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentParagraphIndex((prevIndex) => (prevIndex + 1) % animatedParagraphs.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const paragraphContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* Background shapes - simplified, focusing on image interaction */}
      <div className="absolute inset-0 z-0">
        {/* Keeping one or two very subtle large background elements if needed, or remove all for now */}
        {/* Example: A very soft, large, distant primary circle */}
        {/* <div className=\"absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-50 transform -translate-x-1/4 -translate-y-1/4\" /> */}
        {/* Example: A very soft, large, distant blue circle */}
        {/* <div className=\"absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl opacity-50 transform translate-x-1/4 translate-y-1/4\" /> */}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0"> {/* md:gap-0 for closer fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/5 flex flex-col gap-5 relative z-0" // Text takes more space, z-0
          >
            <h2 className="text-2xl md:text-3xl font-medium text-primary">
              Hi, I&apos;m Dhrumil Ankola
            </h2>
            
            <div className="text-muted-foreground text-lg md:text-xl lg:text-2xl max-w-xl h-[180px] md:h-[200px] lg:h-[220px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={animatedParagraphs[currentParagraphIndex].id}
                  variants={paragraphContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="leading-relaxed"
                >
                  {animatedParagraphs[currentParagraphIndex].parts.map((part, partIdx) => (
                    <motion.span
                      key={partIdx}
                      className={`${part.highlight ? (part.className || 'text-foreground font-semibold') : ''} ${part.highlight && !part.className ? 'text-lg md:text-xl lg:text-2xl' : ''}`}
                    >
                      {part.text.split(/(\s+)/).map((segment, segmentIdx) => {
                        if (segment.match(/^\s+$/)) {
                          return <span key={segmentIdx}>{segment}</span>;
                        } else if (segment.length > 0) {
                          return (
                            <motion.span
                              key={segmentIdx}
                              variants={wordVariants}
                              className="inline-block"
                            >
                              {segment}
                            </motion.span>
                          );
                        }
                        return null;
                      })}
                    </motion.span>
                  ))}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-row gap-4 mt-4">
              <ScrollLink
                to="projects"
                smooth
                duration={500}
                offset={-80}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all cursor-pointer"
              >
                View My Work
                <ArrowDownIcon className="h-4 w-4" />
              </ScrollLink>
              
              <a
                href="/Ankola_Dhrumil_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-lg font-medium transition-all"
              >
                Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-2/5 flex justify-center md:-ml-16 lg:-ml-24 xl:-ml-32 relative z-10" // Image takes less space, negative margin for overlap, z-10
          >
            {/* Custom shape achieved by styling this container and the image */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px]">
              {/* Gradient aura behind the image, matching the new shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-500/40 opacity-50 blur-xl animate-pulse-slow rounded-[60%_40%_30%_70%_/_70%_30%_70%_30%]" />
              <img
                src="/hero-image1.png"
                alt="Dhrumil Ankola"
                className="object-cover w-full h-full z-10 relative rounded-[60%_40%_30%_70%_/_70%_30%_70%_30%] shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-10 left-0 right-0 mx-auto w-full flex justify-center z-20"
        >
          <ScrollLink
            to="experience"
            smooth
            duration={500}
            offset={-80}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDownIcon className="h-5 w-5 animate-bounce" />
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
}
