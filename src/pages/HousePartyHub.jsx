import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  MessageCircle, 
  Share2, 
  Heart, 
  Star,
  Clock,
  Music,
  Camera,
  Send,
  X,
  Check,
  AlertCircle,
  Filter,
  Grid,
  List,
  DollarSign
} from 'lucide-react'
import { useStore } from '../store/store'
import toast from 'react-hot-toast'

const HousePartyHub = () => {
  const { houseParties, setHouseParties, user } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateParty, setShowCreateParty] = useState(false)
  const [showPartyDetails, setShowPartyDetails] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [filterCategory, setFilterCategory] = useState('all')

  // Sample house party data
  const sampleParties = [
    {
      id: 1,
      title: "Weekend Vibes House Party",
      host: "Priya Sharma",
      hostAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      date: "2024-12-28",
      time: "20:00",
      location: "Andheri West, Mumbai",
      address: "123, Lokhandwala Complex, Andheri West",
      category: "music",
      description: "Join us for an amazing house party with live DJ, great music, and awesome vibes! BYOB welcome.",
      capacity: 50,
      attendees: 32,
      price: 500,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["DJ", "Live Music", "BYOB", "Dance"],
      chat: [
        { id: 1, user: "Rahul", message: "Can't wait for this party! 🎉", time: "2 hours ago" },
        { id: 2, user: "Neha", message: "What's the dress code?", time: "1 hour ago" },
        { id: 3, user: "Priya Sharma", message: "Casual chic! Come ready to dance 💃", time: "30 min ago" }
      ]
    },
    {
      id: 2,
      title: "Gaming Night Extravaganza",
      host: "Amit Patel",
      hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      date: "2024-12-30",
      time: "19:00",
      location: "Bandra East, Mumbai",
      address: "456, Bandra East, Near Station",
      category: "gaming",
      description: "Epic gaming night with PS5, Xbox, and board games. Snacks and drinks provided!",
      capacity: 25,
      attendees: 18,
      price: 300,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Gaming", "PS5", "Board Games", "Snacks"],
      chat: [
        { id: 1, user: "Vikram", message: "Bringing my Switch! 🎮", time: "1 day ago" },
        { id: 2, user: "Amit Patel", message: "Perfect! We'll have Mario Kart tournaments", time: "12 hours ago" }
      ]
    },
    {
      id: 3,
      title: "New Year's Eve Bash",
      host: "Sarah Johnson",
      hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      date: "2024-12-31",
      time: "22:00",
      location: "Worli, Mumbai",
      address: "789, Worli Sea Face, Mumbai",
      category: "celebration",
      description: "Ring in the New Year with style! Live band, fireworks, and champagne toast at midnight.",
      capacity: 100,
      attendees: 87,
      price: 1500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["New Year", "Live Band", "Fireworks", "Champagne"],
      chat: [
        { id: 1, user: "Mike", message: "This is going to be epic! 🎊", time: "3 hours ago" },
        { id: 2, user: "Sarah Johnson", message: "Fireworks confirmed! 🎆", time: "2 hours ago" }
      ]
    }
  ]

  useEffect(() => {
    // Initialize house parties with sample data
    setHouseParties(sampleParties)
  }, [setHouseParties])

  const categories = [
    { id: 'all', name: 'All Parties', icon: Star },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'gaming', name: 'Gaming', icon: Camera },
    { id: 'celebration', name: 'Celebration', icon: Calendar },
    { id: 'food', name: 'Food & Drinks', icon: Users },
    { id: 'other', name: 'Other', icon: Star }
  ]

  const filteredParties = houseParties.filter(party => {
    const matchesSearch = party.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         party.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || party.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const joinParty = (partyId) => {
    setHouseParties(prev => prev.map(party => 
      party.id === partyId 
        ? { ...party, attendees: party.attendees + 1 }
        : party
    ))
    toast.success('You\'ve joined the party!')
  }

  const shareParty = (party) => {
    const shareText = `Check out this amazing party: ${party.title} on ${party.date} at ${party.location}`
    if (navigator.share) {
      navigator.share({
        title: party.title,
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(shareText)
      toast.success('Party details copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            House Party <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover, create, and join amazing house parties. Connect with friends and make unforgettable memories.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search parties by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Create Party Button */}
            <button
              onClick={() => setShowCreateParty(true)}
              className="button-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Party</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    filterCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-white/60">
            Showing {filteredParties.length} of {houseParties.length} parties
          </p>
        </motion.div>

        {/* Parties Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredParties.map((party, index) => (
                <PartyCard key={party.id} party={party} index={index} onJoin={joinParty} onShare={shareParty} onView={setShowPartyDetails} />
              ))}
            </motion.div>
          )}

          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredParties.map((party, index) => (
                <PartyListItem key={party.id} party={party} index={index} onJoin={joinParty} onShare={shareParty} onView={setShowPartyDetails} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredParties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-white mb-2">No parties found</h3>
            <p className="text-white/60 mb-6">
              Try adjusting your search criteria or create the first party!
            </p>
            <button
              onClick={() => setShowCreateParty(true)}
              className="button-primary"
            >
              Create First Party
            </button>
          </motion.div>
        )}
      </div>

      {/* Create Party Modal */}
      <AnimatePresence>
        {showCreateParty && (
          <CreatePartyModal onClose={() => setShowCreateParty(false)} />
        )}
      </AnimatePresence>

      {/* Party Details Modal */}
      <AnimatePresence>
        {showPartyDetails && (
          <PartyDetailsModal party={showPartyDetails} onClose={() => setShowPartyDetails(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// Party Card Component
const PartyCard = ({ party, index, onJoin, onShare, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={party.image}
            alt={party.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price */}
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
            ₹{party.price}
          </div>

          {/* Category */}
          <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-lg text-sm">
            {party.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
              {party.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{party.location}</span>
          </div>

          <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(party.date).toLocaleDateString()}</span>
          </div>

          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {party.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-white/60 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{party.attendees}/{party.capacity}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {party.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-white/10 rounded-lg text-white/80 text-xs">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onJoin(party.id)}
              className="button-primary text-sm px-4 py-2"
            >
              Join Party
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onView(party)}
                className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onShare(party)}
                className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Party List Item Component
const PartyListItem = ({ party, index, onJoin, onShare, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ x: 10 }}
      className="group"
    >
      <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={party.image}
              alt={party.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Price */}
            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
              ₹{party.price}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-2xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                {party.title}
              </h3>
              <div className="text-right">
                <div className="text-primary-400 font-bold">₹{party.price}</div>
                <div className="text-white/60 text-sm">{party.attendees}/{party.capacity} guests</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>{party.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
              <Calendar className="w-4 h-4" />
              <span>{new Date(party.date).toLocaleDateString()} at {party.time}</span>
            </div>

            <p className="text-white/70 mb-4">
              {party.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-white/60 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Hosted by {party.host}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onJoin(party.id)}
                  className="button-primary text-sm px-4 py-2"
                >
                  Join Party
                </button>
                <button
                  onClick={() => onView(party)}
                  className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onShare(party)}
                  className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Create Party Modal Component
const CreatePartyModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    address: '',
    category: '',
    description: '',
    capacity: '',
    price: '',
    tags: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle party creation logic here
    toast.success('Party created successfully!')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="w-full max-w-2xl glass rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-white">Create New Party</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Party Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full input-field"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full input-field"
                required
              >
                <option value="">Select category</option>
                <option value="music">Music</option>
                <option value="gaming">Gaming</option>
                <option value="celebration">Celebration</option>
                <option value="food">Food & Drinks</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full input-field"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full input-field"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Area, City"
                className="w-full input-field"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Entry Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0 for free"
                className="w-full input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Full Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows="2"
              className="w-full input-field"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              className="w-full input-field"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Capacity *</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                placeholder="50"
                className="w-full input-field"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
            >
              Create Party
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Party Details Modal Component
const PartyDetailsModal = ({ party, onClose }) => {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message.trim()) {
      // Handle sending message logic here
      setMessage('')
      toast.success('Message sent!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="w-full max-w-4xl glass rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-white">{party.title}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Party Info */}
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={party.image}
                alt={party.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-white/60">
                <MapPin className="w-4 h-4" />
                <span>{party.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <Calendar className="w-4 h-4" />
                <span>{new Date(party.date).toLocaleDateString()} at {party.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <Users className="w-4 h-4" />
                <span>{party.attendees}/{party.capacity} guests</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <DollarSign className="w-4 h-4" />
                <span>₹{party.price} entry</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Description</h4>
              <p className="text-white/80">{party.description}</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {party.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-lg text-white/80 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Party Chat</h4>
            
            <div className="h-64 bg-white/5 rounded-lg p-4 overflow-y-auto space-y-3">
              {party.chat.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {msg.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-semibold text-sm">{msg.user}</span>
                      <span className="text-white/40 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-white/80 text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 input-field"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HousePartyHub
