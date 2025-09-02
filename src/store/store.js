import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Types for better development experience
const createAppStore = () => {
  return create(
    subscribeWithSelector(
      persist(
        immer((set, get) => ({
          // ===== THEME & UI STATE =====
          theme: {
            mode: 'dark',
            system: true,
            toggle: () => set((state) => {
              state.theme.mode = state.theme.mode === 'dark' ? 'light' : 'dark'
            }),
            setSystem: (enabled) => set((state) => {
              state.theme.system = enabled
            }),
          },

          // ===== AUTHENTICATION =====
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            
            login: async (credentials) => {
              set((state) => {
                state.auth.isLoading = true
                state.auth.error = null
              })
              
              try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                const user = {
                  id: '1',
                  email: credentials.email,
                  name: credentials.email.split('@')[0],
                  role: 'admin',
                  avatar: null,
                  preferences: {
                    notifications: true,
                    emailUpdates: true,
                  }
                }
                
                set((state) => {
                  state.auth.user = user
                  state.auth.isAuthenticated = true
                  state.auth.isLoading = false
                })
                
                return { success: true, user }
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

          // ===== UI STATE =====
          ui: {
            sidebarOpen: false,
            modals: {
              research: false,
              support: false,
              booking: false,
              venueList: false,
            },
            notifications: [],
            loadingStates: {
              venues: false,
              bookings: false,
              user: false,
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
              state.ui.notifications.push({
                id,
                type: 'info',
                title: '',
                message: '',
                duration: 5000,
                ...notification,
              })
            }),
            
            removeNotification: (id) => set((state) => {
              state.ui.notifications = state.ui.notifications.filter(n => n.id !== id)
            }),
            
            setLoading: (key, value) => set((state) => {
              state.ui.loadingStates[key] = value
            }),
          },

          // ===== SEARCH & FILTERS =====
          search: {
            query: '',
            filters: {
              category: 'all',
              priceRange: [0, 10000],
              location: '',
              amenities: [],
              dateRange: null,
            },
            recentSearches: [],
            
            setQuery: (query) => set((state) => {
              state.search.query = query
            }),
            
            setFilters: (filters) => set((state) => {
              state.search.filters = { ...state.search.filters, ...filters }
            }),
            
            addRecentSearch: (search) => set((state) => {
              const searches = state.search.recentSearches.filter(s => s !== search)
              state.search.recentSearches = [search, ...searches].slice(0, 10)
            }),
            
            clearRecentSearches: () => set((state) => {
              state.search.recentSearches = []
            }),
          },

          // ===== VENUES =====
          venues: {
            items: [],
            favorites: [],
            isLoading: false,
            error: null,
            
            setVenues: (venues) => set((state) => {
              state.venues.items = venues
            }),
            
            addVenue: (venue) => set((state) => {
              state.venues.items.push(venue)
            }),
            
            updateVenue: (id, updates) => set((state) => {
              const index = state.venues.items.findIndex(v => v.id === id)
              if (index !== -1) {
                state.venues.items[index] = { ...state.venues.items[index], ...updates }
              }
            }),
            
            removeVenue: (id) => set((state) => {
              state.venues.items = state.venues.items.filter(v => v.id !== id)
            }),
            
            addFavorite: (venueId) => set((state) => {
              if (!state.venues.favorites.includes(venueId)) {
                state.venues.favorites.push(venueId)
              }
            }),
            
            removeFavorite: (venueId) => set((state) => {
              state.venues.favorites = state.venues.favorites.filter(id => id !== venueId)
            }),
            
            isFavorite: (venueId) => get().venues.favorites.includes(venueId),
          },

          // ===== BOOKINGS =====
          bookings: {
            items: [],
            isLoading: false,
            error: null,
            
            addBooking: (booking) => set((state) => {
              state.bookings.items.push({
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'pending',
                ...booking,
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
          },

          // ===== HOUSE PARTIES =====
          houseParties: {
            items: [],
            isLoading: false,
            error: null,
            
            setParties: (parties) => set((state) => {
              state.houseParties.items = parties
            }),
            
            addParty: (party) => set((state) => {
              state.houseParties.items.push({
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                attendees: [],
                ...party,
              })
            }),
            
            joinParty: (partyId, userId) => set((state) => {
              const party = state.houseParties.items.find(p => p.id === partyId)
              if (party && !party.attendees.includes(userId)) {
                party.attendees.push(userId)
              }
            }),
            
            leaveParty: (partyId, userId) => set((state) => {
              const party = state.houseParties.items.find(p => p.id === partyId)
              if (party) {
                party.attendees = party.attendees.filter(id => id !== userId)
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
              state.research.items.push({
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                ...item,
              })
            }),
          },

          // ===== STATISTICS =====
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

          // ===== ANALYTICS =====
          analytics: {
            pageViews: {},
            userActions: [],
            performance: {},
            
            trackPageView: (page) => set((state) => {
              state.analytics.pageViews[page] = (state.analytics.pageViews[page] || 0) + 1
            }),
            
            trackAction: (action) => set((state) => {
              state.analytics.userActions.push({
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...action,
              })
            }),
            
            setPerformance: (metrics) => set((state) => {
              state.analytics.performance = { ...state.analytics.performance, ...metrics }
            }),
          },
        })),
        {
          name: 'trinix-store',
          partialize: (state) => ({
            theme: state.theme,
            auth: { user: state.auth.user, isAuthenticated: state.auth.isAuthenticated },
            venues: { favorites: state.venues.favorites },
            bookings: state.bookings,
            search: { recentSearches: state.search.recentSearches },
          }),
        }
      )
    )
  )
}

export const useStore = createAppStore()

// Selector hooks for better performance
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
