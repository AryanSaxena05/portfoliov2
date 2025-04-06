import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Function to handle smooth scrolling
    const handleSmoothScroll = (targetId: string) => {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    };
    
    // Attach click handlers for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) handleSmoothScroll(href);
      });
    });
    
    // Scroll to the hash on initial load
    if (window.location.hash) {
      setTimeout(() => {
        handleSmoothScroll(window.location.hash);
      }, 100);
    }

    // Clean-up function
    return () => {
      // Since we can't reference the exact handler function, we'll just clone and replace
      // to remove all attached event listeners (a common pattern for cleanup)
      anchors.forEach(anchor => {
        const newAnchor = anchor.cloneNode(true);
        if (anchor.parentNode) {
          anchor.parentNode.replaceChild(newAnchor, anchor);
        }
      });
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
