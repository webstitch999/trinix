import { useEffect, useRef, useCallback } from 'react'
import { useAnalytics } from '../store/store'

export const usePerformance = (componentName) => {
  const startTime = useRef(performance.now())
  const hasRecorded = useRef(false)
  const { setPerformance } = useAnalytics()

  useEffect(() => {
    if (hasRecorded.current) return
    
    const endTime = performance.now()
    const renderTime = endTime - startTime.current

    setPerformance({
      [componentName]: {
        renderTime,
        timestamp: new Date().toISOString()
      }
    })
    hasRecorded.current = true
  }, [componentName, setPerformance])

  const measureOperation = useCallback((operationName, operation) => {
    const start = performance.now()
    const result = operation()
    const end = performance.now()
    
    setPerformance({
      [`${componentName}_${operationName}`]: {
        executionTime: end - start,
        timestamp: new Date().toISOString()
      }
    })
    
    return result
  }, [componentName, setPerformance])

  return { measureOperation }
}

export const useWebVitals = () => {
  const { setPerformance } = useAnalytics()

  useEffect(() => {
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            setPerformance({
              LCP: {
                value: entry.startTime,
                timestamp: new Date().toISOString()
              }
            })
            break
          case 'first-input':
            setPerformance({
              FID: {
                value: entry.processingStart - entry.startTime,
                timestamp: new Date().toISOString()
              }
            })
            break
          case 'layout-shift':
            if (!entry.hadRecentInput) {
              setPerformance({
                CLS: {
                  value: entry.value,
                  timestamp: new Date().toISOString()
                }
              })
            }
            break
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance Observer not fully supported')
    }

    return () => observer.disconnect()
  }, [setPerformance])
}