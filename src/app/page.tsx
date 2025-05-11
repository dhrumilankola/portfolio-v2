import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
// import Experience from "@/components/sections/Experience"; // Removed Experience import
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
// import SocialLinks from "@/components/ui/SocialLinks"; // Removed SocialLinks import

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <Experience /> Removed Experience component usage */}
      <About />
      <Projects />
      <Contact />
      <Footer />
      {/* <SocialLinks /> Removed SocialLinks component usage */}
      
      {/* The other section components will be added here as we create them */}
      {/* About section */}
      {/* Contact section */}
      {/* Footer section */}
    </main>
  );
}