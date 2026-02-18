import { useState } from 'react'

/**
 * Custom hook for localStorage persistence
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key doesn't exist in localStorage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage[${key}]:`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error writing to localStorage[${key}]:`, error)
    }
  }

  return [storedValue, setValue]
}
