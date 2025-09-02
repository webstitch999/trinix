import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-8xl font-bold gradient-text">404</div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          
          <Link
            to="/"
            className="button-primary inline-flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound



