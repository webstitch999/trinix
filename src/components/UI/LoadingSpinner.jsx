import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', className = '', variant = 'default' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const variants = {
    default: {
      border: 'border-2 border-neutral-300 border-t-indigo-500',
      animation: 'spin'
    },
    dots: {
      border: '',
      animation: 'pulse'
    },
    bars: {
      border: '',
      animation: 'bounce'
    }
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizeClasses[size]} bg-indigo-500 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'bars') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`w-1 bg-primary-500 rounded-full ${
              size === 'xs' ? 'h-3' :
              size === 'sm' ? 'h-4' :
              size === 'md' ? 'h-6' :
              size === 'lg' ? 'h-8' : 'h-10'
            }`}
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${variants[variant].border} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export default LoadingSpinner