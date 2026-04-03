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
import CommunitySection from "@/components/sections/CommunitySection";
import FreelanceSection from "@/components/sections/FreelanceSection";
import USPSection from "@/components/sections/USPSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Overlay />
      <main id="main-content" role="main" tabIndex={-1}>
        <HeroSection />
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
      </main>
      <Footer />
    </>
  );
}
