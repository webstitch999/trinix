import { useEffect } from 'react'

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      const modifiers = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        alt: event.altKey,
        shift: event.shiftKey
      }

      for (const shortcut of shortcuts) {
        const { keys, callback, preventDefault = true } = shortcut
        
        // Check if all required modifiers match
        const modifierMatch = Object.keys(modifiers).every(mod => 
          (shortcut[mod] || false) === modifiers[mod]
        )

        // Check if key matches
        const keyMatch = Array.isArray(keys) 
          ? keys.includes(key) 
          : keys === key

        if (modifierMatch && keyMatch) {
          if (preventDefault) {
            event.preventDefault()
          }
          callback(event)
          break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}