import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar, Sparkles } from 'lucide-react'
import { fadeUp, viewportOnce } from '../../lib/motion'

export default function ContentListing({
  items,
  categories,
  featuredId,
  getHref,
  type = 'blog',
  emptyLabel = 'No items found.',
}) {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = useMemo(
    () => items.find((item) => item.id === featuredId) || items[0],
    [items, featuredId]
  )

  const rest = useMemo(
    () => items.filter((item) => item.id !== featured?.id),
    [items, featured]
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return rest
    if (type === 'blog') {
      return rest.filter((item) => item.category === activeCategory)
    }
    return rest.filter((item) => item.industry === activeCategory)
  }, [rest, activeCategory, type])

  const tabs = ['All', ...categories]

  return (
    <section className="section-pad site-section">
      <div className="container-wide">
        {featured && (
          <motion.article
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="premium-card mb-14 overflow-hidden lg:mb-16"
          >
            <Link to={getHref(featured)} className="group grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-brand-primary/75 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs text-steel">
                  <span className="font-display font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                    {type === 'blog' ? featured.category : featured.industry}
                  </span>
                  <span className="text-brand-accent"><Sparkles size={12} /></span>
                  {type === 'blog' && featured.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime}
                    </span>
                  )}
                  {type === 'blog' && featured.date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} /> {featured.date}
                    </span>
                  )}
                  {type === 'case' && featured.client && (
                    <span>{featured.client}</span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-brand-primary text-balance sm:text-3xl lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
                  {featured.excerpt}
                </p>
                {type === 'case' && featured.results?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-6">
                    {featured.results.slice(0, 3).map((r) => (
                      <div key={r.label}>
                        <p className="font-display text-2xl font-bold text-brand-secondary">{r.metric}</p>
                        <p className="text-xs text-steel">{r.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-secondary">
                  {type === 'case' ? 'Read full case study' : 'Read full article'}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                activeCategory === tab
                  ? 'border-brand-secondary/30 bg-brand-primary text-brand-neutral'
                  : 'border-brand-primary/8 bg-white/80 text-steel hover:border-brand-secondary/25 hover:text-brand-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.length === 0 ? (
              <p className="col-span-full text-steel">{emptyLabel}</p>
            ) : (
              filtered.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ delay: index * 0.05 }}
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
                      <div className="flex flex-wrap items-center gap-2 text-xs text-steel">
                        <span className="font-display font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                          {type === 'blog' ? item.category : item.industry}
                        </span>
                        {type === 'blog' && item.readTime && <span>· {item.readTime}</span>}
                        {type === 'blog' && item.date && <span>· {item.date}</span>}
                        {type === 'case' && item.client && <span>· {item.client}</span>}
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-brand-primary sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-steel line-clamp-4">
                        {item.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-secondary">
                        {type === 'case' ? 'View case study' : 'Read article'}
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
