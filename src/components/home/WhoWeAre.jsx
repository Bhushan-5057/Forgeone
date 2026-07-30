import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import CountUpStat from '../ui/CountUpStat'
import { fadeUp, scaleIn, staggerWrap, viewportOnce } from '../../lib/motion'

export default function WhoWeAre({ data }) {
  return (
    <section className="section-pad site-section">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerWrap(0.08, 0.08)}
            className="mt-10"
          >
            {data.statsLabel && (
              <motion.p
                variants={fadeUp}
                className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-secondary"
              >
                {data.statsLabel}
              </motion.p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={stat.value}
                  variants={index % 2 === 0 ? fadeUp : scaleIn}
                  className="premium-card p-5"
                >
                  <CountUpStat
                    value={stat.value}
                    className="block font-display text-2xl font-bold tracking-tight text-brand-secondary sm:text-3xl"
                  />
                  <p className="mt-1 text-sm text-steel">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative overflow-hidden"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border border-brand-secondary/30" />
          <img
            src={data.image}
            alt="Forgeone team collaborating"
            className="relative z-10 aspect-[4/5] w-full rounded-[32px] object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </motion.div>
      </div>
    </section>
  )
}
