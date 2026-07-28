import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
  kicker,
}) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount: 0.35 }}
      variants={fadeUp}
      className={`max-w-3xl ${alignClass} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] ${
            light
              ? 'border-white/15 bg-white/6 text-brand-secondary'
              : 'border-brand-secondary/15 bg-brand-secondary/10 text-brand-secondary'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-[-0.04em] text-balance sm:text-4xl lg:text-[3rem] lg:leading-[1.02] ${
          light ? 'text-frost' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? 'text-frost/72' : 'text-steel'
          }`}
        >
          {description}
        </p>
      )}
      {kicker && (
        <p className={`mt-6 text-sm font-medium ${light ? 'text-frost/80' : 'text-brand-primary/70'}`}>
          {kicker}
        </p>
      )}
    </motion.div>
  )
}
