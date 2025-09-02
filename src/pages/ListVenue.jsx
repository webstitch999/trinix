import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Users, 
  DollarSign, 
  Wifi, 
  Car, 
  Music, 
  Camera,
  Star,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Trash2
} from 'lucide-react'
import { useStore } from '../store/store'
import toast from 'react-hot-toast'

const ListVenue = () => {
  const { addVenue } = useStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    description: '',
    longDescription: '',
    price: '',
    capacity: '',
    category: '',
    amenities: [],
    images: []
  })
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const steps = [
    { id: 1, title: 'Basic Information', icon: MapPin },
    { id: 2, title: 'Pricing & Capacity', icon: DollarSign },
    { id: 3, title: 'Amenities', icon: Star },
    { id: 4, title: 'Photos', icon: ImageIcon },
    { id: 5, title: 'Review & Submit', icon: Check }
  ]

  const categories = [
    { id: 'hotel', name: 'Hotel' },
    { id: 'outdoor', name: 'Outdoor' },
    { id: 'conference', name: 'Conference Center' },
    { id: 'heritage', name: 'Heritage' },
    { id: 'resort', name: 'Resort' },
    { id: 'loft', name: 'Loft' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'other', name: 'Other' }
  ]

  const availableAmenities = [
    { id: 'wifi', name: 'Free WiFi', icon: Wifi },
    { id: 'parking', name: 'Free Parking', icon: Car },
    { id: 'catering', name: 'Catering Services', icon: Users },
    { id: 'audio', name: 'Audio System', icon: Music },
    { id: 'video', name: 'Video System', icon: Camera },
    { id: 'decorations', name: 'Decorations', icon: Star },
    { id: 'accommodation', name: 'Accommodation', icon: Users },
    { id: 'kitchen', name: 'Kitchen', icon: Star },
    { id: 'garden', name: 'Garden', icon: Star },
    { id: 'beach', name: 'Beach Access', icon: Star }
  ]

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
    toast.success(`${acceptedFiles.length} image(s) uploaded successfully!`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10,
    maxSize: 5242880 // 5MB
  })

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }))
  }

  const toggleAmenity = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }))
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['name', 'location', 'price', 'capacity', 'category']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`)
      return
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    // Create venue object
    const newVenue = {
      id: Date.now(),
      ...formData,
      price: parseInt(formData.price),
      capacity: parseInt(formData.capacity),
      rating: 0,
      reviews: 0,
      owner: {
        name: 'Your Name',
        phone: '+91 98765 43210',
        email: 'owner@venue.com',
        responseTime: '2 hours'
      },
      pricing: {
        basePrice: parseInt(formData.price),
        perPerson: 500,
        deposit: Math.floor(parseInt(formData.price) * 0.2),
        cancellationPolicy: 'Full refund up to 7 days before event'
      },
      availability: {
        minNotice: 7,
        maxAdvanceBooking: 365,
        popularDates: []
      }
    }

    addVenue(newVenue)
    setShowConfirmation(true)
    toast.success('Venue listed successfully!')
  }

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.location && formData.description
      case 2:
        return formData.price && formData.capacity && formData.category
      case 3:
        return formData.amenities.length > 0
      case 4:
        return formData.images.length > 0
      default:
        return true
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
            List Your <span className="gradient-text">Venue</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Share your amazing venue with event organizers and start earning. Complete the form below to get started.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`font-semibold transition-colors ${
                        currentStep >= step.id ? 'text-white' : 'text-white/60'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-colors ${
                      currentStep > step.id ? 'bg-primary-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass rounded-2xl p-8"
          >
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2">Venue Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter your venue name"
                    className="w-full input-field"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="City, State"
                    className="w-full input-field"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Full Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="Complete address of your venue"
                    rows="3"
                    className="w-full input-field"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Short Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Brief description of your venue (max 200 characters)"
                    rows="3"
                    maxLength="200"
                    className="w-full input-field"
                  />
                  <div className="text-right text-white/40 text-sm mt-1">
                    {formData.description.length}/200
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Detailed Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => updateFormData('longDescription', e.target.value)}
                    placeholder="Detailed description of your venue, facilities, and what makes it special"
                    rows="5"
                    className="w-full input-field"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Capacity */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Pricing & Capacity</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Base Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateFormData('price', e.target.value)}
                      placeholder="25000"
                      min="0"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Maximum Capacity *</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => updateFormData('capacity', e.target.value)}
                      placeholder="200"
                      min="1"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Venue Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    className="w-full input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Pricing Information</h3>
                  <div className="space-y-2 text-white/80 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>₹{formData.price || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per Person (estimated):</span>
                      <span>₹500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deposit Required:</span>
                      <span>₹{formData.price ? Math.floor(parseInt(formData.price) * 0.2) : 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Amenities & Features</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {availableAmenities.map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
                        formData.amenities.includes(amenity.id)
                          ? 'border-primary-500 bg-primary-500/10 text-white'
                          : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                      }`}
                    >
                      <amenity.icon className="w-5 h-5" />
                      <span>{amenity.name}</span>
                      {formData.amenities.includes(amenity.id) && (
                        <Check className="w-5 h-5 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>

                {formData.amenities.length === 0 && (
                  <div className="text-center py-8 text-white/60">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>Select at least one amenity to continue</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Venue Photos</h2>
                
                {/* Upload Area */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
                  {isDragActive ? (
                    <p className="text-white">Drop the images here...</p>
                  ) : (
                    <div>
                      <p className="text-white font-semibold mb-2">Upload Venue Photos</p>
                      <p className="text-white/60 text-sm">
                        Drag & drop images here, or click to select files
                      </p>
                      <p className="text-white/40 text-xs mt-2">
                        Max 10 images, 5MB each. Supported: JPG, PNG, WebP
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-4">Uploaded Images ({formData.images.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt="Venue"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Review & Submit</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Venue Preview</h3>
                    <div className="glass rounded-lg p-4">
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        {formData.images.length > 0 ? (
                          <img
                            src={formData.images[0].preview}
                            alt={formData.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-white/40" />
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-white font-semibold mb-2">{formData.name}</h4>
                      <p className="text-white/60 text-sm mb-2">{formData.location}</p>
                      <p className="text-white/80 text-sm mb-3">{formData.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-primary-400 font-bold">₹{formData.price}</div>
                        <div className="text-white/60 text-sm">{formData.capacity} guests</div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Venue Details</h3>
                    <div className="space-y-3 text-white/80 text-sm">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="text-white">{categories.find(c => c.id === formData.category)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span className="text-white">₹{formData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="text-white">{formData.capacity} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amenities:</span>
                        <span className="text-white">{formData.amenities.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Images:</span>
                        <span className="text-white">{formData.images.length} uploaded</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-400 mb-2">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Ready to Submit</span>
                      </div>
                      <p className="text-white/80 text-sm">
                        Your venue will be reviewed and published within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                {currentStep === steps.length ? (
                  <button
                    onClick={handleSubmit}
                    className="button-primary flex items-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Submit Venue</span>
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className="button-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="w-full max-w-md glass rounded-2xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">Venue Listed Successfully!</h3>
              <p className="text-white/80 mb-6">
                Your venue "{formData.name}" has been submitted for review. We'll notify you once it's published.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    window.location.href = '/eventify'
                  }}
                  className="w-full button-primary"
                >
                  View All Venues
                </button>
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    setCurrentStep(1)
                    setFormData({
                      name: '',
                      location: '',
                      address: '',
                      description: '',
                      longDescription: '',
                      price: '',
                      capacity: '',
                      category: '',
                      amenities: [],
                      images: []
                    })
                  }}
                  className="w-full button-secondary"
                >
                  List Another Venue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ListVenue
