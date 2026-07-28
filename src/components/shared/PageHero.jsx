import { motion } from 'framer-motion'
import ScrambleText from '../ui/ScrambleText'
import Button from '../ui/Button'
import CountUpStat from '../ui/CountUpStat'
import { fadeUp, scaleIn, staggerWrap, viewportOnce } from '../../lib/motion'
import './PageHero.css'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  badges = [],
  stats = [],
  primaryCta,
  secondaryCta,
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid container-wide section-pad !px-0 lg:section-pad">
        <div className="page-hero__content section-pad lg:!pr-10">
          <div className="premium-orb left-[-4rem] top-[8rem] h-36 w-36 bg-brand-secondary/25" />
          <div className="premium-orb right-[12%] top-[14%] h-28 w-28 bg-brand-accent/18" />
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="page-hero__intro max-w-2xl"
          >
            {eyebrow && (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {eyebrow}
              </p>
            )}
            <ScrambleText
              as="h1"
              text={title}
              className="font-display text-4xl font-bold tracking-[-0.05em] text-frost text-balance sm:text-5xl lg:text-[3.7rem] lg:leading-[0.98]"
            />
            {subtitle && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-frost/72 sm:text-lg">{subtitle}</p>
            )}
            {badges.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm text-frost/80">
                    {badge}
                  </span>
                ))}
              </div>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <Button to={primaryCta.path} variant="secondary" size="lg">
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button to={secondaryCta.path} variant="outline-light" size="lg">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
            {stats.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerWrap(0.1, 0.08)}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn}
                    className="rounded-3xl border border-white/12 bg-white/6 p-4"
                  >
                    <CountUpStat
                      value={stat.value}
                      className="block font-display text-2xl font-bold tracking-[-0.04em] text-frost"
                    />
                    <span className="mt-1 block text-sm text-frost/65">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="page-hero__media" aria-hidden={!image}>
          {image && <img src={image} alt="" className="page-hero__image" />}
          <div className="page-hero__overlay page-hero__overlay--soft" />
        </div>
      </div>
    </section>
  )
}
