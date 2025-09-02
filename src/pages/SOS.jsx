import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Users, 
  Shield, 
  Zap, 
  Clock,
  Check,
  ArrowRight,
  Star,
  MessageCircle,
  Camera,
  Video,
  Globe,
  Building,
  Heart,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  Smartphone,
  Wifi,
  Signal,
  Activity,
  Heart as HeartIcon,
  Thermometer,
  Navigation,
  Volume2,
  Mic,
  Gavel,
  TrendingUp,
  Database,
  Lock,
  Unlock,
  Send,
  Globe2,
  Users2,
  HeartHandshake,
  Target,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  Map,
  Smartphone as PhoneIcon
} from 'lucide-react'

const SOS = () => {
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [expandedTier, setExpandedTier] = useState(null)

  // Software Features Data
  const softwareFeatures = [
    {
      id: 'distress-signal',
      title: 'Distress Signal (SOS) & Media Upload',
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
      summary: 'Live emergency alerts with location, credentials, and media verification',
      details: {
        description: 'Users can send live emergency alerts to the nearest authorities with precise location and credentials.',
        features: [
          'Instant SOS button activation',
          'GPS location tracking and sharing',
          'User credential verification',
          'Image/video upload (5-15s) for incidents',
          'Police/authority verification system',
          'End-to-end verified help chain',
          'Real-time status updates'
        ],
        workflow: 'SOS Trigger → Location & Credentials → Media Upload → Authority Verification → Response Dispatch'
      }
    },
    {
      id: 'social-media',
      title: 'Social Media Handle',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      summary: 'Multi-level social platform for services, support, and verified content',
      details: {
        description: 'Comprehensive social media platform operating at District, State, Country, and Global levels.',
        features: [
          'Multi-level operation (District, State, Country, Global)',
          'Information on available services',
          'Direct support and resource provision to verified victims',
          'Verified incident media posting (user, police, authority)',
          'Business promotion with social-good revenue',
          'Community engagement and awareness',
          'Real-time updates and notifications'
        ],
        levels: [
          { level: 'District', description: 'Local emergency response and community support' },
          { level: 'State', description: 'Regional coordination and resource management' },
          { level: 'Country', description: 'National emergency protocols and standards' },
          { level: 'Global', description: 'International collaboration and best practices' }
        ]
      }
    },
    {
      id: 'ngos',
      title: 'NGOs & Social Sector',
      icon: Heart,
      color: 'from-green-500 to-emerald-500',
      summary: 'Verified NGO profiles and platform-led campaigns for social impact',
      details: {
        description: 'Comprehensive support system for NGOs and social sector organizations operating at all levels.',
        features: [
          'Verified NGO profiles for transparency',
          'Easier contribution system (resources, manpower)',
          'Platform-led campaigns for resource gathering',
          'Multi-level operation support',
          'Transparency and accountability tools',
          'Collaboration and networking features',
          'Impact measurement and reporting'
        ],
        benefits: [
          'Enhanced credibility through verification',
          'Streamlined resource management',
          'Increased community engagement',
          'Better coordination between organizations'
        ]
      }
    },
    {
      id: 'transparency',
      title: 'Resource Transparency List',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      summary: 'Three comprehensive lists with real-time updates for full accountability',
      details: {
        description: 'Complete transparency system with three interconnected lists ensuring full accountability and real-time updates.',
        features: [
          'Real-time updates across all lists',
          'Full audit trail and source tracking',
          'Date, time, outcome, and purpose tracking',
          'Surplus resource management for crisis use',
          'Automated reporting and analytics',
          'Multi-level access controls',
          'Historical data and trend analysis'
        ],
        lists: [
          {
            name: 'Resources Used',
            description: 'Track all resources utilized with date, time, outcome, and purpose',
            icon: TrendingUp
          },
          {
            name: 'Resources Received',
            description: 'Complete audit trail of all received resources and their sources',
            icon: CheckCircle
          },
          {
            name: 'Resources Accumulated',
            description: 'Surplus resources available for crisis situations and emergency use',
            icon: Target
          }
        ]
      }
    },
    {
      id: 'revelations',
      title: 'Revelations/Exposure',
      icon: Eye,
      color: 'from-yellow-500 to-orange-500',
      summary: 'Anonymous reporting system for public, corporate, and state-sponsored issues',
      details: {
        description: 'Secure and anonymous reporting system for various types of atrocities and corruption.',
        features: [
          'Anonymous reporting system',
          'Direct-to-SOS expert team routing',
          'Verified review and action process',
          'State-sponsored fund corruption reporting',
          'Forwarding to administrative heads',
          'Follow-up tracking and updates',
          'Whistleblower protection measures'
        ],
        categories: [
          {
            type: 'Public Atrocities',
            description: 'Direct-to-SOS expert team for immediate review and action',
            icon: AlertCircle
          },
          {
            type: 'Corporate Atrocities',
            description: 'Verified review process with appropriate action protocols',
            icon: Building
          },
          {
            type: 'State Sponsored Fund Corruption',
            description: 'Forwarded to administrative heads for follow-up and investigation',
            icon: Gavel
          }
        ]
      }
    }
  ]

  // Hardware Tiers Data
  const hardwareTiers = [
    {
      id: 'tier1',
      name: 'Tier 1',
      subtitle: 'Full Sensor Suite',
      icon: Activity,
      color: 'from-red-500 to-orange-500',
      price: 'Premium',
      description: 'Complete safety monitoring with all advanced sensors',
      features: [
        { name: 'Impact Detection', icon: Zap, description: 'Advanced impact and fall detection' },
        { name: 'Voice Recognition', icon: Mic, description: 'Voice-activated emergency triggers' },
        { name: 'Geo-location', icon: MapPin, description: 'Precise GPS tracking and location services' },
        { name: 'Vital Monitoring', icon: HeartIcon, description: 'Real-time pulse, temperature, and BP monitoring' },
        { name: 'Emergency Trigger', icon: AlertTriangle, description: 'Manual and automatic emergency activation' }
      ],
      workflow: 'Continuous Monitoring → Anomaly Detection → Emergency Trigger → SOS Alert → Authority Response'
    },
    {
      id: 'tier2',
      name: 'Tier 2',
      subtitle: 'Reduced Sensors',
      icon: Signal,
      color: 'from-blue-500 to-cyan-500',
      price: 'Standard',
      description: 'Essential safety features with core monitoring capabilities',
      features: [
        { name: 'Impact Detection', icon: Zap, description: 'Basic impact and fall detection' },
        { name: 'Voice Recognition', icon: Mic, description: 'Voice command recognition' },
        { name: 'Geo-location', icon: MapPin, description: 'GPS tracking with 15-minute intervals' },
        { name: 'Basic Vitals', icon: HeartIcon, description: 'Basic vital signs monitoring' },
        { name: 'Emergency Trigger', icon: AlertTriangle, description: 'Manual emergency activation' }
      ],
      workflow: 'Periodic Monitoring → Event Detection → Manual Trigger → SOS Alert → Response'
    },
    {
      id: 'tier3',
      name: 'Tier 3',
      subtitle: 'Essential Safety',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      price: 'Basic',
      description: 'Core safety features for basic emergency response',
      features: [
        { name: 'Impact Detection', icon: Zap, description: 'Basic impact detection system' },
        { name: 'Geo-location', icon: MapPin, description: 'Location tracking every 15 minutes' },
        { name: 'Emergency Trigger', icon: AlertTriangle, description: 'Manual emergency button' }
      ],
      workflow: 'Basic Monitoring → Impact Detection → Manual Trigger → SOS Alert → Emergency Response'
    }
  ]

  const toggleFeature = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId)
  }

  const toggleTier = (tierId) => {
    setExpandedTier(expandedTier === tierId ? null : tierId)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            Sankatmochan Outreach Service <span className="gradient-text">(SOS)</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            Empowering communities, enabling transparency, and ensuring rapid, verified emergency response.
          </p>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            SOS is a comprehensive emergency response platform that combines advanced software capabilities 
            with innovative hardware solutions to create a seamless safety network. From instant distress 
            signals to verified media uploads, from multi-level social coordination to complete resource 
            transparency, SOS ensures that help is always within reach.
          </p>
        </motion.div>

        {/* Software Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Software <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Five core software segments working together to create a comprehensive emergency response ecosystem.
            </p>
          </div>

          <div className="space-y-6">
            {softwareFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/70">{feature.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white/60 text-sm">Click to expand</span>
                    {expandedFeature === feature.id ? (
                      <ChevronUp className="w-6 h-6 text-white/60" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white/60" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 space-y-6">
                        <p className="text-white/80 leading-relaxed">{feature.details.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                            <ul className="space-y-2">
                              {feature.details.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-white/70">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {feature.details.levels && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">Operation Levels</h4>
                              <div className="space-y-3">
                                {feature.details.levels.map((level, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                                    </div>
                                    <div>
                                      <div className="text-white font-medium">{level.level}</div>
                                      <div className="text-white/60 text-sm">{level.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {feature.details.lists && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">Transparency Lists</h4>
                              <div className="space-y-3">
                                {feature.details.lists.map((list, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <list.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-white font-medium">{list.name}</div>
                                      <div className="text-white/60 text-sm">{list.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {feature.details.categories && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">Report Categories</h4>
                              <div className="space-y-3">
                                {feature.details.categories.map((category, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <category.icon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-white font-medium">{category.type}</div>
                                      <div className="text-white/60 text-sm">{category.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {feature.details.benefits && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">Benefits</h4>
                              <ul className="space-y-2">
                                {feature.details.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start space-x-3">
                                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {feature.details.workflow && (
                          <div className="bg-white/5 rounded-xl p-4">
                            <h4 className="text-lg font-semibold text-white mb-3">Workflow</h4>
                            <div className="flex items-center justify-center space-x-2 text-white/80">
                              {feature.details.workflow.split(' → ').map((step, idx) => (
                                <div key={idx} className="flex items-center">
                                  <span className="text-sm">{step}</span>
                                  {idx < feature.details.workflow.split(' → ').length - 1 && (
                                    <ArrowRight className="w-4 h-4 mx-2 text-white/40" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Complete <span className="gradient-text">Workflow</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              End-to-end emergency response process from trigger to resolution
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {[
                { step: 'SOS Trigger', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
                { step: 'Media Verification', icon: Camera, color: 'from-blue-500 to-cyan-500' },
                { step: 'Authority Response', icon: Shield, color: 'from-green-500 to-emerald-500' },
                { step: 'Social & Resource Support', icon: Users, color: 'from-purple-500 to-pink-500' },
                { step: 'Transparency Reporting', icon: Database, color: 'from-yellow-500 to-orange-500' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.step}</h3>
                  {index < 4 && (
                    <div className="hidden md:block">
                      <ArrowRight className="w-6 h-6 text-white/40 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hardware Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              SOS Smart Bracelet: <span className="gradient-text">Always-On Safety</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Our innovative hardware extension ensures safety even in low-connectivity or phone-less contexts, 
              making emergency response accessible to everyone regardless of their technological access.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              The SOS Smart Bracelet operates independently of smartphones, providing continuous monitoring 
              and instant emergency response capabilities through three distinct tiers designed for different 
              needs and accessibility levels.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {hardwareTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                      <tier.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-lg text-white/80 mb-1">{tier.subtitle}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                      {tier.price}
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 text-center">{tier.description}</p>

                  <button
                    onClick={() => toggleTier(tier.id)}
                    className="w-full mb-6 flex items-center justify-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <span>View Details</span>
                    {expandedTier === tier.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedTier === tier.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-6"
                      >
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                          {tier.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <feature.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-white font-medium">{feature.name}</div>
                                <div className="text-white/60 text-sm">{feature.description}</div>
                              </div>
                            </div>
                          ))}

                          <div className="bg-white/5 rounded-xl p-4 mt-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Emergency Workflow</h4>
                            <div className="text-sm text-white/70 space-y-1">
                              {tier.workflow.split(' → ').map((step, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </div>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Join the <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Be part of the solution. Whether you're a volunteer, NGO, supporter, or someone who believes 
              in making communities safer, there's a place for you in the SOS network.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                to="/contact"
                className="group glass rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <HeartHandshake className="w-12 h-12 text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-2">Get Involved</h3>
                <p className="text-white/70 text-sm">Join as a volunteer, NGO, or supporter</p>
              </Link>

              <a
                href="#"
                className="group glass rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <Download className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-2">Download SOS App</h3>
                <p className="text-white/70 text-sm">Get the app for instant emergency response</p>
              </a>

              <Link
                to="/contact"
                className="group glass rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-2">Contact SOS Team</h3>
                <p className="text-white/70 text-sm">Get in touch for partnerships and support</p>
              </Link>
            </div>

            <div className="mt-12">
              <Link
                to="/contact"
                className="button-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SOS
