import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Heart, Activity } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      name: 'Eventify',
      description: 'Revolutionary event management and venue booking platform',
      path: '/eventify',
      color: 'from-purple-500 to-pink-500',
      icon: Calendar,
      features: ['Venue Booking', 'Event Planning', 'Real-time Management']
    },
    {
      name: 'SOS',
      description: 'Emergency response system for critical situations',
      path: '/sos',
      color: 'from-red-500 to-orange-500',
      icon: Activity,
      features: ['Emergency Alerts', 'Response Coordination', 'Safety Monitoring']
    },
    {
      name: 'MedGo',
      description: 'Healthcare platform connecting patients with medical professionals',
      path: '/medgo',
      color: 'from-green-500 to-blue-500',
      icon: Heart,
      features: ['Doctor Appointments', 'Health Records', 'Telemedicine']
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
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our innovative solutions that are transforming industries and improving lives worldwide.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6`}>
                <project.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{project.name}</h3>
              <p className="text-white/70 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="space-y-2 mb-8">
                {project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link
                to={project.path}
                className="button-primary w-full inline-flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects



