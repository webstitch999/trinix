import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorFallback from './components/UI/ErrorFallback'

// Enhanced lazy loading with better error handling
const createLazyComponent = (importFn, fallback = null) => {
  return lazy(() => 
    importFn().catch(error => {
      console.error('Failed to load component:', error)
      return { default: fallback || (() => <div>Failed to load component</div>) }
    })
  )
}

// Lazy load pages for optimal performance
const Home = createLazyComponent(() => import('./pages/Home'))
const About = createLazyComponent(() => import('./pages/About'))
const Projects = createLazyComponent(() => import('./pages/Projects'))
const Eventify = createLazyComponent(() => import('./pages/Eventify'))
const SOS = createLazyComponent(() => import('./pages/SOS'))
const MedGo = createLazyComponent(() => import('./pages/MedGo'))
const Contact = createLazyComponent(() => import('./pages/Contact'))
const VenueDetails = createLazyComponent(() => import('./pages/VenueDetails'))
const ListVenue = createLazyComponent(() => import('./pages/ListVenue'))
const HousePartyHub = createLazyComponent(() => import('./pages/HousePartyHub'))
const ResearchPortal = createLazyComponent(() => import('./pages/ResearchPortal'))
const Collaboration = createLazyComponent(() => import('./pages/Collaboration'))
const Login = createLazyComponent(() => import('./pages/Login'))
const Dashboard = createLazyComponent(() => import('./pages/Dashboard'))
const NotFound = createLazyComponent(() => import('./pages/NotFound'))

// Enhanced loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white">
    <div className="text-center space-y-4">
      <LoadingSpinner size="lg" variant="dots" />
      <div className="text-neutral-600 font-medium">Loading...</div>
    </div>
  </div>
)

// Enhanced error logging
const handleError = (error, errorInfo) => {
  console.error('Application Error:', error, errorInfo)
  
  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleError}
        onReset={() => window.location.reload()}
      >
        <div className="min-h-screen bg-white">
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/eventify" element={<Eventify />} />
                  <Route path="/sos" element={<SOS />} />
                  <Route path="/medgo" element={<MedGo />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/venue/:id" element={<VenueDetails />} />
                  <Route path="/list-venue" element={<ListVenue />} />
                  <Route path="/house-party-hub" element={<HousePartyHub />} />
                  <Route path="/research" element={<ResearchPortal />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </Layout>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App