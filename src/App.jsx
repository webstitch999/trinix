import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorFallback from './components/UI/ErrorFallback'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Eventify = lazy(() => import('./pages/Eventify'))
const SOS = lazy(() => import('./pages/SOS'))
const MedGo = lazy(() => import('./pages/MedGo'))
const Contact = lazy(() => import('./pages/Contact'))
const VenueDetails = lazy(() => import('./pages/VenueDetails'))
const ListVenue = lazy(() => import('./pages/ListVenue'))
const HousePartyHub = lazy(() => import('./pages/HousePartyHub'))
const ResearchPortal = lazy(() => import('./pages/ResearchPortal'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <LoadingSpinner size="lg" />
  </div>
)

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          console.error('App Error:', error, errorInfo)
        }}
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
