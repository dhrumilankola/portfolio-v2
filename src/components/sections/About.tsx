"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  // CalendarDaysIcon, // Removed as unused
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
  ChevronDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { CpuChipIcon, SparklesIcon, UserGroupIcon } from "@heroicons/react/24/outline"; // Example icons

interface TimelineEvent {
  id: string;
  yearPhase: string;
  titleIcon?: string; // Emoji or character
  title: string;
  details: Array<{ text: string; icon?: React.ReactNode; }>;
  tech?: string[];
  quoteIcon?: string; // Emoji or character
  quote: string;
}

const timelineEventsData: TimelineEvent[] = [
  {
    id: "gamer",
    yearPhase: "2012–2014",
    titleIcon: "🎮",
    title: "Gamer First, Builder Later",
    details: [
      { text: "Assassin's Creed, Hitman, GTA, FIFA, Flight Sim" }
    ],
    quoteIcon: "🧠",
    quote: "Games were my first gateway into tech — I didn't just play, I questioned how they worked.",
  },
  {
    id: "first-code",
    yearPhase: "2014",
    titleIcon: "💻",
    title: "First Lines of Code – 8th Grade",
    details: [
      { text: "School Computer Lab", icon: <AcademicCapIcon className="h-5 w-5 mr-2 text-primary" /> }
    ],
    quoteIcon: "🧠",
    quote: "Seeing my code run felt like magic — until I broke it. Then it felt like a puzzle.",
  },
  {
    id: "exploration",
    yearPhase: "2016–2019",
    titleIcon: "🧭", // Changed from 🌆 for "Compass" theme
    title: "Exploration Mode",
    details: [
      { text: "12th Board Exams" },
      { text: "Road trips" },
      { text: "Foreign travel" },
      { text: "All-nighters" }
    ],
    quoteIcon: "🧠",
    quote: "Life teaches you a lot when you stop scripting it.",
  },
  {
    id: "btech",
    yearPhase: "2019–2023",
    titleIcon: "🎓",
    title: "B.Tech @ BVM Engineering College",
    details: [
      { text: "Chief Advisor, Student Committee", icon: <UserGroupIcon className="h-5 w-5 mr-2 text-primary" /> },
      { text: "Orchestrated BVM\'s 75th Anniversary" },
      { text: "Hosted tech & cultural events" }
    ],
    quoteIcon: "🧠",
    quote: "Leadership isn\'t just planning — it\'s listening, adapting, and lifting others.",
  },
  {
    id: "ms-ucr",
    yearPhase: "2023–2025",
    titleIcon: "🏢",
    title: "M.S. CS @ University of California, Riverside",
    details: [
      { text: "Worked on scalable systems for CARB (California Air Resources Board)", icon: <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" /> },
      { text: "Built production apps used by 10,000+ vehicles", icon: <CpuChipIcon className="h-5 w-5 mr-2 text-primary" /> }
    ],
    quoteIcon: "🧠",
    quote: "Projects teach you to think. Production teaches you to deliver under pressure.",
  },
  {
    id: "today",
    yearPhase: "Today",
    titleIcon: "🚀", 
    title: "Still Climbing",
    details: [
      { text: "Building systems." },
      { text: "Experimenting with AI.", icon: <SparklesIcon className="h-5 w-5 mr-2 text-primary" /> },
      { text: "Playing CS:GO sometimes.", }
    ],
    quoteIcon: "🧠",
    quote: "The code evolves. So do I.",
  },
];

const cardEntryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Slightly faster stagger for vertical
      type: "spring",
      stiffness: 100,
      damping: 12
    },
  }),
};

const detailsVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: "0px", transition: { duration: 0.3, ease: "easeInOut" } },
  expanded: { opacity: 1, height: "auto", marginTop: "1rem", transition: { duration: 0.3, ease: "easeInOut" } },
};

// Helper function to render a single timeline card
const RenderTimelineCard = ({ event, index, cardWidthClass, startExpanded }: { event: TimelineEvent, index: number, cardWidthClass: string, startExpanded: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(startExpanded);

  const handleMouseEnter = () => {
    if (!startExpanded) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!startExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardEntryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-card p-6 rounded-xl shadow-lg border border-border/80 transform transition-all duration-300 group hover:shadow-primary/20 ${cardWidthClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-center justify-between mb-3 ${!startExpanded ? 'cursor-pointer' : ''}`}> {/* Conditionally add cursor-pointer */}
        <div className="flex items-center">
          {event.titleIcon && <span className={`text-3xl mr-3 transition-transform duration-300 ${!startExpanded ? 'group-hover:scale-110' : ''}`}>{event.titleIcon}</span>} {/* Conditional group-hover */}
          <div>
            <p className="text-sm font-semibold text-primary">{event.yearPhase}</p>
            <h3 className="text-xl font-bold text-card-foreground">{event.title}</h3>
          </div>
        </div>
        {!startExpanded && (
            <ChevronDownIcon className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        )}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            variants={detailsVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden" // Important for height animation
          >
            <div className="space-y-2 mb-4 text-sm text-muted-foreground pt-2 border-t border-border/20">
              {event.details.map((detail, i) => (
                <div key={i} className="flex items-start">
                  {detail.icon || <LightBulbIcon className="h-5 w-5 mr-2 text-primary/60 flex-shrink-0 mt-0.5" />} 
                  <span>{detail.text}</span>
                </div>
              ))}
            </div>

            {event.tech && event.tech.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Key Tech:</p>
                <div className="flex flex-wrap gap-2">
                  {event.tech.map(t => (
                    <span key={t} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-border/50 pt-4 mt-4">
              <p className="text-sm italic text-muted-foreground/80">
                <span className="text-lg mr-1">{event.quoteIcon}</span>
                {event.quote}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, 
  });

  return (
    <section id="about" className="py-20 bg-background text-foreground overflow-x-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} 
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center">
          <DocumentTextIcon className="h-10 w-10 mr-3 text-primary" />
          Logs from the Build
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every milestone, a mindset shift. Every project, a reflection of growth.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Timeline */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto space-x-6 pb-8 scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {timelineEventsData.map((event, index) => (
              <RenderTimelineCard key={event.id} event={event} index={index} cardWidthClass="w-80 flex-shrink-0" startExpanded={true} />
            ))}
          </div>
        </div>

        {/* Desktop: Zigzag Vertical Timeline */}
        <div className="hidden md:block relative pt-8 pb-8"> {/* Added padding top/bottom for space */}
          {/* Central Vertical Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-border -translate-x-1/2 z-0"></div>

          {timelineEventsData.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={event.id} className="relative mb-12 flex items-center"> {/* Row container */}
                {isLeft ? (
                  <>
                    <div className="w-1/2 pr-10"> {/* Left card container */}
                      <RenderTimelineCard event={event} index={index} cardWidthClass="w-full" startExpanded={false} />
                    </div>
                    <div className="w-1/2"></div> {/* Spacer */}
                  </>
                ) : (
                  <>
                    <div className="w-1/2"></div> {/* Spacer */}
                    <div className="w-1/2 pl-10"> {/* Right card container */}
                      <RenderTimelineCard event={event} index={index} cardWidthClass="w-full" startExpanded={false} />
                    </div>
                  </>
                )}
                {/* Dot on the timeline - aligned with top of card for simplicity, can be adjusted */}
                <div className="absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10 shadow-md"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 