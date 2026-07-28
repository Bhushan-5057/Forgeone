import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { fadeUp, viewportOnce } from '../../lib/motion'

export default function ContentPreview({
  eyebrow,
  title,
  description,
  items,
  viewAllPath,
  viewAllLabel,
  getHref,
  type = 'blog',
}) {
  return (
    <section className="section-pad site-section">
      <div className="container-wide">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Button to={viewAllPath} variant="outline" className="shrink-0 self-start sm:self-auto">
            {viewAllLabel}
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.id || item.slug}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ delay: index * 0.07 }}
            >
              <Link
                to={getHref(item)}
                className="premium-card group flex h-full flex-col overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
                      {type === 'case' ? item.industry : item.category}
                    </p>
                    <span className="rounded-full border border-brand-primary/8 bg-white/80 p-2 text-brand-accent">
                      <Sparkles size={14} />
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-secondary">
                    {type === 'case' ? 'View case study' : 'Read article'}
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
