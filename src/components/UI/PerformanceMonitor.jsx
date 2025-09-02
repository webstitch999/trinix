import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Zap, Clock, TrendingUp, X } from 'lucide-react'
import { useAnalytics } from '../../store/store'

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    loadTime: 0,
    renderTime: 0
  })
  const { setPerformance } = useAnalytics()

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setMetrics(prev => ({ ...prev, fps }))
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    const measureMemory = () => {
      if (performance.memory) {
        const memory = Math.round(performance.memory.usedJSHeapSize / 1048576) // MB
        setMetrics(prev => ({ ...prev, memory }))
      }
    }

    const measureLoadTime = () => {
      const loadTime = Math.round(performance.now())
      setMetrics(prev => ({ ...prev, loadTime }))
    }

    // Start monitoring
    measureFPS()
    measureMemory()
    measureLoadTime()

    // Update performance metrics in store
    setPerformance(metrics)

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [setPerformance])

  // Show/hide with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-24 right-4 z-50 w-64 bg-black/90 backdrop-blur-xl text-white rounded-2xl p-4 shadow-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="font-semibold text-sm">Performance</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs">FPS</span>
              </div>
              <span className={`text-sm font-mono ${
                metrics.fps >= 55 ? 'text-green-400' : 
                metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {metrics.fps}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="text-xs">Memory</span>
              </div>
              <span className="text-sm font-mono text-blue-400">
                {metrics.memory}MB
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-purple-400" />
                <span className="text-xs">Load</span>
              </div>
              <span className="text-sm font-mono text-purple-400">
                {metrics.loadTime}ms
              </span>
            </div>

            <div className="pt-2 border-t border-white/20">
              <div className="text-xs text-white/60">
                Press Ctrl+Shift+P to toggle
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PerformanceMonitor