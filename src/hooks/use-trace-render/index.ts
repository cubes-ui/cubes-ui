import { useRef } from 'react'

export const useTraceRender = (label: string) => {
  const renders = useRef(0)
  renders.current += 1
  console.log(`[TraceRender] ${label}: render #${renders.current}`)
}
