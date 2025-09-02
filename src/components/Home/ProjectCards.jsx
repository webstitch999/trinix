import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Calendar, Shield, Heart, Star } from 'lucide-react'

const ProjectCards = () => {
  const projects = [
    {
      name: 'Eventify',
      description: 'Revolutionary event management platform connecting venues, organizers, and attendees seamlessly.',
      icon: Calendar,
      color: 'from-primary-500 to-secondary-500',
      bgColor: 'from-primary-50 to-secondary-50',
      stats: { venues: '1,250+', events: '3,400+', rating: '4.8' },
      features: ['Venue Booking', 'Event Planning', 'Real-time Updates', 'Payment Integration'],
      path: '/eventify',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'SOS',
      description: 'Emergency response network ensuring rapid assistance and safety for communities worldwide.',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      stats: { response: '< 2min', coverage: '95%', users: '50,000+' },
      features: ['Emergency Alerts', 'GPS Tracking', 'First Responder Network', 'Safety Check-ins'],
      path: '/sos',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'MedGo',
      description: 'Healthcare provider network streamlining medical appointments and patient care.',
      icon: Heart,
      color: 'from-green-500 to-blue-500',
      bgColor: 'from-green-50 to-blue-50',
      stats: { doctors: '850+', patients: '25,000+', rating: '4.9' },
      features: ['Doctor Booking', 'Health Records', 'Telemedicine', 'Prescription Management'],
      path: '/medgo',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Our <span className="gradient-text">Innovative</span> Solutions
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our comprehensive suite of platforms designed to revolutionize 
            how we handle events, emergencies, and healthcare.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={project.path}>
                <div className={`relative h-full card-elevated rounded-2xl overflow-hidden bg-gradient-to-br ${project.bgColor} border border-neutral-200 hover:border-primary-300 transition-all duration-300`}>
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                        <project.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{project.stats.rating}</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-all duration-300">
                        {project.name}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-neutral-900">{value}</div>
                            <div className="text-xs text-neutral-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                        Learn More
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectCards



