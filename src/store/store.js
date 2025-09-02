import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Enhanced store with better organization and performance
const createAppStore = () => {
  return create(
    subscribeWithSelector(
      persist(
        immer((set, get) => ({
          // ===== THEME & UI STATE =====
          theme: {
            mode: 'light',
            system: false,
            toggle: () => set((state) => {
              state.theme.mode = state.theme.mode === 'dark' ? 'light' : 'dark'
            }),
            setSystem: (enabled) => set((state) => {
              state.theme.system = enabled
              if (enabled) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                state.theme.mode = prefersDark ? 'dark' : 'light'
              }
            }),
          },

          // ===== AUTHENTICATION =====
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            
            login: (email, password) => {
              set((state) => {
                state.auth.isLoading = true
                state.auth.error = null
              })
              
              try {
                // Demo credentials
                if (email === 'admin@trinix.com' && password === 'admin123') {
                  const user = {
                    id: '1',
                    email: email,
                    name: 'Admin User',
                    role: 'admin',
                    avatar: null,
                    preferences: {
                      notifications: true,
                      emailUpdates: true,
                      theme: 'system'
                    },
                    createdAt: new Date().toISOString()
                  }
                  
                  set((state) => {
                    state.auth.user = user
                    state.auth.isAuthenticated = true
                    state.auth.isLoading = false
                  })
                  
                  return { success: true, user }
                } else {
                  set((state) => {
                    state.auth.error = 'Invalid credentials'
                    state.auth.isLoading = false
                  })
                  return { success: false, error: 'Invalid credentials' }
                }
              } catch (error) {
                set((state) => {
                  state.auth.error = error.message
                  state.auth.isLoading = false
                })
                return { success: false, error: error.message }
              }
            },
            
            logout: () => set((state) => {
              state.auth.user = null
              state.auth.isAuthenticated = false
              state.auth.error = null
            }),
            
            updateProfile: (updates) => set((state) => {
              if (state.auth.user) {
                state.auth.user = { ...state.auth.user, ...updates }
              }
            }),
          },

          // ===== ENHANCED UI STATE =====
          ui: {
            sidebarOpen: false,
            modals: {
              research: false,
              support: false,
              booking: false,
              venueList: false,
              search: false,
              notifications: false,
            },
            notifications: [
              {
                id: '1',
                type: 'success',
                title: 'Welcome to Trinix!',
                message: 'Explore our innovative platforms and discover amazing features.',
                read: false,
                createdAt: new Date().toISOString()
              },
              {
                id: '2',
                type: 'info',
                title: 'New Feature Available',
                message: 'Check out our enhanced search functionality with AI-powered recommendations.',
                read: false,
                createdAt: new Date(Date.now() - 3600000).toISOString()
              }
            ],
            loadingStates: {
              venues: false,
              bookings: false,
              user: false,
              search: false,
            },
            
            toggleSidebar: () => set((state) => {
              state.ui.sidebarOpen = !state.ui.sidebarOpen
            }),
            
            openModal: (modalName) => set((state) => {
              state.ui.modals[modalName] = true
            }),
            
            closeModal: (modalName) => set((state) => {
              state.ui.modals[modalName] = false
            }),
            
            addNotification: (notification) => set((state) => {
              const id = Date.now().toString()
              state.ui.notifications.unshift({
                id,
                type: 'info',
                title: '',
                message: '',
                read: false,
                createdAt: new Date().toISOString(),
                ...notification,
              })
              
              // Keep only last 50 notifications
              if (state.ui.notifications.length > 50) {
                state.ui.notifications = state.ui.notifications.slice(0, 50)
              }
            }),
            
            removeNotification: (id) => set((state) => {
              state.ui.notifications = state.ui.notifications.filter(n => n.id !== id)
            }),
            
            markNotificationAsRead: (id) => set((state) => {
              const notification = state.ui.notifications.find(n => n.id === id)
              if (notification) {
                notification.read = true
              }
            }),
            
            clearAllNotifications: () => set((state) => {
              state.ui.notifications = []
            }),
            
            setLoading: (key, value) => set((state) => {
              state.ui.loadingStates[key] = value
            }),
          },

          // ===== ENHANCED SEARCH & FILTERS =====
          search: {
            query: '',
            filters: {
              category: 'all',
              priceRange: [0, 100000],
              location: '',
              amenities: [],
              dateRange: null,
              rating: 0,
              capacity: null,
            },
            recentSearches: [],
            suggestions: [],
            
            setQuery: (query) => set((state) => {
              state.search.query = query
            }),
            
            setFilters: (filters) => set((state) => {
              state.search.filters = { ...state.search.filters, ...filters }
            }),
            
            addRecentSearch: (search) => set((state) => {
              if (search.trim()) {
                const searches = state.search.recentSearches.filter(s => s !== search)
                state.search.recentSearches = [search, ...searches].slice(0, 10)
              }
            }),
            
            clearRecentSearches: () => set((state) => {
              state.search.recentSearches = []
            }),
            
            setSuggestions: (suggestions) => set((state) => {
              state.search.suggestions = suggestions
            }),
          },

          // ===== ENHANCED VENUES =====
          venues: {
            items: [],
            favorites: [],
            isLoading: false,
            error: null,
            categories: ['all', 'hotel', 'outdoor', 'conference', 'heritage', 'resort', 'restaurant'],
            
            setVenues: (venues) => set((state) => {
              state.venues.items = venues
            }),
            
            addVenue: (venue) => set((state) => {
              const newVenue = {
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'pending',
                views: 0,
                bookings: 0,
                ...venue,
              }
              state.venues.items.unshift(newVenue)
            }),
            
            updateVenue: (id, updates) => set((state) => {
              const index = state.venues.items.findIndex(v => v.id === id)
              if (index !== -1) {
                state.venues.items[index] = { ...state.venues.items[index], ...updates }
              }
            }),
            
            removeVenue: (id) => set((state) => {
              state.venues.items = state.venues.items.filter(v => v.id !== id)
              state.venues.favorites = state.venues.favorites.filter(fId => fId !== id)
            }),
            
            addFavorite: (venue) => set((state) => {
              if (!state.venues.favorites.includes(venue.id)) {
                state.venues.favorites.push(venue.id)
                
                // Add notification
                state.ui.notifications.unshift({
                  id: Date.now().toString(),
                  type: 'favorite',
                  title: 'Added to Favorites',
                  message: `${venue.name} has been added to your favorites.`,
                  read: false,
                  createdAt: new Date().toISOString()
                })
              }
            }),
            
            removeFavorite: (venueId) => set((state) => {
              state.venues.favorites = state.venues.favorites.filter(id => id !== venueId)
            }),
            
            isFavorite: (venueId) => get().venues.favorites.includes(venueId),
            
            incrementViews: (venueId) => set((state) => {
              const venue = state.venues.items.find(v => v.id === venueId)
              if (venue) {
                venue.views = (venue.views || 0) + 1
              }
            }),
          },

          // ===== ENHANCED BOOKINGS =====
          bookings: {
            items: [],
            isLoading: false,
            error: null,
            
            addBooking: (booking) => set((state) => {
              const newBooking = {
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'pending',
                paymentStatus: 'pending',
                ...booking,
              }
              state.bookings.items.unshift(newBooking)
              
              // Add notification
              state.ui.notifications.unshift({
                id: Date.now().toString(),
                type: 'booking',
                title: 'Booking Confirmed',
                message: `Your booking for ${booking.venueName} has been submitted.`,
                read: false,
                createdAt: new Date().toISOString()
              })
            }),
            
            updateBooking: (id, updates) => set((state) => {
              const index = state.bookings.items.findIndex(b => b.id === id)
              if (index !== -1) {
                state.bookings.items[index] = { ...state.bookings.items[index], ...updates }
              }
            }),
            
            removeBooking: (id) => set((state) => {
              state.bookings.items = state.bookings.items.filter(b => b.id !== id)
            }),
            
            getBookingsByStatus: (status) => {
              return get().bookings.items.filter(b => b.status === status)
            },
            
            getUpcomingBookings: () => {
              const now = new Date()
              return get().bookings.items.filter(b => 
                new Date(b.date) > now && b.status === 'confirmed'
              )
            },
          },

          // ===== ENHANCED HOUSE PARTIES =====
          houseParties: {
            items: [],
            isLoading: false,
            error: null,
            
            setHouseParties: (parties) => set((state) => {
              state.houseParties.items = parties
            }),
            
            addParty: (party) => set((state) => {
              const newParty = {
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                attendees: 0,
                status: 'active',
                views: 0,
                ...party,
              }
              state.houseParties.items.unshift(newParty)
            }),
            
            joinParty: (partyId) => set((state) => {
              const party = state.houseParties.items.find(p => p.id === partyId)
              if (party && party.attendees < party.capacity) {
                party.attendees += 1
              }
            }),
            
            leaveParty: (partyId) => set((state) => {
              const party = state.houseParties.items.find(p => p.id === partyId)
              if (party && party.attendees > 0) {
                party.attendees -= 1
              }
            }),
          },

          // ===== RESEARCH =====
          research: {
            items: [],
            isLoading: false,
            error: null,
            
            setResearch: (items) => set((state) => {
              state.research.items = items
            }),
            
            addResearch: (item) => set((state) => {
              const newItem = {
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'submitted',
                ...item,
              }
              state.research.items.unshift(newItem)
              
              // Add notification
              state.ui.notifications.unshift({
                id: Date.now().toString(),
                type: 'success',
                title: 'Research Submitted',
                message: 'Your research proposal has been submitted for review.',
                read: false,
                createdAt: new Date().toISOString()
              })
            }),
          },

          // ===== ENHANCED STATISTICS =====
          stats: {
            venuesListed: 1250,
            partiesOrganized: 3400,
            doctorsRegistered: 850,
            usersActive: 12500,
            
            updateStats: (updates) => set((state) => {
              state.stats = { ...state.stats, ...updates }
            }),
            
            incrementStat: (key) => set((state) => {
              if (state.stats[key] !== undefined) {
                state.stats[key] += 1
              }
            }),
          },

          // ===== ENHANCED ANALYTICS =====
          analytics: {
            pageViews: {},
            userActions: [],
            performance: {},
            searchQueries: [],
            popularContent: [],
            
            trackPageView: (page) => set((state) => {
              state.analytics.pageViews[page] = (state.analytics.pageViews[page] || 0) + 1
            }),
            
            trackAction: (action) => set((state) => {
              state.analytics.userActions.push({
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...action,
              })
              
              // Keep only last 1000 actions
              if (state.analytics.userActions.length > 1000) {
                state.analytics.userActions = state.analytics.userActions.slice(-1000)
              }
            }),
            
            trackSearch: (query) => set((state) => {
              if (query.trim()) {
                state.analytics.searchQueries.push({
                  query: query.trim(),
                  timestamp: new Date().toISOString()
                })
                
                // Keep only last 100 searches
                if (state.analytics.searchQueries.length > 100) {
                  state.analytics.searchQueries = state.analytics.searchQueries.slice(-100)
                }
              }
            }),
            
            setPerformance: (metrics) => set((state) => {
              state.analytics.performance = { ...state.analytics.performance, ...metrics }
            }),
          },

          // ===== USER PREFERENCES =====
          preferences: {
            language: 'en',
            currency: 'INR',
            timezone: 'Asia/Kolkata',
            notifications: {
              email: true,
              push: true,
              sms: false,
              marketing: false,
            },
            privacy: {
              analytics: true,
              cookies: true,
              location: true,
            },
            
            updatePreferences: (updates) => set((state) => {
              state.preferences = { ...state.preferences, ...updates }
            }),
            
            updateNotificationSettings: (settings) => set((state) => {
              state.preferences.notifications = { ...state.preferences.notifications, ...settings }
            }),
            
            updatePrivacySettings: (settings) => set((state) => {
              state.preferences.privacy = { ...state.preferences.privacy, ...settings }
            }),
          },

          // ===== CACHE MANAGEMENT =====
          cache: {
            venues: new Map(),
            users: new Map(),
            searches: new Map(),
            
            setCache: (type, key, data) => set((state) => {
              state.cache[type].set(key, {
                data,
                timestamp: Date.now(),
                ttl: 5 * 60 * 1000 // 5 minutes
              })
            }),
            
            getCache: (type, key) => {
              const cached = get().cache[type].get(key)
              if (cached && Date.now() - cached.timestamp < cached.ttl) {
                return cached.data
              }
              return null
            },
            
            clearCache: (type) => set((state) => {
              if (type) {
                state.cache[type].clear()
              } else {
                state.cache.venues.clear()
                state.cache.users.clear()
                state.cache.searches.clear()
              }
            }),
          },
        })),
        {
          name: 'trinix-store',
          partialize: (state) => ({
            theme: state.theme,
            auth: { 
              user: state.auth.user, 
              isAuthenticated: state.auth.isAuthenticated 
            },
            venues: { 
              favorites: state.venues.favorites 
            },
            bookings: state.bookings,
            search: { 
              recentSearches: state.search.recentSearches 
            },
            preferences: state.preferences,
          }),
        }
      )
    )
  )
}

export const useStore = createAppStore()

// Enhanced selector hooks for better performance
export const useAuth = () => useStore((state) => state.auth)
export const useTheme = () => useStore((state) => state.theme)
export const useUI = () => useStore((state) => state.ui)
export const useSearch = () => useStore((state) => state.search)
export const useVenues = () => useStore((state) => state.venues)
export const useBookings = () => useStore((state) => state.bookings)
export const useHouseParties = () => useStore((state) => state.houseParties)
export const useResearch = () => useStore((state) => state.research)
export const useStats = () => useStore((state) => state.stats)
export const useAnalytics = () => useStore((state) => state.analytics)
export const usePreferences = () => useStore((state) => state.preferences)
export const useCache = () => useStore((state) => state.cache)