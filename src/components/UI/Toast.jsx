import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

const Toast = ({ toast, onRemove }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  const Icon = icons[toast.type] || Info

  useEffect(() => {
    if (toast.duration > 0 && toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        onRemove(toast.id)
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`relative flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-sm ${colors[toast.type]} max-w-sm`}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[toast.type]}`} />
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold mb-1">{toast.title}</div>
        )}
        <div className="text-sm">{toast.message}</div>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar for timed toasts */}
      {toast.duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-2xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer