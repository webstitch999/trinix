import { useEffect, useRef, useState, useCallback } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef(null)

  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    fallbackInView = false,
  } = options

  const callback = useCallback(
    ([entry]) => {
      const isElementIntersecting = entry.isIntersecting
      
      setIsIntersecting(isElementIntersecting)
      
      if (isElementIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
      
      // If triggerOnce is true and we've already intersected, don't update again
      if (triggerOnce && hasIntersected) {
        return
      }
    },
    [hasIntersected, triggerOnce]
  )

  useEffect(() => {
    const element = elementRef.current
    
    if (!element) {
      // Fallback: if no element ref, assume it's in view
      if (fallbackInView) {
        setIsIntersecting(true)
        setHasIntersected(true)
      }
      return
    }

    let observer

    try {
      observer = new IntersectionObserver(callback, {
        threshold,
        root,
        rootMargin,
      })

      observer.observe(element)
    } catch (error) {
      console.error('IntersectionObserver not supported:', error)
      // Fallback for browsers that don't support IntersectionObserver
      if (fallbackInView) {
        setIsIntersecting(true)
        setHasIntersected(true)
      }
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [callback, threshold, root, rootMargin, fallbackInView])

  return [elementRef, isIntersecting, hasIntersected]
}
