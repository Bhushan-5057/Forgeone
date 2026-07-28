import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, scaleIn, staggerWrap, viewportOnce } from '../../lib/motion'

export default function Testimonials({ data }) {
  return (
    <section className="section-pad site-section overflow-hidden bg-mesh-dark">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          light
          className="mb-12"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerWrap(0.08, 0.08)}
          className="grid gap-5 lg:grid-cols-3"
        >
          {data.items.map((item, index) => (
            <motion.blockquote
              key={item.name}
              variants={index === 1 ? fadeUp : scaleIn}
              className="premium-panel-dark flex h-full flex-col p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-brand-secondary">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="rounded-full border border-white/10 bg-white/6 p-2 text-brand-secondary">
                  <Quote size={18} />
                </span>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-frost/82 sm:text-[0.95rem]">
                “{item.quote}”
              </p>
              <footer className="mt-6 border-t border-frost/10 pt-4">
                <cite className="not-italic">
                  <span className="block font-display font-semibold text-frost">{item.name}</span>
                  <span className="mt-1 block text-sm text-frost/55">
                    {item.role || item.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
