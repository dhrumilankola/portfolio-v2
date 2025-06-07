"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities. 
            Feel free to reach out using the form or through my social channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm">
                Something went wrong. Please try again or contact me directly.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-muted-foreground">Name</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-muted-foreground">Email</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="your.email@example.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1.5 text-muted-foreground">Subject</label>
                <input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="What can I help with?" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-muted-foreground">Message</label>
                <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Your message..."></textarea>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Sending...</span>
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Right Side: Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Contact Information</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-4">
                  <FaEnvelope className="text-primary" size={20} />
                  <a href="mailto:dhrumil.ankola@gmail.com" className="hover:text-foreground transition-colors">dhrumil.ankola@gmail.com</a>
                </li>
                <li className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-primary" size={20} />
                  <span>Los Angeles, California</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Follow Me</h3>
              <div className="space-y-5">
                <a href="https://github.com/dhrumilankola" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-4 group">
                  <FaGithub size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">GitHub</p>
                    <p className="text-sm text-muted-foreground">@dhrumilankola</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/dhrumil-ankola/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-4 group">
                  <FaLinkedin size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Dhrumil Ankola</p>
                  </div>
                </a>
                <a href="https://twitter.com/dhrumil_ankola" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center gap-4 group">
                  <FaTwitter size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">Twitter</p>
                    <p className="text-sm text-muted-foreground">@dhrumil_ankola</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
