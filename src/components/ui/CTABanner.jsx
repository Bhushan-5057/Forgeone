import { motion } from 'framer-motion'
import Button from './Button'
import { fadeUp, viewportOnce } from '../../lib/motion'

export default function CTABanner({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'dark',
}) {
  const isDark = variant === 'dark'

  return (
    <section className="section-pad site-section">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ ...viewportOnce, amount: 0.35 }}
        variants={fadeUp}
        className={`relative overflow-hidden rounded-[32px] px-6 py-12 shadow-soft sm:px-10 sm:py-14 lg:px-14 ${
          isDark
            ? 'border border-white/10 bg-brand-primary text-brand-neutral'
            : 'border border-brand-primary/8 bg-white/90 text-brand-primary backdrop-blur-xl'
        }`}
      >
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${
            isDark ? 'bg-brand-accent/22' : 'bg-brand-accent/14'
          }`}
        />
        <div
          className={`pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-3xl ${
            isDark ? 'bg-brand-secondary/20' : 'bg-brand-secondary/12'
          }`}
        />
        <div className={`absolute inset-0 ${isDark ? 'premium-grid-dark opacity-20' : 'premium-grid opacity-35'}`} />

        <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6 text-left sm:items-center sm:text-center">
          {eyebrow && (
            <p
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] ${
                isDark
                  ? 'border-white/12 bg-white/6 text-brand-secondary'
                  : 'border-brand-secondary/15 bg-brand-secondary/10 text-brand-secondary'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-balance sm:text-4xl lg:text-5xl text-white">
            {title}
          </h2>
          {description && (
            <p
              className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
                isDark ? 'text-brand-neutral/75' : 'text-steel'
              }`}
            >
              {description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 sm:justify-center">
            {primaryCta && (
              <Button
                to={primaryCta.path}
                variant={isDark ? 'secondary' : 'secondary'}
                size="lg"
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                to={secondaryCta.path}
                variant={isDark ? 'outline-light' : 'outline'}
                size="lg"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
