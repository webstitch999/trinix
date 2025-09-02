import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Stethoscope, 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Clock,
  Check,
  ArrowRight,
  MessageCircle,
  Phone
} from 'lucide-react'
import { useStore } from '../store/store'

const MedGo = () => {
  const { openModal } = useStore()
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments with top doctors in minutes',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Find Nearby',
      description: 'Discover healthcare providers in your area',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Stethoscope,
      title: 'Specialist Care',
      description: 'Access to specialists across all medical fields',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock healthcare assistance',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { value: '850+', label: 'Verified Doctors' },
    { value: '25K+', label: 'Happy Patients' },
    { value: '4.8', label: 'Average Rating' },
    { value: '15min', label: 'Avg Wait Time' }
  ]

  const specialties = [
    'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics',
    'Neurology', 'Oncology', 'Psychiatry', 'General Medicine'
  ]

  const handleSignup = (e) => {
    e.preventDefault()
    if (email) {
      openModal('research')
      toast.success('Thank you for your interest! We\'ll contact you soon.')
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            MedGo <span className="gradient-text">Healthcare</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Connect with top healthcare providers, book appointments instantly, 
            and get the care you deserve. Your health, simplified.
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">
              Healthcare Made <span className="gradient-text">Simple</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              MedGo connects you with verified healthcare professionals, 
              making it easy to find the right doctor and book appointments 
              that fit your schedule.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-white/80">Instant appointment booking</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-white/80">Verified healthcare providers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-white/80">Specialist consultations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-white/80">Digital health records</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="button-primary flex items-center space-x-2">
                <span>Find Doctors</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="button-secondary">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Healthcare"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Why Choose <span className="gradient-text">MedGo</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed for modern patients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Medical <span className="gradient-text">Specialties</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Access to specialists across all major medical fields.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-white font-semibold">{specialty}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Simple three-step process to get the care you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Find Doctor</h3>
              <p className="text-white/70">Search for specialists in your area</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Book Appointment</h3>
              <p className="text-white/70">Choose time slot and book instantly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Care</h3>
              <p className="text-white/70">Visit doctor and get treatment</p>
            </div>
          </div>
        </motion.div>

        {/* Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Get Early Access
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Be among the first to experience the future of healthcare. 
              Sign up for early access and exclusive updates.
            </p>
            <form onSubmit={handleSignup} className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 input-field"
                  required
                />
                <button type="submit" className="button-primary">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-white/60 text-sm mt-4">
              We'll notify you when MedGo is available in your area
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MedGo
