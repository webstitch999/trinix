import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SupportWidget from '../UI/SupportWidget'
import ThemeToggle from '../UI/ThemeToggle'
import { useTheme, useUI } from '../../store/store'
import { useLocalStorage } from '../../hooks'

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const { theme } = useTheme()
  const { sidebarOpen, toggleSidebar } = useUI()
  const [lastPath, setLastPath] = useLocalStorage('last-path', '/')

  // Handle scroll effect
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    setIsScrolled(scrolled)
  }, [])

  // Handle theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme.mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme.mode])

  // Handle scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Handle route changes
  useEffect(() => {
    setLastPath(location.pathname)
    setIsLoading(true)
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname, setLastPath])

  // Close sidebar on route change
  useEffect(() => {
    if (sidebarOpen) {
      toggleSidebar()
    }
  }, [location.pathname, sidebarOpen, toggleSidebar])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K for search (future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        // TODO: Open search modal
      }
      
      // Escape to close sidebar
      if (e.key === 'Escape' && sidebarOpen) {
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, toggleSidebar])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Loading overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-2 border-neutral-300 border-t-primary-500 rounded-full animate-spin"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Floating Elements */}
      <SupportWidget />
      <ThemeToggle />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Main content landmark */}
      <div id="main-content" className="sr-only">
        Main content
      </div>
    </div>
  )
}

export default Layout



