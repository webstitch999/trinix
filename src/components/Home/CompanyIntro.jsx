import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Award, Globe, Zap, Sparkles } from 'lucide-react'

const CompanyIntro = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users', color: 'from-primary-500 to-primary-600' },
    { icon: Award, value: '15+', label: 'Years Experience', color: 'from-yellow-500 to-orange-500' },
    { icon: Globe, value: '25+', label: 'Countries Served', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, value: '99.9%', label: 'Uptime', color: 'from-secondary-500 to-secondary-600' },
  ]

  const values = [
    {
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technology to solve real-world problems.',
      icon: '🚀'
    },
    {
      title: 'User-Centric Design',
      description: 'Every feature is crafted with our users in mind, ensuring intuitive and powerful experiences.',
      icon: '❤️'
    },
    {
      title: 'Reliability & Trust',
      description: 'Our platforms are built for mission-critical operations with enterprise-grade security.',
      icon: '🛡️'
    },
    {
      title: 'Global Impact',
      description: 'We\'re committed to making a positive difference in communities worldwide.',
      icon: '🌍'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">
                  <Sparkles className="w-4 h-4" />
                  <span>Established 2008</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight">
                  About <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">Trinix</span>
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-xl text-neutral-600 leading-relaxed"
              >
                Founded in 2008, Trinix Pvt. Ltd. has been at the forefront of digital innovation, 
                creating solutions that bridge the gap between technology and human needs.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-lg text-neutral-500 leading-relaxed"
              >
                Our mission is to empower communities through technology, whether it's connecting 
                people during emergencies, streamlining healthcare access, or creating unforgettable events.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link
                to="/about"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CompanyIntro
