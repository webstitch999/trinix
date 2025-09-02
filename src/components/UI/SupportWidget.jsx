import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  MessageSquare,
  HelpCircle,
  Bot
} from 'lucide-react'
import { useUI } from '../../store/store'

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { addNotification } = useUI()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsTyping(true)
    
    // Simulate sending message
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Message Sent',
        message: 'We\'ll get back to you within 24 hours.',
        duration: 5000
      })
      setMessage('')
      setIsTyping(false)
    }, 2000)
  }, [message, addNotification])

  const supportOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      action: () => window.open('tel:+91-123-456-7890', '_self')
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email',
      action: () => window.open('mailto:support@trinix.com', '_self')
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team',
      action: () => {
        addNotification({
          type: 'info',
          title: 'Live Chat',
          message: 'Live chat feature coming soon!',
          duration: 3000
        })
      }
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get instant help',
      action: () => {
        addNotification({
          type: 'info',
          title: 'AI Assistant',
          message: 'AI assistant feature coming soon!',
          duration: 3000
        })
      }
    }
  ]

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        aria-label="Open support chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Support Center</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-white/90">How can we help you today?</p>
              </div>

              {/* Support Options */}
              <div className="p-6 space-y-4">
                {supportOptions.map((option, index) => (
                  <motion.button
                    key={option.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={option.action}
                    className="w-full p-4 border border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 mb-1">{option.title}</h4>
                        <p className="text-sm text-neutral-600">{option.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Message */}
              <div className="p-6 border-t border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-3">Send us a quick message</h4>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!message.trim() || isTyping}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTyping ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SupportWidget



