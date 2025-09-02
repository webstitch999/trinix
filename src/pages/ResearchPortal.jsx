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
  Github,
  GitBranch,
  Eye,
  Heart,
  Zap,
  Award,
  Globe,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react'
import { useUI } from '../store/store'

const ResearchPortal = () => {
  const { openModal } = useUI()
  const [activeTab, setActiveTab] = useState('research')

  const researchProjects = [
    {
      id: 1,
      title: "AI-Powered Event Recommendation System",
      description: "Advanced machine learning algorithms for personalized event recommendations based on user preferences and behavior patterns.",
      category: "Machine Learning",
      status: "In Progress",
      team: ["Dr. Rajesh Kumar", "Priya Sharma", "Amit Patel"],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 75,
      publications: 3,
      citations: 45,
      funding: "₹2.5M"
    },
    {
      id: 2,
      title: "Real-time Emergency Response Optimization",
      description: "Optimization algorithms for emergency response systems to reduce response times and improve resource allocation.",
      category: "Operations Research",
      status: "Completed",
      team: ["Dr. Sarah Johnson", "Vikram Singh"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 100,
      publications: 5,
      citations: 78,
      funding: "₹3.2M"
    },
    {
      id: 3,
      title: "Healthcare Appointment Scheduling Algorithm",
      description: "Intelligent scheduling system that optimizes doctor-patient appointments while considering urgency and resource constraints.",
      category: "Healthcare Tech",
      status: "In Progress",
      team: ["Dr. Neha Gupta", "Rahul Sharma"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 60,
      publications: 2,
      citations: 23,
      funding: "₹1.8M"
    }
  ]

  const openSourceTools = [
    {
      name: "Eventify API",
      description: "Open-source API for event management and venue booking systems with comprehensive documentation and examples.",
      language: "Python",
      stars: 1245,
      forks: 189,
      downloads: "12.5K",
      version: "v2.1.0",
      license: "MIT",
      lastUpdate: "2 days ago",
      contributors: 23,
      issues: 8,
      link: "https://github.com/trinix/eventify-api",
      tags: ["API", "Events", "Booking", "Python", "FastAPI"],
      documentation: "https://docs.trinix.com/eventify-api"
    },
    {
      name: "SOS Emergency Kit",
      description: "Emergency response toolkit for building safety applications with real-time communication and location services.",
      language: "JavaScript",
      stars: 892,
      forks: 156,
      downloads: "8.9K",
      version: "v1.5.2",
      license: "Apache 2.0",
      lastUpdate: "1 week ago",
      contributors: 18,
      issues: 12,
      link: "https://github.com/trinix/sos-emergency-kit",
      tags: ["Emergency", "Safety", "Real-time", "JavaScript", "WebRTC"],
      documentation: "https://docs.trinix.com/sos-kit"
    },
    {
      name: "MedGo SDK",
      description: "Software development kit for healthcare appointment systems with HIPAA-compliant data handling and secure APIs.",
      language: "TypeScript",
      stars: 567,
      forks: 89,
      downloads: "5.2K",
      version: "v1.3.1",
      license: "MIT",
      lastUpdate: "3 days ago",
      contributors: 15,
      issues: 5,
      link: "https://github.com/trinix/medgo-sdk",
      tags: ["Healthcare", "SDK", "TypeScript", "HIPAA", "Medical"],
      documentation: "https://docs.trinix.com/medgo-sdk"
    },
    {
      name: "Trinix UI Components",
      description: "React component library with modern design system, accessibility features, and comprehensive theming support.",
      language: "TypeScript",
      stars: 423,
      forks: 67,
      downloads: "3.8K",
      version: "v0.9.0",
      license: "MIT",
      lastUpdate: "5 days ago",
      contributors: 12,
      issues: 3,
      link: "https://github.com/trinix/ui-components",
      tags: ["React", "Components", "Design System", "Accessibility"],
      documentation: "https://ui.trinix.com"
    },
    {
      name: "Data Analytics Toolkit",
      description: "Comprehensive analytics toolkit for processing and visualizing large-scale event and user data with privacy-first approach.",
      language: "Python",
      stars: 334,
      forks: 45,
      downloads: "2.1K",
      version: "v1.2.0",
      license: "BSD-3",
      lastUpdate: "1 week ago",
      contributors: 8,
      issues: 7,
      link: "https://github.com/trinix/analytics-toolkit",
      tags: ["Analytics", "Data Science", "Privacy", "Python", "Visualization"],
      documentation: "https://docs.trinix.com/analytics"
    },
    {
      name: "Smart Notification Engine",
      description: "Intelligent notification system with multi-channel delivery, smart scheduling, and user preference learning.",
      language: "Go",
      stars: 278,
      forks: 34,
      downloads: "1.7K",
      version: "v1.1.0",
      license: "MIT",
      lastUpdate: "4 days ago",
      contributors: 6,
      issues: 4,
      link: "https://github.com/trinix/notification-engine",
      tags: ["Notifications", "Go", "Multi-channel", "Smart Scheduling"],
      documentation: "https://docs.trinix.com/notifications"
    }
  ]

  const collaborations = [
    {
      id: 1,
      institution: "Indian Institute of Technology, Mumbai",
      project: "Smart City Emergency Response",
      duration: "2023-2025",
      status: "Active",
      description: "Collaborative research on integrating AI and IoT for urban emergency management systems.",
      impact: "Potential to serve 20M+ urban population",
      funding: "₹5.2M",
      publications: 8
    },
    {
      id: 2,
      institution: "All India Institute of Medical Sciences",
      project: "Digital Healthcare Accessibility",
      duration: "2024-2026",
      status: "Active",
      description: "Research on improving healthcare accessibility through digital platforms and telemedicine.",
      impact: "Serving rural healthcare needs",
      funding: "₹3.8M",
      publications: 4
    },
    {
      id: 3,
      institution: "Stanford University",
      project: "Global Emergency Response Networks",
      duration: "2023-2024",
      status: "Completed",
      description: "International collaboration on emergency response optimization using machine learning.",
      impact: "Global emergency response standards",
      funding: "$150K",
      publications: 12
    }
  ]

  const publications = [
    {
      title: "Optimizing Emergency Response Systems Using Machine Learning",
      authors: ["Dr. Rajesh Kumar", "Priya Sharma", "Dr. Sarah Johnson"],
      journal: "IEEE Transactions on Emergency Management",
      year: "2024",
      citations: 67,
      impact: "High",
      link: "#",
      abstract: "This paper presents a novel approach to optimizing emergency response systems using advanced machine learning algorithms..."
    },
    {
      title: "AI-Driven Event Recommendation Systems: A Comprehensive Study",
      authors: ["Amit Patel", "Sarah Johnson", "Dr. Neha Gupta"],
      journal: "ACM Digital Library",
      year: "2024",
      citations: 43,
      impact: "Medium",
      link: "#",
      abstract: "A comprehensive analysis of AI-driven recommendation systems in the context of event discovery and user engagement..."
    },
    {
      title: "Digital Healthcare Transformation in Emerging Markets",
      authors: ["Dr. Neha Gupta", "Vikram Singh"],
      journal: "Journal of Medical Internet Research",
      year: "2023",
      citations: 89,
      impact: "High",
      link: "#",
      abstract: "Examining the impact of digital healthcare platforms on accessibility and quality of care in emerging markets..."
    }
  ]

  const tabs = [
    { id: 'research', name: 'Research Projects', icon: BookOpen },
    { id: 'opensource', name: 'Open Source', icon: Code },
    { id: 'collaborations', name: 'Collaborations', icon: Users },
    { id: 'publications', name: 'Publications', icon: FileText }
  ]

  const getLanguageColor = (language) => {
    const colors = {
      'Python': 'from-blue-500 to-blue-600',
      'JavaScript': 'from-yellow-500 to-yellow-600',
      'TypeScript': 'from-blue-600 to-indigo-600',
      'Go': 'from-cyan-500 to-teal-600',
      'Java': 'from-orange-500 to-red-500',
      'C++': 'from-purple-500 to-purple-600'
    }
    return colors[language] || 'from-gray-500 to-gray-600'
  }

  return (
    <>
      <Helmet>
        <title>Research Portal - Trinix</title>
        <meta name="description" content="Explore cutting-edge research projects, open-source tools, collaborations, and publications at Trinix Research Portal." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
        <div className="container-custom section-padding">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Research <span className="gradient-text">Portal</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Explore our cutting-edge research projects, open-source contributions, academic collaborations, 
              and published works that drive innovation in technology and social impact.
            </p>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-16"
          >
            {[
              { value: '25+', label: 'Research Papers', icon: FileText, color: 'from-blue-500 to-cyan-500' },
              { value: '12', label: 'Open Source Tools', icon: Code, color: 'from-green-500 to-emerald-500' },
              { value: '35+', label: 'Researchers', icon: Users, color: 'from-purple-500 to-pink-500' },
              { value: '8', label: 'Active Projects', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
              { value: '15+', label: 'Collaborations', icon: Globe, color: 'from-indigo-500 to-purple-500' },
              { value: '2.8K+', label: 'Citations', icon: Award, color: 'from-red-500 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-2 mb-12 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:block">{tab.name}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Research Projects Tab */}
            {activeTab === 'research' && (
              <div className="space-y-12">
                <div className="flex items-center justify-between">
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
                    className="btn-primary flex items-center gap-2"
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
                      className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative h-48">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            project.status === 'Completed' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white/60 text-sm mb-1">Progress</div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-primary-400 text-sm font-semibold">{project.category}</span>
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{project.publications}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{project.citations}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="text-white/60 text-sm mb-2">Research Team</div>
                            <div className="flex flex-wrap gap-2">
                              {project.team.map((member) => (
                                <span key={member} className="px-2 py-1 bg-white/10 rounded-lg text-white/80 text-xs">
                                  {member}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="text-sm">
                              <div className="text-white/60">Funding</div>
                              <div className="text-white font-semibold">{project.funding}</div>
                            </div>
                            <button className="text-primary-400 hover:text-primary-300 transition-colors">
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Open Source Tab */}
            {activeTab === 'opensource' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                    Open Source <span className="gradient-text">Ecosystem</span>
                  </h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto">
                    Free, open-source tools and libraries developed by our research team for the global developer community.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {openSourceTools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getLanguageColor(tool.language)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Github className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                              {tool.name}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-white/60">
                              <span className="text-primary-400 font-medium">{tool.language}</span>
                              <span>•</span>
                              <span>{tool.version}</span>
                              <span>•</span>
                              <span>{tool.license}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white/70 mb-6 leading-relaxed">{tool.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 rounded-lg text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-bold">{tool.stars.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-white/60">Stars</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                            <GitBranch className="w-4 h-4" />
                            <span className="font-bold">{tool.forks}</span>
                          </div>
                          <div className="text-xs text-white/60">Forks</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                            <Download className="w-4 h-4" />
                            <span className="font-bold">{tool.downloads}</span>
                          </div>
                          <div className="text-xs text-white/60">Downloads</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                            <Users className="w-4 h-4" />
                            <span className="font-bold">{tool.contributors}</span>
                          </div>
                          <div className="text-xs text-white/60">Contributors</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/50">
                          Updated {tool.lastUpdate}
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={tool.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors text-sm"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Docs</span>
                          </a>
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Open Source Contribution Guide */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass rounded-2xl p-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Contribute to Our <span className="gradient-text">Open Source</span> Projects
                    </h3>
                    <p className="text-white/80 max-w-2xl mx-auto">
                      Join our community of developers and researchers. Your contributions help build better tools for everyone.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">Code Contributions</h4>
                      <p className="text-white/70 text-sm">Submit pull requests, fix bugs, and add new features</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">Documentation</h4>
                      <p className="text-white/70 text-sm">Help improve documentation and create tutorials</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">Community Support</h4>
                      <p className="text-white/70 text-sm">Help other developers and share your expertise</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Collaborations Tab */}
            {activeTab === 'collaborations' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                    Academic <span className="gradient-text">Collaborations</span>
                  </h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto">
                    Partnering with leading institutions worldwide to advance research and innovation.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {collaborations.map((collab, index) => (
                    <motion.div
                      key={collab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-semibold text-white mb-2">{collab.project}</h3>
                              <p className="text-primary-400 font-medium">{collab.institution}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              collab.status === 'Active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {collab.status}
                            </span>
                          </div>
                          
                          <p className="text-white/80 mb-4 leading-relaxed">{collab.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{collab.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{collab.publications} publications</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-2xl font-bold text-white mb-1">{collab.funding}</div>
                            <div className="text-white/60 text-sm">Total Funding</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white/80 text-sm mb-2">Expected Impact</div>
                            <div className="text-white font-medium">{collab.impact}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications Tab */}
            {activeTab === 'publications' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                    Research <span className="gradient-text">Publications</span>
                  </h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto">
                    Peer-reviewed publications and research papers from our team.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {publications.map((pub, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 hover:text-primary-400 transition-colors cursor-pointer">
                            {pub.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
                            <span>By {pub.authors.join(', ')}</span>
                            <span>•</span>
                            <span>{pub.journal}</span>
                            <span>•</span>
                            <span>{pub.year}</span>
                          </div>
                          <p className="text-white/80 leading-relaxed mb-4">{pub.abstract}</p>
                        </div>
                        <div className="ml-6 text-right">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                            pub.impact === 'High' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {pub.impact} Impact
                          </div>
                          <div className="text-white/60 text-sm">
                            {pub.citations} citations
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{pub.citations} citations</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>View count: {Math.floor(pub.citations * 2.3)}K</span>
                          </div>
                        </div>
                        <a
                          href={pub.link}
                          className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
                        >
                          <span>Read Paper</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-3xl p-12 border border-white/20">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                  Join Our Research <span className="gradient-text">Community</span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Whether you're a researcher, developer, or innovator, there's a place for you in our community. 
                  Contribute to cutting-edge research, build open-source tools, or collaborate on groundbreaking projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => openModal('research')}
                    className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    <span>Submit Research Proposal</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  <a
                    href="https://github.com/trinix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    <Github className="w-6 h-6" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ResearchPortal