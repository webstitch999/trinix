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
  Sparkles,
  Home,
  Briefcase,
  FlaskConical,
  Phone,
  Shield,
  Calendar,
  Heart,
  Handshake
} from 'lucide-react'
import { useAuth, useTheme, useUI } from '../../store/store'
import SearchModal from '../UI/SearchModal'
import NotificationCenter from '../UI/NotificationCenter'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const { notifications } = useUI()

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Research', path: '/research', icon: FlaskConical },
    { name: 'Contact', path: '/contact', icon: Phone },
  ]

  const productItems = [
    { name: 'Eventify', path: '/eventify', icon: Calendar, color: 'text-purple-400' },
    { name: 'SOS', path: '/sos', icon: Shield, color: 'text-red-400' },
    { name: 'MedGo', path: '/medgo', icon: Heart, color: 'text-green-400' },
  ]

  // Handle scroll effect with performance optimization
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }, [isScrolled])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16) // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
    setShowSearch(false)
    setShowNotifications(false)
  }, [location])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setShowUserMenu(false)
        setShowSearch(false)
        setShowNotifications(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }, [logout, navigate])

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-lg' 
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-neutral-900 font-display font-bold text-xl tracking-tight">
                  Trinix
                </span>
                <span className="text-xs text-neutral-500 -mt-1 font-medium">Innovation Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                    location.pathname === item.path 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary-100 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              
              {/* Collaboration Link */}
              <Link
                to="/collaboration"
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                  location.pathname === '/collaboration' 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                <Handshake className="w-4 h-4" />
                <span>Collaborate</span>
                {location.pathname === '/collaboration' && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary-100 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
              
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-200">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3">
                  {productItems.map((product) => (
                    <Link
                      key={product.name}
                      to={product.path}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200 group/item"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                        product.name === 'Eventify' ? 'from-purple-500 to-pink-500' :
                        product.name === 'SOS' ? 'from-red-500 to-orange-500' :
                        'from-green-500 to-blue-500'
                      } flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-200`}>
                        <product.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800 group-hover/item:text-primary-600 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {product.name === 'Eventify' ? 'Event Management Platform' :
                           product.name === 'SOS' ? 'Emergency Response System' :
                           'Healthcare Provider Network'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Search */}
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2.5 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-200 relative group"
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Ctrl+K
                </div>
              </button>

              {/* Notifications */}
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative p-2.5 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </motion.div>
                )}
              </button>

              {/* Theme Toggle */}
              {theme && (
                <button
                  onClick={toggle}
                  className="p-2.5 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-200"
                  title="Toggle theme"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme.mode === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme.mode === 'dark' ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>
              )}

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-50 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-neutral-700">{user?.name || 'User'}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-xl p-2"
                      >
                        <div className="px-3 py-2 border-b border-neutral-200/50 mb-2">
                          <div className="font-semibold text-neutral-900">{user?.name}</div>
                          <div className="text-sm text-neutral-500">{user?.email}</div>
                        </div>
                        
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-700">Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-700">Settings</span>
                        </Link>
                        
                        <div className="border-t border-neutral-200/50 my-2"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        location.pathname === item.path 
                          ? 'text-primary-600 bg-primary-50 font-semibold' 
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  
                  {/* Mobile Collaboration Link */}
                  <Link
                    to="/collaboration"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === '/collaboration' 
                        ? 'text-primary-600 bg-primary-50 font-semibold' 
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                    }`}
                  >
                    <Handshake className="w-5 h-5" />
                    <span>Collaborate</span>
                  </Link>
                  
                  <div className="px-4 py-2">
                    <div className="text-sm font-semibold text-neutral-500 mb-2">Products</div>
                    {productItems.map((product) => (
                      <Link
                        key={product.name}
                        to={product.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                          product.name === 'Eventify' ? 'from-purple-500 to-pink-500' :
                          product.name === 'SOS' ? 'from-red-500 to-orange-500' :
                          'from-green-500 to-blue-500'
                        } flex items-center justify-center`}>
                          <product.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-neutral-700 font-medium">{product.name}</div>
                          <div className="text-xs text-neutral-500">
                            {product.name === 'Eventify' ? 'Events & Venues' :
                             product.name === 'SOS' ? 'Emergency Response' :
                             'Healthcare Network'}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Auth */}
                  <div className="px-4 pt-4 border-t border-neutral-200/50">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900">{user?.name || 'User'}</div>
                            <div className="text-sm text-neutral-500">{user?.email || 'user@example.com'}</div>
                          </div>
                        </div>
                        
                        <Link
                          to="/dashboard"
                          className="block w-full px-4 py-3 bg-primary-600 text-white text-center font-medium rounded-xl hover:bg-primary-700 transition-colors duration-200"
                        >
                          Dashboard
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-3 text-neutral-600 text-center font-medium rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="block w-full px-4 py-3 text-neutral-600 text-center font-medium rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/login"
                          className="block w-full px-4 py-3 bg-primary-600 text-white text-center font-medium rounded-xl hover:bg-primary-700 transition-colors duration-200"
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
        </div>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      
      {/* Notification Center */}
      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </>
  )
}

// Utility function for throttling
const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default Navbar