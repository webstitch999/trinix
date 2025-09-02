import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../store/store'

const ThemeToggle = () => {
  const { theme, toggle, setSystem } = useTheme()

  const handleToggle = () => {
    toggle()
  }

  const handleSystemToggle = () => {
    setSystem(!theme.system)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {/* Main Toggle Button */}
        <motion.button
          onClick={handleToggle}
          className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme.mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme.mode === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme.mode === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>

        {/* System Theme Indicator */}
        {theme.system && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-800 border-2 border-white rounded-full flex items-center justify-center"
          >
            <Monitor className="w-3 h-3 text-white" />
          </motion.div>
        )}

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none"
        >
          {theme.system ? 'System Theme' : `${theme.mode === 'dark' ? 'Light' : 'Dark'} Mode`}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ThemeToggle



