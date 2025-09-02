import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  BookOpen, 
  Code, 
  Users, 
  Star, 
  Download, 
  ExternalLink,
  ArrowRight,
  Calendar,
  FileText,
  Github
} from 'lucide-react'
import { useUI } from '../store/store'

const ResearchPortal = () => {
  const { openModal } = useUI()

  const researchProjects = [
    {
      id: 1,
      title: "AI-Powered Event Recommendation System",
      description: "Advanced machine learning algorithms for personalized event recommendations based on user preferences and behavior patterns.",
      category: "Machine Learning",
      status: "In Progress",
      team: ["Dr. Rajesh Kumar", "Priya Sharma", "Amit Patel"],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 75
    },
    {
      id: 2,
      title: "Real-time Emergency Response Optimization",
      description: "Optimization algorithms for emergency response systems to reduce response times and improve resource allocation.",
      category: "Operations Research",
      status: "Completed",
      team: ["Dr. Sarah Johnson", "Vikram Singh"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 100
    },
    {
      id: 3,
      title: "Healthcare Appointment Scheduling Algorithm",
      description: "Intelligent scheduling system that optimizes doctor-patient appointments while considering urgency and resource constraints.",
      category: "Healthcare Tech",
      status: "In Progress",
      team: ["Dr. Neha Gupta", "Rahul Sharma"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 60
    }
  ]

  const openSourceTools = [
    {
      name: "Eventify API",
      description: "Open-source API for event management and venue booking systems.",
      language: "Python",
      stars: 245,
      downloads: "1.2K",
      link: "#"
    },
    {
      name: "SOS Emergency Kit",
      description: "Emergency response toolkit for building safety applications.",
      language: "JavaScript",
      stars: 189,
      downloads: "856",
      link: "#"
    },
    {
      name: "MedGo SDK",
      description: "Software development kit for healthcare appointment systems.",
      language: "TypeScript",
      stars: 156,
      downloads: "723",
      link: "#"
    }
  ]

  return (
    <>
      <Helmet>
        <title>Research Portal - Trinix</title>
        <meta name="description" content="Explore cutting-edge research projects and contribute to innovation at Trinix Research Portal." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Research <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our cutting-edge research projects, open-source tools, and contribute to 
            the future of technology innovation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-white/60">Research Papers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">8</div>
            <div className="text-white/60">Open Source Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-white/60">Researchers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <div className="text-white/60">Active Projects</div>
          </div>
        </motion.div>

        {/* Research Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Current <span className="gradient-text">Research</span>
              </h2>
              <p className="text-xl text-white/80">
                Ongoing research projects pushing the boundaries of technology.
              </p>
            </div>
            <button
              onClick={() => openModal('research')}
              className="button-primary flex items-center space-x-2"
            >
              <span>Submit Research</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-primary-400 text-sm font-semibold">{project.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-white/60 text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-white/60 text-sm mb-2">Team</div>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member) => (
                          <span key={member} className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Open Source <span className="gradient-text">Tools</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Free, open-source tools and libraries developed by our research team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {openSourceTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Github className="w-6 h-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                      <span className="text-primary-400 text-sm">{tool.language}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{tool.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{tool.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{tool.downloads}</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={tool.link}
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <span className="text-sm">View on GitHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Recent <span className="gradient-text">Publications</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Latest research papers and publications from our team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <FileText className="w-8 h-8 text-primary-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    "Optimizing Emergency Response Systems Using Machine Learning"
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    Published in IEEE Transactions on Emergency Management, 2024
                  </p>
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Dr. Rajesh Kumar, Priya Sharma</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>March 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <FileText className="w-8 h-8 text-primary-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    "AI-Driven Event Recommendation Systems: A Comprehensive Study"
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    Published in ACM Digital Library, 2024
                  </p>
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Amit Patel, Sarah Johnson</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>February 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Contribute to Research
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Have a research idea or want to collaborate? We're always looking for 
              talented researchers and innovative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal('research')}
                className="button-primary flex items-center space-x-2"
              >
                <span>Submit Research Proposal</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="button-secondary">
                Join Research Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default ResearchPortal
