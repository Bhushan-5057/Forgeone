import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { fadeUp, viewportOnce } from '../../lib/motion'
import { iconMap } from '../../lib/iconMap'

export default function ServiceCard({ service, index = 0 }) {
  const Icon = iconMap[service.icon] || iconMap.Box

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="premium-card group flex h-full flex-col p-6 sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondary/12 text-brand-secondary transition-colors group-hover:bg-brand-secondary group-hover:text-white">
            <Icon size={22} strokeWidth={1.75} />
          </div>
          <span className="rounded-full border border-brand-primary/8 bg-white/70 p-2 text-brand-accent">
            <Sparkles size={14} />
          </span>
        </div>
        <div className="mb-4 h-px w-full bg-gradient-to-r from-brand-secondary/25 via-brand-accent/15 to-transparent" />
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-steel sm:text-[0.95rem]">
          {service.summary}
        </p>
        {service.highlight && (
          <p className="mt-4 text-sm font-medium text-brand-primary/75">{service.highlight}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-secondary">
          Learn more
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.div>
  )
}
