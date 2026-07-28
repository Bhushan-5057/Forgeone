import { useEffect, useMemo, useRef, useState } from 'react'

function splitValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)

  if (!match) {
    return { number: null, suffix: value }
  }

  return {
    number: Number(match[1]),
    suffix: match[2] || '',
  }
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CountUpStat({ value, className = '' }) {
  const { number, suffix } = splitValue(value)
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState(() => (number === null ? value : 0))
  const hasAnimated = useRef(false)
  const decimals = useMemo(() => (number !== null && !Number.isInteger(number) ? 1 : 0), [number])

  useEffect(() => {
    if (number === null) return undefined

    const element = ref.current
    if (!element || hasAnimated.current) return undefined

    if (prefersReducedMotion()) {
      setDisplayValue(number)
      hasAnimated.current = true
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true
        const duration = 1800
        const start = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) * (1 - progress) * (1 - progress)
          const nextValue = number * eased
          setDisplayValue(Number(nextValue.toFixed(decimals)))

          if (progress < 1) {
            requestAnimationFrame(tick)
          }
        }

        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.45 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [decimals, number])

  return (
    <span ref={ref} className={className}>
      {number === null ? value : `${displayValue}${suffix}`}
    </span>
  )
}
