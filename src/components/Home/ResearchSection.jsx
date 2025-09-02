import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react'

const ResearchSection = () => {
  const researchAreas = [
    {
      icon: BookOpen,
      title: 'Research Projects',
      description: 'Cutting-edge research in AI, healthcare, and emergency response systems',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: Code,
      title: 'Open Source Tools',
      description: 'Contributing to the developer community with innovative open-source solutions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Collaborations',
      description: 'Partnering with universities and research institutions worldwide',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Research & <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">Innovation</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Exploring new ideas, building impactful solutions, and fostering global collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 shadow-lg`}>
                <area.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{area.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/research"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Explore Research Portal</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/collaboration"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>Partnership Opportunities</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ResearchSection



