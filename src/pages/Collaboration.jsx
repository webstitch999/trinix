import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Users, HeartHandshake as Handshake, Globe, Target, ArrowRight, Building, GraduationCap, Briefcase, Heart, Code, Lightbulb, Star, CheckCircle, Mail, Phone, Calendar, FileText, Award, TrendingUp, Zap, Shield, Rocket, Eye, MessageCircle, Send, X, Plus, ExternalLink } from 'lucide-react'
import { useUI } from '../store/store'
import toast from 'react-hot-toast'

const Collaboration = () => {
  const { openModal, addNotification } = useUI()
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: '',
    message: ''
  })

  const collaborationTypes = [
    {
      id: 'academic',
      title: 'Academic Partnerships',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Research collaborations with universities and academic institutions worldwide',
      benefits: [
        'Joint research publications',
        'Student exchange programs',
        'Shared research facilities',
        'Grant funding opportunities',
        'Knowledge transfer initiatives'
      ],
      requirements: [
        'Accredited academic institution',
        'Research alignment with our focus areas',
        'Established research track record',
        'Commitment to open science principles'
      ],
      currentPartners: 15,
      activeProjects: 8
    },
    {
      id: 'corporate',
      title: 'Corporate Partnerships',
      icon: Building,
      color: 'from-purple-500 to-pink-500',
      description: 'Strategic partnerships with corporations for technology development and market expansion',
      benefits: [
        'Technology licensing opportunities',
        'Joint product development',
        'Market access and distribution',
        'Shared R&D investments',
        'Innovation acceleration'
      ],
      requirements: [
        'Established market presence',
        'Alignment with our mission',
        'Technical expertise',
        'Long-term partnership vision'
      ],
      currentPartners: 12,
      activeProjects: 6
    },
    {
      id: 'ngo',
      title: 'NGO Collaborations',
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      description: 'Partnerships with NGOs and social organizations for community impact and social good',
      benefits: [
        'Community outreach programs',
        'Social impact measurement',
        'Resource sharing',
        'Volunteer engagement',
        'Sustainable development goals'
      ],
      requirements: [
        'Registered NGO status',
        'Proven community impact',
        'Transparent operations',
        'Shared social mission'
      ],
      currentPartners: 25,
      activeProjects: 12
    },
    {
      id: 'startup',
      title: 'Startup Ecosystem',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      description: 'Supporting and collaborating with innovative startups in our technology domains',
      benefits: [
        'Mentorship and guidance',
        'Technology sharing',
        'Market validation support',
        'Funding connections',
        'Accelerator programs'
      ],
      requirements: [
        'Innovative technology solution',
        'Scalable business model',
        'Experienced founding team',
        'Market traction or potential'
      ],
      currentPartners: 8,
      activeProjects: 4
    }
  ]

  const currentOpportunities = [
    {
      id: 1,
      title: 'AI Research Collaboration',
      type: 'Academic',
      organization: 'Leading Universities',
      description: 'Joint research on AI applications in emergency response systems and predictive analytics for crisis management.',
      duration: '18 months',
      funding: '₹5.2M available',
      deadline: '2024-12-31',
      requirements: [
        'PhD in AI/ML or related field',
        'Published research in emergency systems',
        'Access to computational resources',
        'Commitment to open publication'
      ],
      benefits: [
        'Co-authored publications',
        'Conference presentation opportunities',
        'Access to real-world datasets',
        'Industry mentorship'
      ],
      status: 'Open',
      applicants: 23,
      category: 'academic'
    },
    {
      id: 2,
      title: 'Healthcare Technology Partnership',
      type: 'Corporate',
      organization: 'Healthcare Providers',
      description: 'Strategic partnership to integrate MedGo platform with existing healthcare infrastructure and expand service reach.',
      duration: '24 months',
      funding: 'Revenue sharing model',
      deadline: '2025-01-15',
      requirements: [
        'Established healthcare network',
        'Digital transformation readiness',
        'Patient data security compliance',
        'Multi-location presence'
      ],
      benefits: [
        'Technology integration support',
        'Market expansion opportunities',
        'Shared development costs',
        'Enhanced patient experience'
      ],
      status: 'Open',
      applicants: 8,
      category: 'corporate'
    },
    {
      id: 3,
      title: 'Community Safety Initiative',
      type: 'NGO',
      organization: 'Safety & Security NGOs',
      description: 'Collaborative program to implement SOS emergency response systems in underserved communities.',
      duration: '12 months',
      funding: 'Grant-funded program',
      deadline: '2024-12-20',
      requirements: [
        'Community presence and trust',
        'Safety program experience',
        'Local government relationships',
        'Volunteer network'
      ],
      benefits: [
        'Free technology access',
        'Training and support',
        'Community impact measurement',
        'Sustainability planning'
      ],
      status: 'Open',
      applicants: 15,
      category: 'ngo'
    },
    {
      id: 4,
      title: 'Event Tech Innovation Lab',
      type: 'Startup',
      organization: 'Event Technology Startups',
      description: 'Incubator program for startups developing innovative event technology solutions and integration with Eventify.',
      duration: '6 months',
      funding: 'Equity + mentorship',
      deadline: '2025-02-01',
      requirements: [
        'Event technology focus',
        'MVP or prototype ready',
        'Founding team commitment',
        'Scalability potential'
      ],
      benefits: [
        'Mentorship from industry experts',
        'Access to Eventify ecosystem',
        'Funding opportunities',
        'Market validation support'
      ],
      status: 'Open',
      applicants: 12,
      category: 'startup'
    }
  ]

  const successStories = [
    {
      partner: 'IIT Mumbai',
      project: 'Smart Emergency Response',
      outcome: 'Reduced response time by 40% in pilot areas',
      duration: '2022-2024',
      impact: '2M+ people served',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      partner: 'Apollo Hospitals',
      project: 'Digital Health Integration',
      outcome: 'Streamlined 50K+ appointments',
      duration: '2023-2024',
      impact: '15 hospitals connected',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      partner: 'Red Cross India',
      project: 'Community Safety Network',
      outcome: 'Deployed in 25+ communities',
      duration: '2023-ongoing',
      impact: '500K+ people protected',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  const handleApply = (opportunity) => {
    setSelectedOpportunity(opportunity)
    setShowContactForm(true)
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    
    // Simulate form submission
    addNotification({
      type: 'success',
      title: 'Application Submitted',
      message: `Your application for "${selectedOpportunity?.title}" has been submitted successfully.`,
      duration: 5000
    })
    
    toast.success('Application submitted successfully!')
    setShowContactForm(false)
    setFormData({
      name: '',
      email: '',
      organization: '',
      type: '',
      message: ''
    })
  }

  return (
    <>
      <Helmet>
        <title>Collaboration Opportunities - Trinix</title>
        <meta name="description" content="Partner with Trinix for research, technology development, and social impact. Explore collaboration opportunities with our innovation team." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900">
        <div className="container-custom section-padding">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
              <Handshake className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Collaboration <span className="gradient-text">Hub</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Partner with Trinix to drive innovation, create social impact, and build the future of technology together. 
              Discover opportunities that align with your mission and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              >
                <span>Start Collaboration</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                <FileText className="w-6 h-6" />
                <span>Download Partnership Guide</span>
              </button>
            </div>
          </motion.div>

          {/* Partnership Types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                Partnership <span className="gradient-text">Opportunities</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Multiple collaboration models designed to create mutual value and drive innovation.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {collaborationTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed">{type.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {type.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {type.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-6 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{type.currentPartners} partners</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{type.activeProjects} active projects</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply({ ...type, category: type.id })}
                      className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                Current <span className="gradient-text">Opportunities</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Active collaboration opportunities available for immediate partnership.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {currentOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                          {opportunity.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
                          {opportunity.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span className="text-primary-400 font-medium">{opportunity.type}</span>
                        <span>•</span>
                        <span>{opportunity.organization}</span>
                        <span>•</span>
                        <span>{opportunity.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed">{opportunity.description}</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {opportunity.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {opportunity.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-6 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{opportunity.applicants} applicants</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(opportunity)}
                      className="btn-primary text-sm px-6 py-2"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                Success <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Real partnerships that have created meaningful impact and driven innovation.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48">
                    <img
                      src={story.image}
                      alt={story.project}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white mb-1">{story.project}</h3>
                      <p className="text-white/80 text-sm">{story.partner}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Outcome</span>
                        <span className="text-white font-semibold text-sm">{story.outcome}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Duration</span>
                        <span className="text-white font-semibold text-sm">{story.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Impact</span>
                        <span className="text-primary-400 font-semibold text-sm">{story.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partnership Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                Partnership <span className="gradient-text">Process</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Simple, transparent process to establish meaningful collaborations.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '1', title: 'Initial Contact', description: 'Submit your collaboration proposal', icon: MessageCircle },
                  { step: '2', title: 'Evaluation', description: 'Our team reviews your proposal', icon: Eye },
                  { step: '3', title: 'Discussion', description: 'Detailed discussion and planning', icon: Users },
                  { step: '4', title: 'Partnership', description: 'Formalize collaboration agreement', icon: Handshake }
                ].map((process, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                      <process.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary-400 mb-2">{process.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{process.title}</h3>
                    <p className="text-white/70 text-sm">{process.description}</p>
                    {index < 3 && (
                      <div className="hidden md:block mt-4">
                        <ArrowRight className="w-6 h-6 text-white/40 mx-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <div className="glass rounded-3xl p-12 border border-white/20">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
                  Ready to <span className="gradient-text">Collaborate</span>?
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Let's discuss how we can work together to create innovative solutions and drive meaningful impact. 
                  Our partnership team is ready to explore opportunities that align with your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Start Conversation</span>
                  </button>
                  <a
                    href="mailto:partnerships@trinix.com"
                    className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    <Mail className="w-6 h-6" />
                    <span>Email Partnership Team</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowContactForm(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="w-full max-w-2xl glass rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-white">
                    {selectedOpportunity ? `Apply for ${selectedOpportunity.title}` : 'Start Collaboration'}
                  </h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Organization *</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full input-field"
                      placeholder="Your organization or institution"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Collaboration Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full input-field"
                      required
                    >
                      <option value="">Select collaboration type</option>
                      <option value="academic">Academic Partnership</option>
                      <option value="corporate">Corporate Partnership</option>
                      <option value="ngo">NGO Collaboration</option>
                      <option value="startup">Startup Ecosystem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="5"
                      className="w-full input-field"
                      placeholder="Tell us about your collaboration idea, goals, and how we can work together..."
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Collaboration