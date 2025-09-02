import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Bell, 
  Check, 
  Trash2, 
  Settings,
  Calendar,
  Heart,
  Shield,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useUI } from '../../store/store'
import { formatRelativeTime } from '../../utils'

const NotificationCenter = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, removeNotification, clearAllNotifications } = useUI()

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle
      case 'error': return AlertTriangle
      case 'info': return Info
      case 'booking': return Calendar
      case 'favorite': return Heart
      case 'emergency': return Shield
      default: return Bell
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      case 'info': return 'text-blue-500'
      case 'booking': return 'text-purple-500'
      case 'favorite': return 'text-pink-500'
      case 'emergency': return 'text-red-500'
      default: return 'text-neutral-500'
    }
  }

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id)
  }

  const handleRemove = (id) => {
    removeNotification(id)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-end pt-20 pr-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.95 }}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-neutral-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4 text-neutral-500" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-2">
                {notifications.map((notification, index) => {
                  const IconComponent = getNotificationIcon(notification.type)
                  const iconColor = getNotificationColor(notification.type)
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative p-4 rounded-xl mb-2 transition-all duration-200 cursor-pointer group ${
                        notification.read 
                          ? 'bg-neutral-50 hover:bg-neutral-100' 
                          : 'bg-primary-50 hover:bg-primary-100 border border-primary-200'
                      }`}
                      onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          notification.read ? 'bg-neutral-200' : 'bg-white'
                        }`}>
                          <IconComponent className={`w-4 h-4 ${iconColor}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-semibold ${
                              notification.read ? 'text-neutral-700' : 'text-neutral-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemove(notification.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 transition-all duration-200"
                            >
                              <X className="w-3 h-3 text-neutral-500" />
                            </button>
                          </div>
                          
                          <p className={`text-sm mt-1 ${
                            notification.read ? 'text-neutral-500' : 'text-neutral-600'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-neutral-400">
                              {formatRelativeTime(notification.createdAt)}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMarkAsRead(notification.id)
                                }}
                                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <div className="text-neutral-500 font-medium">No notifications</div>
                <div className="text-sm text-neutral-400 mt-1">You're all caught up!</div>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-neutral-200/50 bg-neutral-50/50">
              <div className="flex items-center justify-between">
                <button className="text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Notification Settings</span>
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-neutral-600 hover:text-red-600 transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default NotificationCenter