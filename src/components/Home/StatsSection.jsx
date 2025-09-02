import { motion } from 'framer-motion'
import { useStore } from '../../store/store'
import { Users, Calendar, MapPin, Heart, TrendingUp, Globe, Award, Zap } from 'lucide-react'

const StatsSection = () => {
  const { stats } = useStore()

  const statItems = [
    { 
      key: 'venuesListed', 
      label: 'Venues Listed', 
      suffix: '+', 
      icon: MapPin,
      color: 'from-primary-500 to-primary-600',
      description: 'Premium venues worldwide',
      growth: '+15%'
    },
    { 
      key: 'partiesOrganized', 
      label: 'Events Organized', 
      suffix: '+', 
      icon: Calendar,
      color: 'from-secondary-500 to-secondary-600',
      description: 'Successful events hosted',
      growth: '+28%'
    },
    { 
      key: 'doctorsRegistered', 
      label: 'Healthcare Providers', 
      suffix: '+', 
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      description: 'Verified medical professionals',
      growth: '+22%'
    },
    { 
      key: 'usersActive', 
      label: 'Active Users', 
      suffix: '+', 
      icon: Users,
      color: 'from-orange-500 to-red-500',
      description: 'Global community members',
      growth: '+35%'
    },
  ]

  const achievements = [
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Winner of 5 innovation awards',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Operating in 25+ countries',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: '99.9% uptime guarantee',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: '50K+ satisfied customers',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-white via-neutral-50 to-primary-50/30">
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
            <TrendingUp className="w-4 h-4" />
            <span>Growing Impact</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Real metrics that demonstrate our commitment to innovation, user satisfaction, 
            and positive community impact across all our platforms.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl p-8 border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Main Stat */}
                <div className="text-center mb-4">
                  <motion.div 
                    className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {stats[stat.key].toLocaleString()}{stat.suffix}
                  </motion.div>
                  <div className="text-neutral-600 font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-neutral-500">{stat.description}</div>
                </div>

                {/* Growth Indicator */}
                <div className="flex items-center justify-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.growth} this year</span>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} blur-2xl -z-10 scale-75`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white rounded-2xl border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{achievement.title}</h3>
              <p className="text-sm text-neutral-600">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-12 text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Trusted by Communities Worldwide
              </h3>
              <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
                These numbers represent real people and real impact. Every venue listed, every event organized, 
                every doctor registered, and every emergency response means better experiences, safer communities, 
                and improved lives for everyone in our global network.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">99.9%</div>
                  <div className="text-white/80">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-white/80">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">< 2min</div>
                  <div className="text-white/80">Average Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection