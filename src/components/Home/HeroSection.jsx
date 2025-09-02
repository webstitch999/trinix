import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Star, Sparkles, TrendingUp, Users, Globe, X } from 'lucide-react'

const HeroSection = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const projects = [
    {
      name: 'Eventify',
      description: 'Revolutionary event management platform',
      color: 'from-primary-500 to-secondary-500',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/eventify',
      stats: { venues: '1,250+', events: '3,400+', users: '12,500+' },
      highlights: ['Smart Venue Discovery', 'Instant Booking', 'Event Analytics']
    },
    {
      name: 'SOS',
      description: 'Emergency response and safety network',
      color: 'from-red-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/sos',
      stats: { response: '< 2min', coverage: '95%', users: '50,000+' },
      highlights: ['Real-time Alerts', 'GPS Tracking', 'Community Safety']
    },
    {
      name: 'MedGo',
      description: 'Healthcare provider network and booking',
      color: 'from-green-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/medgo',
      stats: { doctors: '850+', patients: '25,000+', rating: '4.8' },
      highlights: ['Expert Doctors', 'Instant Booking', 'Health Records']
    }
  ]

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [projects.length])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl"
        />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:32px_32px] opacity-30"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 rounded-full text-sm font-medium shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Leading Innovation Since 2008</span>
              <TrendingUp className="w-4 h-4" />
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 leading-[1.1] tracking-tight"
              >
                Building the
                <motion.span 
                  className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Future
                </motion.span>
                <span className="block text-neutral-900">Today</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl"
              >
                We create cutting-edge technology solutions that transform industries and enhance lives. 
                From intelligent event management to life-saving emergency systems, our innovations 
                drive meaningful change across communities worldwide.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-700 font-semibold rounded-2xl hover:border-primary-300 hover:text-primary-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6 text-sm text-neutral-500"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400 shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">50K+ users worldwide</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="font-medium">4.9/5 rating</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium">25+ countries</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} opacity-10`} />
                  <img
                    src={projects[activeProject].image}
                    alt={projects[activeProject].name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {projects[activeProject].name}
                        </h3>
                        <p className="text-white/90 text-lg mb-4">
                          {projects[activeProject].description}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {projects[activeProject].highlights.map((highlight, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/30"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(projects[activeProject].stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-white">{value}</div>
                            <div className="text-white/70 text-sm capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Link
                        to={projects[activeProject].path}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                      >
                        <span>Explore Platform</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`group relative transition-all duration-300 ${
                    index === activeProject ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeProject
                      ? `bg-gradient-to-r ${project.color} shadow-lg`
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`} />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {project.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-neutral-200 rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                key={activeProject}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-video bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10 group"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-20 h-20 mx-auto text-white/60" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Company Demo Video</h3>
                    <p className="text-white/70">Experience our innovative solutions in action</p>
                    <p className="text-sm text-white/50 mt-2">Coming Soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSection