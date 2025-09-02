import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/Home/HeroSection'
import CompanyIntro from '../components/Home/CompanyIntro'
import EventifySpotlight from '../components/Home/EventifySpotlight'
import ProjectCards from '../components/Home/ProjectCards'
import ResearchSection from '../components/Home/ResearchSection'
import StatsSection from '../components/Home/StatsSection'
import ResearchBanner from '../components/Home/ResearchBanner'
import { useStats, useAnalytics } from '../store/store'
import { usePerformance } from '../hooks'

const Home = () => {
  const { updateStats } = useStats()
  const { trackPageView } = useAnalytics()
  const { measureOperation } = usePerformance('HomePage')

  useEffect(() => {
    // Track page view
    trackPageView('home')
    
    // Initialize stats with realistic data
    measureOperation('statsUpdate', () => {
      updateStats({
        venuesListed: 1250,
        partiesOrganized: 3400,
        doctorsRegistered: 850,
        usersActive: 12500,
      })
    })
  }, [updateStats, trackPageView, measureOperation])

  return (
    <>
      <Helmet>
        <title>Trinix - Innovative Solutions for Modern Businesses</title>
        <meta 
          name="description" 
          content="Leading provider of SOS, MedGo, and Eventify solutions. Discover our innovative platforms for emergency services, healthcare, and event management." 
        />
        <meta name="keywords" content="event management, emergency response, healthcare, technology, innovation" />
        <meta property="og:title" content="Trinix - Innovative Solutions for Modern Businesses" />
        <meta property="og:description" content="Leading provider of SOS, MedGo, and Eventify solutions" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://trinix.com" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* About Trinix */}
        <CompanyIntro />

        {/* Spotlight */}
        <EventifySpotlight />

        {/* Innovative Solutions */}
        <ProjectCards />

        {/* Stats */}
        <StatsSection />

        {/* Research */}
        <ResearchSection />

        {/* Research Banner */}
        <ResearchBanner />
      </motion.div>
    </>
  )
}

export default Home