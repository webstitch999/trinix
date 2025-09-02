import { motion } from 'framer-motion'
import { useStore } from '../../store/store'
import { Users, Calendar, MapPin, Heart } from 'lucide-react'

const StatsSection = () => {
  const { stats } = useStore()

  const statItems = [
    { 
      key: 'venuesListed', 
      label: 'Venues Listed', 
      suffix: '+', 
      icon: MapPin,
      color: 'from-primary-500 to-primary-600'
    },
    { 
      key: 'partiesOrganized', 
      label: 'Parties Organized', 
      suffix: '+', 
      icon: Calendar,
      color: 'from-secondary-500 to-secondary-600'
    },
    { 
      key: 'doctorsRegistered', 
      label: 'Doctors Registered', 
      suffix: '+', 
      icon: Heart,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      key: 'usersActive', 
      label: 'Active Users', 
      suffix: '+', 
      icon: Users,
      color: 'from-orange-500 to-red-500'
    },
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
            Our <span className="gradient-text">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Real metrics that demonstrate our commitment to innovation and user satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="card text-center p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-3">
                {stats[stat.key].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Trusted by Communities Worldwide
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              These numbers represent real people and real impact. Every venue listed, every party organized, 
              and every doctor registered means better experiences and safer communities for everyone.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection



