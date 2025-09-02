import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Type, 
  Contrast, 
  Volume2, 
  VolumeX,
  Settings,
  X
} from 'lucide-react'

const AccessibilityHelper = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    focusIndicators: true
  })

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement

    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }
  }, [settings])

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const accessibilityOptions = [
    {
      key: 'highContrast',
      title: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: Contrast
    },
    {
      key: 'largeText',
      title: 'Large Text',
      description: 'Increase font size for better readability',
      icon: Type
    },
    {
      key: 'reducedMotion',
      title: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: settings.reducedMotion ? VolumeX : Volume2
    },
    {
      key: 'focusIndicators',
      title: 'Enhanced Focus',
      description: 'Show clear focus indicators for navigation',
      icon: settings.focusIndicators ? Eye : EyeOff
    }
  ]

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        aria-label="Open accessibility options"
      >
        <Accessibility className="w-6 h-6" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Accessibility Options
        </div>
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Accessibility className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Accessibility</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">
                  Customize your experience for better accessibility
                </p>
              </div>

              {/* Options */}
              <div className="p-6 space-y-4">
                {accessibilityOptions.map((option) => (
                  <div
                    key={option.key}
                    className="flex items-start gap-4 p-4 border border-neutral-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-neutral-900">{option.title}</h4>
                        <button
                          onClick={() => toggleSetting(option.key)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                            settings[option.key] ? 'bg-blue-500' : 'bg-neutral-300'
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            animate={{
                              x: settings[option.key] ? 26 : 2
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-neutral-600">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                <div className="text-center">
                  <p className="text-sm text-neutral-600 mb-3">
                    Need more accessibility features?
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AccessibilityHelper