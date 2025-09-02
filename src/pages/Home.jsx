import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Users, Calendar, MapPin, Heart, Share2 } from 'lucide-react'
import HeroSection from '../components/Home/HeroSection'
import CompanyIntro from '../components/Home/CompanyIntro'
import EventifySpotlight from '../components/Home/EventifySpotlight'
import ProjectCards from '../components/Home/ProjectCards'
import ResearchSection from '../components/Home/ResearchSection'
import StatsSection from '../components/Home/StatsSection'
import ResearchBanner from '../components/Home/ResearchBanner'
import { useStore } from '../store/store'

const Home = () => {
  const { stats, updateStats } = useStore()

  useEffect(() => {
    // Initialize stats with realistic data
    updateStats({
      venuesListed: 1250,
      partiesOrganized: 3400,
      doctorsRegistered: 850,
      usersActive: 12500,
    })
  }, [updateStats])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Trinix */}
      <CompanyIntro />

      {/* Spotlight */}
      <EventifySpotlight />

      {/* Innovative Solutions */}
      <ProjectCards />

      {/* Research */}
      <ResearchSection />

      {/* Stats */}
      <StatsSection />

      {/* Research Banner */}
      <ResearchBanner />
    </div>
  )
}

export default Home
