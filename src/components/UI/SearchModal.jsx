import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Heart, 
  Shield, 
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useSearch, useVenues } from '../../store/store'
import { useDebounce } from '../../hooks'

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { recentSearches, addRecentSearch } = useSearch()
  const { venues } = useVenues()
  const debouncedQuery = useDebounce(query, 300)

  // Sample search data
  const searchData = [
    { type: 'page', title: 'Eventify Platform', path: '/eventify', icon: Calendar, description: 'Event management and venue booking' },
    { type: 'page', title: 'SOS Emergency', path: '/sos', icon: Shield, description: 'Emergency response system' },
    { type: 'page', title: 'MedGo Healthcare', path: '/medgo', icon: Heart, description: 'Healthcare provider network' },
    { type: 'page', title: 'Research Portal', path: '/research', icon: Sparkles, description: 'Innovation and research hub' },
    { type: 'page', title: 'Collaboration Hub', path: '/collaboration', icon: MessageSquare, description: 'Partnership opportunities' },
    { type: 'venue', title: 'Grand Plaza Hotel', path: '/venue/1', icon: MapPin, description: 'Luxury hotel venue in Mumbai' },
    { type: 'venue', title: 'Sunset Gardens', path: '/venue/2', icon: MapPin, description: 'Outdoor venue with garden views' },
  ]

  const trendingSearches = [
    'Event venues in Mumbai',
    'Emergency response',
    'Healthcare booking',
    'Wedding venues',
    'Corporate events'
  ]

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search functionality
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setIsLoading(true)
      
      // Simulate search delay
      setTimeout(() => {
        const filtered = searchData.filter(item =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        setResults(filtered)
        setIsLoading(false)
        setSelectedIndex(0)
      }, 200)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [debouncedQuery])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const handleSelect = (item) => {
    addRecentSearch(query)
    navigate(item.path)
    onClose()
    setQuery('')
  }

  const handleRecentSearch = (searchTerm) => {
    setQuery(searchTerm)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-neutral-200/50">
            <Search className="w-5 h-5 text-neutral-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for venues, events, or pages..."
              className="flex-1 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-neutral-300 border-t-primary-500 rounded-full animate-spin"></div>
              </div>
            ) : query.length > 0 ? (
              results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={`${result.type}-${result.title}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(result)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 text-left ${
                        index === selectedIndex 
                          ? 'bg-primary-50 border border-primary-200' 
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        result.type === 'page' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        <result.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900">{result.title}</div>
                        <div className="text-sm text-neutral-500">{result.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <div className="text-neutral-500">No results found for "{query}"</div>
                  <div className="text-sm text-neutral-400 mt-2">Try searching for venues, events, or pages</div>
                </div>
              )
            ) : (
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-semibold text-neutral-600">Recent Searches</span>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearch(search)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-600"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-semibold text-neutral-600">Trending</span>
                  </div>
                  <div className="space-y-1">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors duration-200 text-neutral-600"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-neutral-200/50 bg-neutral-50/50">
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs">↑</kbd>
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchModal