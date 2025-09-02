import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Users, Star, CheckCircle } from 'lucide-react'

const Eventify = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Discover events nearby',
      description: 'Find the best events, clubs, and venues in your area with our intelligent discovery system.'
    },
    {
      icon: Calendar,
      title: 'Easy booking and RSVP',
      description: 'Simple and intuitive booking process with instant confirmation and RSVP management.'
    },
    {
      icon: Users,
      title: 'Integration with clubs & venues',
      description: 'Seamless integration with partner venues and clubs for real-time availability and bookings.'
    },
    {
      icon: Star,
      title: 'Simple user-friendly interface',
      description: 'Clean, modern interface designed for the best user experience across all devices.'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Eventify
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Eventify is our event discovery and booking platform, designed to connect users with clubs, 
            house parties, and venues in a seamless way.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Experience the Future of Event Discovery</h3>
                  <p className="text-white/80 leading-relaxed">
                    Join thousands of users who are already discovering amazing events and venues 
                    through our platform. Whether you're looking for a night out, planning a special 
                    celebration, or exploring new experiences, Eventify makes it all possible.
                  </p>
                  <div className="flex items-center space-x-6 text-white/60">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>1,250+ Venues</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>3,400+ Events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>4.8★ Rating</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Eventify Platform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join the thousands of users who are already discovering amazing events and venues 
              through Eventify. Start your journey today!
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link
                 to="/login"
                 className="button-primary inline-flex items-center space-x-2"
               >
                 <span>Get Started</span>
                 <ArrowRight className="w-5 h-5" />
               </Link>
               <Link
                 to="/projects"
                 className="button-secondary inline-flex items-center space-x-2"
               >
                 <span>Visit Project</span>
                 <ArrowRight className="w-5 h-5" />
               </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Eventify
