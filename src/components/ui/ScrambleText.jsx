import { useEffect, useRef, useState } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function randomGlyph() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

/**
 * Text scramble / decode effect.
 * Characters cycle random glyphs, then lock left-to-right.
 * - Monospace + tabular glyphs during churn (no layout jitter)
 * - Final string on aria-label; churn span aria-hidden
 * - prefers-reduced-motion → instant final text
 * - Runs when `trigger` is true; re-runs only if `text` or `trigger` changes (not on parent re-renders)
 */
export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  /**
   * When false, animation is idle/reset. When true, scramble runs once for the current text.
   * Use for carousel slides so the effect plays when the slide is active.
   */
  trigger = true,
  /** Total base duration in ms before forced settle */
  duration = 1200,
  /** Extra ms between each character's settle deadline */
  charStagger = 28,
}) {
  const reduced = prefersReducedMotion()
  const [output, setOutput] = useState(() => (reduced ? text : ''))
  const [settled, setSettled] = useState(() => reduced)
  const rafRef = useRef(0)

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }

    if (!trigger) {
      setSettled(true)
      setOutput(text)
      return
    }

    if (prefersReducedMotion() || !text) {
      setOutput(text)
      setSettled(true)
      return
    }

    const chars = Array.from(text)
    const start = performance.now()
    // Deadlines captured once for this run — never rebuilt mid-animation
    const deadlines = chars.map((_, i) => start + 160 + i * charStagger)
    let cancelled = false

    setSettled(false)
    setOutput(chars.map((c) => (c === ' ' ? ' ' : randomGlyph())).join(''))

    const tick = (now) => {
      if (cancelled) return

      let allDone = true
      const next = chars.map((char, i) => {
        if (char === ' ') return ' '
        if (now >= deadlines[i]) return char
        allDone = false
        return randomGlyph()
      })

      setOutput(next.join(''))

      if (allDone || now - start >= duration + chars.length * charStagger) {
        setOutput(text)
        setSettled(true)
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [trigger, text, duration, charStagger])

  return (
    <Tag className={className} aria-label={text}>
      <span
        aria-hidden="true"
        className={
          settled
            ? undefined
            : 'inline font-mono font-semibold tracking-tight [font-variant-numeric:tabular-nums]'
        }
      >
        {settled ? text : output || '\u00A0'}
      </span>
    </Tag>
  )
}
