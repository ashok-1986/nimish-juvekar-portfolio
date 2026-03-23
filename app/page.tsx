import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import TeachingSection from '@/components/sections/TeachingSection'
import CompetenciesSection from '@/components/sections/CompetenciesSection'
import QualificationsSection from '@/components/sections/QualificationsSection'
import ContactSection from '@/components/sections/ContactSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import USPSection from '@/components/sections/USPSection'
import ScrollyTellingWrapper from '@/components/animations/ScrollyTellingWrapper'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
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
  )
}
