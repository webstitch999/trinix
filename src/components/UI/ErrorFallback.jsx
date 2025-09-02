import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <Helmet>
        <title>Error - Trinix</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg"
          >
            <AlertTriangle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Oops! Something went wrong
          </h1>
          
          <p className="text-neutral-600 mb-8 leading-relaxed">
            We encountered an unexpected error. Don't worry, our team has been notified and is working to fix it.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mb-8 text-left">
              <summary className="text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors mb-2">
                Error Details (Development)
              </summary>
              <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-sm text-neutral-700 font-mono overflow-auto">
                <pre>{error.message}</pre>
                {error.stack && (
                  <pre className="mt-2 text-xs text-neutral-500">{error.stack}</pre>
                )}
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetErrorBoundary}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            
            <Link
              to="/"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </div>

          <p className="text-sm text-neutral-500 mt-8">
            If this problem persists, please contact our support team.
          </p>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default ErrorFallback
