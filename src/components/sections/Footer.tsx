"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const navigation = {
  main: [
    { name: "Home", to: "home" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ],
  social: [
    { name: "GitHub", icon: FaGithub, href: "https://github.com/dhrumilankola" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/dhrumil-ankola/" },
    { name: "Email", icon: FaEnvelope, href: "mailto:ankoladhrumil@gmail.com" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-12 px-4 overflow-hidden">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <ScrollLink
                to={item.to}
                smooth
                duration={500}
                offset={-80}
                className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {item.name}
              </ScrollLink>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          &copy; {currentYear} Dhrumil Ankola. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}
