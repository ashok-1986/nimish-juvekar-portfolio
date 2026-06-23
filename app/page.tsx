import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ModulesSection from "@/components/sections/ModulesSection";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Temporarily commenting out other sections to adhere strictly to the 2026 minimalist 4-section layout
/*
import ScrollyTellingWrapper from "@/components/animations/ScrollyTellingWrapper";
import Overlay from "@/components/animations/Overlay";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TeachingSection from "@/components/sections/TeachingSection";
import CompetenciesSection from "@/components/sections/CompetenciesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import QualificationsSection from "@/components/sections/QualificationsSection";
import CommunitySection from "@/components/sections/CommunitySection";
import FreelanceSection from "@/components/sections/FreelanceSection";
import USPSection from "@/components/sections/USPSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
*/

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      
      <main id="main-content" role="main" tabIndex={-1}>
        <HeroSection />
        <ModulesSection />
        
        {/* Temporarily hidden sections */}
        {/* 
        <Overlay />
        <ScrollyTellingWrapper />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <TeachingSection />
        <CompetenciesSection />
        <ProjectsSection />
        <QualificationsSection />
        <CommunitySection />
        <FreelanceSection />
        <USPSection />
        <ContactSection />
        */}
      </main>
      
      <Footer />
    </>
  );
}
