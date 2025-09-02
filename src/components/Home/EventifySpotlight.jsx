import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Users, Star } from 'lucide-react'

const EventifySpotlight = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight">
                  Spotlight: <span className="bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">Eventify</span>
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-xl text-neutral-600 leading-relaxed"
              >
                The ultimate event management platform that connects venues, organizers, and attendees 
                in one seamless ecosystem. From intimate gatherings to large-scale events.
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: Calendar, text: 'Smart Venue Booking & Management' },
                { icon: MapPin, text: 'Real-time Location & Availability' },
                { icon: Users, text: 'Integrated Guest Management' },
                { icon: Star, text: 'Premium Venue Partnerships' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-neutral-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link
                to="/eventify"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-violet-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Eventify Platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,250+</div>
                    <div className="text-sm opacity-90">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3,400+</div>
                    <div className="text-sm opacity-90">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12,500+</div>
                    <div className="text-sm opacity-90">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EventifySpotlight



