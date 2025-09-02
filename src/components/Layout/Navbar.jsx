import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Search,
  Bell,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'
import { useAuth, useTheme, useUI } from '../../store/store'
import { useLocalStorage } from '../../hooks'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const { sidebarOpen, toggleSidebar } = useUI()
  const [lastScrollY, setLastScrollY] = useLocalStorage('last-scroll-y', 0)

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Projects', path: '/projects', icon: '🚀' },
    { name: 'Research', path: '/research', icon: '🔬' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ]

  // Handle scroll effect
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 50)
    setLastScrollY(currentScrollY)
  }, [setLastScrollY])

  // Handle scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
  }, [location])

  // Handle logout
  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }, [logout, navigate])

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    toggle()
  }, [toggle])

  const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="container-custom px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-neutral-900 font-display font-bold text-xl">
                Trinix
              </span>
              <span className="text-xs text-neutral-500 -mt-1">Innovation Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link flex items-center gap-2 transition-all duration-200 ${
                  location.pathname === item.path ? 'nav-link-active' : ''
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <button className="btn-ghost p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="btn-ghost p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme.mode === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-200 p-2 rounded-lg hover:bg-neutral-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{user?.name || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animationVariants}
                      className="dropdown"
                    >
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="dropdown-item flex items-center gap-3"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="dropdown-item flex items-center gap-3"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-neutral-200 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item flex items-center gap-3 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-ghost"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-neutral-700 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Nav Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors duration-200 p-3 rounded-lg hover:bg-neutral-50 ${
                      location.pathname === item.path ? 'text-primary-600 bg-primary-50 font-semibold' : ''
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="border-t border-neutral-200 pt-4">
                  {/* Mobile Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handleThemeToggle}
                      className="btn-ghost flex items-center gap-2"
                    >
                      {theme.mode === 'dark' ? (
                        <>
                          <Sun className="w-4 h-4" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mobile Auth */}
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-neutral-900 font-medium">{user?.name || 'User'}</div>
                          <div className="text-sm text-neutral-500">{user?.email}</div>
                        </div>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="btn-secondary w-full text-center"
                      >
                        Dashboard
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="btn-ghost w-full text-center"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="btn-secondary w-full text-center"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/login"
                        className="btn-primary w-full text-center"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close user menu */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar
