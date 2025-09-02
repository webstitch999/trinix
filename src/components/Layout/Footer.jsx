import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin 
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Mission', path: '/about#mission' },
      { name: 'Team', path: '/about#team' },
    ],
    products: [
      { name: 'Eventify', path: '/eventify' },
      { name: 'SOS', path: '/sos' },
      { name: 'MedGo', path: '/medgo' },
      { name: 'House Party Hub', path: '/house-party-hub' },
    ],
    resources: [
      { name: 'Research Portal', path: '/research' },
      { name: 'Documentation', path: '/docs' },
      { name: 'API Reference', path: '/api' },
      { name: 'Blog', path: '/blog' },
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Help Center', path: '/help' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/trinix' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/trinix' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/trinix' },
    { name: 'Email', icon: Mail, url: 'mailto:hello@trinix.com' },
  ]

  return (
    <footer className="relative bg-neutral-50 border-t border-neutral-200">
      <div className="container-custom px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-neutral-900 font-display font-bold text-xl">
                  Trinix
                </h3>
                <p className="text-sm text-neutral-500">Innovation Hub</p>
              </div>
            </Link>
            
            <p className="text-neutral-600 mb-6 leading-relaxed max-w-md">
              Empowering the future through innovative technology solutions. 
              We build cutting-edge applications that transform industries and enhance lives.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-600">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@trinix.com" className="hover:text-primary-600 transition-colors">
                  hello@trinix.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <Phone className="w-4 h-4" />
                <a href="tel:+91-123-456-7890" className="hover:text-primary-600 transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-neutral-900 font-semibold mb-4 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Trinix. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-600 transition-colors duration-200 p-2 rounded-lg hover:bg-neutral-100"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="text-neutral-500 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


