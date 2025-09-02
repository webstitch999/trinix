import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  Calendar, 
  Clock, 
  DollarSign, 
  Wifi, 
  Car, 
  Music, 
  Camera,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen
} from 'lucide-react'
import { useStore } from '../store/store'
import toast from 'react-hot-toast'

const VenueDetails = () => {
  const { id } = useParams()
  const { venues, addFavorite, isFavorite, addBooking } = useStore()
  const [venue, setVenue] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [guestCount, setGuestCount] = useState(50)
  const [eventType, setEventType] = useState('wedding')

  // Sample venue data with detailed information
  const sampleVenueDetails = {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Mumbai, Maharashtra",
    address: "123 Marine Drive, Colaba, Mumbai 400001",
    price: 25000,
    capacity: 200,
    rating: 4.8,
    reviewCount: 124,
    description: "Luxurious hotel venue perfect for corporate events and weddings. Located in the heart of Mumbai with stunning views of the Arabian Sea.",
    longDescription: "The Grand Plaza Hotel offers an unparalleled venue experience for your special events. Our elegant ballroom features crystal chandeliers, marble floors, and floor-to-ceiling windows with breathtaking views of the Arabian Sea. Perfect for weddings, corporate events, and social gatherings.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      { id: 'wifi', name: 'Free WiFi', icon: Wifi, description: 'High-speed internet throughout the venue' },
      { id: 'parking', name: 'Free Parking', icon: Car, description: 'Secure parking for up to 100 vehicles' },
      { id: 'catering', name: 'Catering Services', icon: Users, description: 'Professional catering with customizable menus' },
      { id: 'audio', name: 'Audio System', icon: Music, description: 'Professional sound system with microphones' },
      { id: 'video', name: 'Video System', icon: Camera, description: 'Projector and screen for presentations' },
      { id: 'decorations', name: 'Decorations', icon: Star, description: 'Custom decoration services available' }
    ],
    category: 'hotel',
    owner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@grandplaza.com',
      responseTime: '2 hours'
    },
    pricing: {
      basePrice: 25000,
      perPerson: 500,
      deposit: 5000,
      cancellationPolicy: 'Full refund up to 7 days before event'
    },
    availability: {
      minNotice: 7,
      maxAdvanceBooking: 365,
      popularDates: ['2024-12-25', '2024-12-31', '2025-02-14']
    },
    reviews: [
      {
        id: 1,
        name: 'Priya Sharma',
        rating: 5,
        date: '2024-11-15',
        text: 'Amazing venue! The staff was incredibly helpful and the space was perfect for our wedding reception.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 2,
        name: 'Amit Patel',
        rating: 4,
        date: '2024-11-10',
        text: 'Great venue for corporate events. The audio-visual equipment was top-notch.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
      }
    ]
  }

  useEffect(() => {
    // Simulate fetching venue details
    setVenue(sampleVenueDetails)
  }, [id])

  if (!venue) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-white text-xl">Loading venue details</div>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error('Please select a date for your event')
      return
    }
    
    const booking = {
      id: Date.now(),
      venueId: venue.id,
      venueName: venue.name,
      date: selectedDate,
      guestCount,
      eventType,
      totalPrice: venue.pricing.basePrice + (guestCount * venue.pricing.perPerson),
      status: 'pending'
    }
    
    addBooking(booking)
    setShowBooking(false)
    toast.success('Booking request submitted successfully!')
  }

  const shareVenue = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: `Check out this amazing venue: ${venue.name}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/eventify"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Venues</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setShowGallery(true)}>
                <img
                  src={venue.images[selectedImage]}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addFavorite(venue)
                  }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isFavorite(venue.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    shareVenue()
                  }}
                  className="absolute top-4 right-16 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                  {selectedImage + 1} / {venue.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2">
                {venue.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Venue Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                    {venue.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-white/60">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{venue.rating} ({venue.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-400">
                    ₹{venue.price.toLocaleString()}
                  </div>
                  <div className="text-white/60 text-sm">per event</div>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {venue.longDescription}
              </p>

              {/* Key Features */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-primary-400" />
                  <div>
                    <div className="text-white font-semibold">{venue.capacity}</div>
                    <div className="text-white/60 text-sm">Max Capacity</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-primary-400" />
                  <div>
                    <div className="text-white font-semibold">{venue.availability.minNotice} days</div>
                    <div className="text-white/60 text-sm">Min Notice</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-primary-400" />
                  <div>
                    <div className="text-white font-semibold">{venue.owner.responseTime}</div>
                    <div className="text-white/60 text-sm">Response Time</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Amenities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-3">
                      <amenity.icon className="w-5 h-5 text-primary-400" />
                      <div>
                        <div className="text-white font-medium">{amenity.name}</div>
                        <div className="text-white/60 text-sm">{amenity.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Reviews</h3>
              <div className="space-y-6">
                {venue.reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/10 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-white font-semibold">{review.name}</div>
                            <div className="text-white/60 text-sm">{review.date}</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/80">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  ₹{venue.price.toLocaleString()}
                </div>
                <div className="text-white/60">per event</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-white/80">
                  <span>Base Price</span>
                  <span>₹{venue.pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span>Per Person</span>
                  <span>₹{venue.pricing.perPerson}</span>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span>Deposit Required</span>
                  <span>₹{venue.pricing.deposit.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span>Total (50 guests)</span>
                    <span>₹{(venue.pricing.basePrice + (50 * venue.pricing.perPerson)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full button-primary flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Book Now</span>
                </button>
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full button-secondary flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Owner</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-center text-white/60 text-sm">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Free Cancellation</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Owner Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Venue Owner</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{venue.owner.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{venue.owner.name}</div>
                    <div className="text-white/60 text-sm">Response time: {venue.owner.responseTime}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>{venue.owner.phone}</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>{venue.owner.email}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
                <img
                  src={venue.images[selectedImage]}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : venue.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => setSelectedImage(selectedImage < venue.images.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-5 gap-2">
                {venue.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : 'hover:opacity-80'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="w-full max-w-md glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Book This Venue</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Event Date</label>
                  <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full input-field"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Number of Guests</label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    min="1"
                    max={venue.capacity}
                    className="w-full input-field"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full input-field"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between text-white/80 mb-2">
                    <span>Base Price</span>
                    <span>₹{venue.pricing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 mb-2">
                    <span>Per Person ({guestCount} guests)</span>
                    <span>₹{(guestCount * venue.pricing.perPerson).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{(venue.pricing.basePrice + (guestCount * venue.pricing.perPerson)).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full button-primary"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="w-full max-w-md glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Contact Owner</h3>
                <button
                  onClick={() => setShowContact(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <div>
                    <div className="text-white font-semibold">Call Owner</div>
                    <div className="text-white/60 text-sm">{venue.owner.phone}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <div>
                    <div className="text-white font-semibold">Send Email</div>
                    <div className="text-white/60 text-sm">{venue.owner.email}</div>
                  </div>
                </div>

                <div className="text-center text-white/60 text-sm">
                  Response time: {venue.owner.responseTime}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VenueDetails
