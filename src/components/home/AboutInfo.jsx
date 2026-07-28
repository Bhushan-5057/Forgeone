import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, staggerWrap, viewportOnce } from '../../lib/motion'

export default function AboutInfo({ data }) {
  return (
    <section className="section-pad site-section section-divider bg-white/60">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.mission}
          className="mb-12 max-w-3xl"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerWrap(0.08, 0.08)}
          className="grid gap-5 md:grid-cols-3"
        >
          {data.values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="premium-card p-6 sm:p-7"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel sm:text-[0.95rem]">
                {value.description}
              </p>
              {value.highlight && (
                <p className="mt-4 text-sm font-medium text-brand-primary/72">{value.highlight}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
