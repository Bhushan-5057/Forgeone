import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary:
    'border border-brand-secondary/40 bg-brand-primary text-white shadow-glow hover:border-brand-secondary/60 hover:bg-brand-primary-soft focus-visible:ring-brand-secondary',
  secondary:
    'border border-brand-secondary/40 bg-brand-secondary text-brand-primary hover:bg-brand-secondary/90 focus-visible:ring-brand-secondary',
  call:
    'border border-brand-accent/30 bg-brand-accent text-white shadow-glow hover:bg-brand-accent-deep focus-visible:ring-brand-accent',
  outline:
    'border border-brand-primary/10 bg-white/80 text-brand-primary hover:border-brand-secondary/40 hover:text-brand-secondary focus-visible:ring-brand-secondary',
  'outline-light':
    'border border-white/20 bg-white/8 text-white hover:border-brand-secondary/55 hover:bg-white/14 focus-visible:ring-brand-secondary',
  ghost:
    'border border-transparent bg-transparent text-brand-primary hover:text-brand-secondary focus-visible:ring-brand-secondary',
  light:
    'border border-white/40 bg-white text-brand-primary hover:bg-brand-neutral-warm focus-visible:ring-brand-neutral',
}

const sizes = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm sm:text-base',
  lg: 'min-h-14 px-6 text-base',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  showArrow = true,
}) {
  const classes = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-display font-semibold tracking-tight transition-all duration-300 focus-ring disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] || variants.primary} ${sizes[size]} ${className}`

  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
      {showArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
        />
      )}
    </motion.span>
  )

  const glow = (
    <>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-brand-secondary/18 via-white/0 to-brand-accent/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-[1px] rounded-full bg-white/0" />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {glow}
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {glow}
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {glow}
      {content}
    </button>
  )
}
