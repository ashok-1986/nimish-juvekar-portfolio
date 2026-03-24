import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ScrollyTellingWrapper from "@/components/animations/ScrollyTellingWrapper";
import Overlay from "@/components/animations/Overlay";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TeachingSection from "@/components/sections/TeachingSection";
import CompetenciesSection from "@/components/sections/CompetenciesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import QualificationsSection from "@/components/sections/QualificationsSection";
import USPSection from "@/components/sections/USPSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { Tiles } from "@/components/ui/tiles";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Tiles rows={50} cols={10} tileSize="md" />
      </div>
      <Navbar />
      <Overlay />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ScrollyTellingWrapper />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <TeachingSection />
        <CompetenciesSection />
        <ProjectsSection />
        <QualificationsSection />
        <USPSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
