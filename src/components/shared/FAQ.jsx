import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, viewportOnce } from '../../lib/motion'

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="premium-card p-0">
      <button
        type="button"
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand-secondary transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-steel sm:px-6 sm:text-[0.95rem]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-pad site-section">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="space-y-4"
        >
          {data.items.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
