import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Calendar, Shield, Heart, Star, TrendingUp, Zap, X } from 'lucide-react'

const ProjectCards = () => {
  const projects = [
    {
      name: 'Eventify',
      description: 'Revolutionary event management platform connecting venues, organizers, and attendees seamlessly with AI-powered recommendations.',
      icon: Calendar,
      color: 'from-primary-500 to-secondary-500',
      bgColor: 'from-primary-50 to-secondary-50',
      stats: { venues: '1,250+', events: '3,400+', rating: '4.8', growth: '+25%' },
      features: ['Smart Venue Discovery', 'Instant Booking', 'Event Analytics', 'Payment Integration'],
      path: '/eventify',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['AI-Powered', 'Real-time', 'Secure'],
      metrics: {
        satisfaction: '98%',
        bookings: '15K+',
        partners: '500+'
      }
    },
    {
      name: 'SOS',
      description: 'Emergency response network ensuring rapid assistance and safety for communities worldwide with advanced hardware integration.',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      stats: { response: '< 2min', coverage: '95%', users: '50,000+', growth: '+40%' },
      features: ['Emergency Alerts', 'GPS Tracking', 'First Responder Network', 'Hardware Integration'],
      path: '/sos',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Life-Saving', '24/7 Active', 'Verified'],
      metrics: {
        responseTime: '90s',
        accuracy: '99.2%',
        coverage: '25 cities'
      }
    },
    {
      name: 'MedGo',
      description: 'Healthcare provider network streamlining medical appointments and patient care with telemedicine capabilities.',
      icon: Heart,
      color: 'from-green-500 to-blue-500',
      bgColor: 'from-green-50 to-blue-50',
      stats: { doctors: '850+', patients: '25,000+', rating: '4.9', growth: '+35%' },
      features: ['Doctor Booking', 'Health Records', 'Telemedicine', 'Prescription Management'],
      path: '/medgo',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      highlights: ['Verified Doctors', 'Instant Care', 'Digital Health'],
      metrics: {
        appointments: '50K+',
        satisfaction: '97%',
        specialists: '200+'
      }
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 rounded-full text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Innovative Solutions</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Transforming Industries with
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Smart Technology
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of platforms designed to revolutionize 
            how we handle events, emergencies, and healthcare through intelligent automation.
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <Link to={project.path}>
                <div className={`relative h-full bg-gradient-to-br ${project.bgColor} rounded-3xl overflow-hidden border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-500 shadow-lg hover:shadow-2xl`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                  </div>

                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <project.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-semibold text-neutral-700">{project.stats.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          <span>{project.stats.growth}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 mb-6">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <span 
                            key={highlightIndex}
                            className="px-3 py-1 bg-white/80 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded-full border border-neutral-200/50"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {project.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-neutral-900">{value}</div>
                          <div className="text-xs text-neutral-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200/50">
                      <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                        Explore Platform
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${project.color} blur-xl -z-10 scale-110`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="font-semibold">Ready to transform your business?</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectCards