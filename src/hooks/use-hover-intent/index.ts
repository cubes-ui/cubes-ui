import { useRef, useState } from 'react'

export const useHoverIntent = (
  delay = 100,
  onIntent: () => void,
  onExit?: () => void
) => {
  const [active, setActive] = useState(false)
  const timer = useRef<number | null>(null)

  const handleEnter = () => {
    timer.current = window.setTimeout(() => {
      setActive(true)
      onIntent()
    }, delay)
  }

  const handleLeave = () => {
    if (timer.current) clearTimeout(timer.current)
    setActive(false)
    onExit?.()
  }

  return { active, onMouseEnter: handleEnter, onMouseLeave: handleLeave }
}
