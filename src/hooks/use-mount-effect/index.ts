import { useEffect } from 'react'

export const useMountEffect = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}
