"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => null); 
        console.error("Form submission error:", errorData);
        setSubmitError(true);
        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Network or other error during form submission:", error);
      setSubmitError(true);
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out to me for any questions or opportunities. I&apos;m
            always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Form Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Slight delay for form appearance
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-lg p-6 md:p-8 shadow-xl border border-border">
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Send Me a Message</h3>
            
            {submitSuccess && (
              <div className="mb-6 p-3 bg-green-500/10 text-green-500 rounded-md text-sm">
                Thank you for your message! I&apos;ll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-3 bg-red-500/10 text-red-500 rounded-md text-sm">
                There was an error sending your message. Please try again or contact me directly.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1 text-muted-foreground"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-md border border-input bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Regarding..."
                />
              </div>
              
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-md border border-input bg-transparent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info Section - Below Form, Centered */}
        <motion.div
          variants={container} // Re-using variants from original code
          initial="hidden"
          animate={inView ? "show" : "hidden"} // Animate based on section inView
          className="mt-16 text-center" // Added margin top, text-center
        >
          <motion.h3
            variants={item} // Re-using variants
            className="text-xl font-bold mb-6 text-primary"
          >
            Or Contact Me Directly
          </motion.h3>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center p-3">
              <FaMapMarkerAlt className="text-primary text-xl mr-3" />
              <div>
                <h4 className="font-semibold text-lg">Location</h4>
                <p className="text-muted-foreground">
                  Los Angeles, California, USA
                </p>
              </div>
            </div>
            {/* You can add more direct contact methods here like Email or Phone if desired */}
            {/* Example Email (ensure it matches your actual contact details) */}
            <div className="flex items-center p-3">
              <FaEnvelope className="text-primary text-xl mr-3" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <a href="mailto:ankoladhrumil@gmail.com" className="text-muted-foreground hover:text-primary">
                  ankoladhrumil@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
