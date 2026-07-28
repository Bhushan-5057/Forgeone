import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = Math.min(window.innerHeight * 0.7, 620)
      setVisible(window.scrollY > heroHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollTop}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-brand-primary/88 text-brand-neutral shadow-lift backdrop-blur-xl sm:bottom-8 sm:right-8"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56" aria-hidden>
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(244,247,250,0.15)" strokeWidth="3" />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={20} strokeWidth={2.25} className="relative" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
