import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import CountUpStat from '../ui/CountUpStat'
import { fadeUp, staggerWrap } from '../../lib/motion'

const DEFAULT_SERVICES = ['AI & ML', 'Cloud & DevOps', 'Custom Software', 'Mobile Apps']

export default function HeroCarousel({ data }) {
  const services = data.rotatingServices?.length ? data.rotatingServices : DEFAULT_SERVICES
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [services.length])

  return (
    <section className="relative overflow-hidden bg-mesh-dark text-white">
      <div
        aria-hidden
        className="premium-grid-dark pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-[0.22]"
      />
      <div className="premium-orb left-[-6rem] top-24 h-48 w-48 bg-brand-secondary/30" />
      <div className="premium-orb right-[-4rem] top-20 h-56 w-56 bg-brand-accent/20" />
      <div className="premium-orb bottom-[-5rem] left-[35%] h-48 w-48 bg-white/10" />

      <div className="container-wide section-pad relative flex flex-col items-center pb-18 pt-34 text-center sm:pb-20 sm:pt-38 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerWrap(0.05, 0.08)}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-secondary"
          >
            <Sparkles size={14} />
            {data.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="w-full max-w-3xl font-display text-[1.75rem] font-bold tracking-[-0.04em] text-frost text-balance sm:text-5xl lg:text-[3.85rem] lg:leading-[1.12]"
          >
            <span className="block">{data.headlinePrefix || 'We design and deliver'}</span>
            <span className="relative mx-auto mt-1 block h-[1.2em] w-full overflow-hidden sm:mt-2" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={services[index]}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0 whitespace-nowrap text-center text-[0.85em] leading-none text-gradient sm:text-[1em]"
                >
                  {services[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            {data.headlineSuffix ? <span className="mt-1 block sm:mt-2">{data.headlineSuffix}</span> : null}
          </motion.h1>

          {data.subtext && (
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-frost/72 sm:text-lg"
            >
              {data.subtext}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="mt-8">
            <Button to={data.cta?.path || '/contact'} variant="secondary" size="lg">
              {data.cta?.label || 'Book a Strategy Call'}
            </Button>
          </motion.div>

          {data.stats?.length > 0 && (
            <motion.div variants={fadeUp} className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[26px] border border-white/12 bg-white/6 p-4 text-left backdrop-blur-xl"
                >
                  <CountUpStat
                    value={stat.value}
                    className="block font-display text-3xl font-bold tracking-[-0.05em] text-frost"
                  />
                  <span className="mt-1 block text-sm text-white">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
