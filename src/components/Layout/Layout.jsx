import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SupportWidget from '../UI/SupportWidget'
import ThemeToggle from '../UI/ThemeToggle'
import AccessibilityHelper from '../UI/AccessibilityHelper'
import PerformanceMonitor from '../UI/PerformanceMonitor'
import ToastContainer from '../UI/Toast'
import { useTheme, useUI, useAnalytics } from '../../store/store'
import { useLocalStorage, usePerformance, useWebVitals } from '../../hooks'

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [toasts, setToasts] = useState([])
  const location = useLocation()
  const { theme } = useTheme()
  const { sidebarOpen, toggleSidebar, notifications } = useUI()
  const { trackPageView } = useAnalytics()
  
  // Performance monitoring
  const { measureOperation } = usePerformance('Layout')
  useWebVitals()

  // Handle scroll effect with performance optimization
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }, [isScrolled])

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  // Handle theme changes
  useEffect(() => {
    if (!theme) return
    
    measureOperation('themeChange', () => {
      const root = document.documentElement
      if (theme.mode === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    })
  }, [theme, measureOperation])

  // Handle route changes with analytics
  useEffect(() => {
    setIsLoading(true)
    
    // Track page view
    trackPageView(location.pathname)
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [location.pathname, trackPageView])

  // Close sidebar on route change
  useEffect(() => {
    if (sidebarOpen) {
      toggleSidebar()
    }
  }, [location.pathname, sidebarOpen, toggleSidebar])

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        // Search modal will be handled by Navbar
      }
      
      if (e.key === 'Escape' && sidebarOpen) {
        toggleSidebar()
      }

      // Accessibility shortcuts
      if (e.altKey && e.key === 'h') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      if (e.altKey && e.key === 'm') {
        e.preventDefault()
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
          mainContent.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, toggleSidebar])

  // Toast management
  const addToast = useCallback((toast) => {
    const id = Date.now().toString()
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast
    }
    setToasts(prev => [...prev, newToast])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Convert store notifications to toasts
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read)
    if (unreadNotifications.length > 0) {
      const latestNotification = unreadNotifications[0]
      if (latestNotification && !toasts.find(t => t.id === latestNotification.id)) {
        addToast({
          id: latestNotification.id,
          type: latestNotification.type,
          title: latestNotification.title,
          message: latestNotification.message,
          duration: 4000
        })
      }
    }
  }, [notifications, toasts, addToast])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-6 py-3 rounded-xl z-50 font-medium shadow-lg focus:shadow-xl transition-all duration-200"
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-1 pt-20" tabIndex="-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Loading overlay with enhanced animation */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-8 h-8 border-2 border-neutral-300 border-t-primary-500 rounded-full"
                  />
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
      <AccessibilityHelper />
      <PerformanceMonitor />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

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

      {/* Global Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 origin-left"
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Layout