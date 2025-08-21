import { useEffect } from 'react'

interface KeyboardShortcutOptions {
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  preventDefault?: boolean
}

/**
 * Hook for handling keyboard shortcuts
 * @param keys - Array of key codes or single key code
 * @param callback - Function to call when shortcut is pressed
 * @param options - Modifier keys and options
 */
export function useKeyboardShortcut(
  keys: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
): void {
  const { ctrl = false, shift = false, alt = false, meta = false, preventDefault = true } = options

  useEffect(() => {
    const keysArray = Array.isArray(keys) ? keys : [keys]

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if all modifier requirements are met
      if (event.ctrlKey !== ctrl || event.shiftKey !== shift || event.altKey !== alt || event.metaKey !== meta) {
        return
      }

      // Check if the pressed key matches any of the target keys
      const keyPressed = event.key.toLowerCase()
      const codePressed = event.code.toLowerCase()

      const isMatch = keysArray.some(
        key =>
          key.toLowerCase() === keyPressed ||
          key.toLowerCase() === codePressed ||
          key.toLowerCase() === event.key ||
          key.toLowerCase() === event.code
      )

      if (isMatch) {
        if (preventDefault) {
          event.preventDefault()
        }
        callback(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keys, callback, ctrl, shift, alt, meta, preventDefault])
}
