import { useCallback, useEffect, useState } from 'react'

interface UseAsyncState<T> {
  data?: T
  error?: Error
  loading: boolean
}

type AsyncFunction<T> = () => Promise<T>

/**
 * Hook for handling async operations with loading, error, and data states
 * @param asyncFunction - The async function to execute
 * @param immediate - Whether to execute the function immediately
 * @returns Object with execute function, loading state, data, and error
 */
export function useAsync<T = any>(
  asyncFunction: AsyncFunction<T>,
  immediate: boolean = true
): UseAsyncState<T> & {
  execute: () => Promise<T | undefined>
  reset: () => void
} {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  })

  const execute = useCallback(async (): Promise<T | undefined> => {
    setState(prevState => ({ ...prevState, loading: true }))

    try {
      const data = await asyncFunction()
      setState({ data, loading: false, error: undefined })
      return data
    } catch (error) {
      setState({ data: undefined, loading: false, error: error as Error })
      return undefined
    }
  }, [asyncFunction])

  const reset = useCallback(() => {
    setState({ data: undefined, error: undefined, loading: false })
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute, reset }
}
