import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Users, 
  Award, 
  Globe, 
  Zap, 
  Heart, 
  Shield, 
  Rocket,
  Star,
  MapPin,
  Calendar,
  Check
} from 'lucide-react'

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, value: '15+', label: 'Years Experience', color: 'from-yellow-500 to-orange-500' },
    { icon: Globe, value: '25+', label: 'Countries Served', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, value: '99.9%', label: 'Uptime', color: 'from-purple-500 to-pink-500' },
  ]

  const values = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technology to solve real-world problems.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'User-Centric Design',
      description: 'Every feature is crafted with our users in mind, ensuring intuitive and powerful experiences.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Reliability & Trust',
      description: 'Our platforms are built for mission-critical operations with enterprise-grade security.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We\'re committed to making a positive difference in communities worldwide.',
      color: 'from-purple-500 to-indigo-500'
    }
  ]

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Visionary leader with 15+ years in tech innovation and business strategy.',
      linkedin: '#'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Technology expert driving our platform architecture and development.',
      linkedin: '#'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Product strategist focused on user experience and market growth.',
      linkedin: '#'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Operations specialist ensuring seamless service delivery worldwide.',
      linkedin: '#'
    }
  ]

  const milestones = [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Trinix was established with a vision to revolutionize digital solutions.'
    },
    {
      year: '2012',
      title: 'First Major Platform',
      description: 'Launched our first enterprise platform serving 10,000+ users.'
    },
    {
      year: '2018',
      title: 'International Expansion',
      description: 'Expanded operations to 15+ countries across Asia and Europe.'
    },
    {
      year: '2023',
      title: 'Platform Evolution',
      description: 'Introduced Eventify, SOS, and MedGo platforms serving 50,000+ users.'
    }
  ]

  const coverage = [
    {
      title: 'Eventify Platform',
      description: 'Revolutionary event management connecting venues, organizers, and attendees.',
      stats: { venues: '1,250+', events: '3,400+', users: '12,500+' },
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'SOS Emergency Network',
      description: 'Emergency response system ensuring rapid assistance and safety.',
      stats: { response: '< 2min', coverage: '95%', users: '50,000+' },
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'MedGo Healthcare',
      description: 'Healthcare provider network streamlining medical appointments.',
      stats: { doctors: '850+', patients: '25,000+', rating: '4.8' },
      color: 'from-green-500 to-blue-500'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            About <span className="gradient-text">Trinix</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We're building the future of digital solutions, one innovation at a time. 
            Discover our journey, meet our team, and learn about our mission to transform how people connect and collaborate.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">
              Our <span className="gradient-text">Story</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Founded in 2008, Trinix Pvt. Ltd. has been at the forefront of digital innovation, 
              creating solutions that bridge the gap between technology and human needs.
            </p>
            <p className="text-white/70 leading-relaxed">
              What started as a small team of passionate developers has grown into a global 
              technology company serving thousands of users across 25+ countries. Our mission 
              is to empower communities through technology, whether it's connecting people 
              during emergencies, streamlining healthcare access, or creating unforgettable events.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="button-primary flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Our Story</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Trinix Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The passionate individuals behind our innovative solutions and continued success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <div className="text-primary-400 font-medium mb-3">{member.role}</div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-sm">View Profile</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Our <span className="gradient-text">Coverage</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive solutions serving diverse needs across multiple industries.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {coverage.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-2xl p-8"
              >
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{platform.title}</h3>
                <p className="text-white/70 leading-relaxed mb-6">{platform.description}</p>
                <div className="space-y-3">
                  {Object.entries(platform.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-white/60 capitalize">{key}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and success over the years.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-8">
                    <div className="glass rounded-2xl p-6">
                      <div className="text-2xl font-bold text-primary-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{milestone.title}</h3>
                      <p className="text-white/70 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary-500 rounded-full border-4 border-white"></div>
                  <div className="w-1/2 px-8"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're looking to use our platforms or join our team, 
              we'd love to hear from you and explore how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="button-primary">
                Explore Our Solutions
              </button>
              <button className="button-secondary">
                Join Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoPlaying ? 1 : 0 }}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
          isVideoPlaying ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsVideoPlaying(false)}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: isVideoPlaying ? 1 : 0.8 }}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Company Story Video</p>
              <p className="text-sm text-white/60 mt-2">
                Our journey and mission video coming soon
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVideoPlaying(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About
