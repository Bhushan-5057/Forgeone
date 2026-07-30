import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock3, MapPin } from 'lucide-react'
import { socialIconMap } from '../ui/socialIconMap'
import Logo from './Logo'
import { servicesNav, socialLinks } from '../../data/navigation'
import { fadeUp, scaleIn, staggerWrap, viewportOnce } from '../../lib/motion'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services/ai-ml' },
  { label: 'Contact Us', path: '/contact' },
]

const resources = [
  { label: 'Blogs', path: '/blogs' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Cloud & DevOps', path: '/services/cloud-devops' },
  { label: 'AI & ML', path: '/services/ai-ml' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night text-brand-neutral">
      <img
        src="/assets/footerbg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/78 via-brand-primary/86 to-night/92" />
      <div className="absolute inset-0 premium-grid-dark opacity-20" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerWrap(0.08, 0.08)}
        className="container-wide section-pad relative py-14 sm:py-16"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.9fr_0.9fr] lg:gap-8">
          <motion.div variants={scaleIn}>
            <Logo light />
            <motion.p variants={fadeUp} className="mt-4 max-w-sm text-sm leading-relaxed text-brand-neutral/65">
              Forgeone is an IT solutions partner helping ambitious teams design, build, and scale
              reliable software across product, cloud, data, and AI initiatives.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-5 space-y-3 text-sm text-brand-neutral/68">
              <p className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-brand-secondary" />
                Global delivery for growth-stage and enterprise teams
              </p>
              <p className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-brand-secondary" />
                Fast responses and senior-led discovery
              </p>
            </motion.div>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    variants={fadeUp}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-brand-neutral/70 transition-colors hover:border-brand-secondary/55 hover:text-brand-secondary"
                  >
                    <Icon size={16} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-neutral">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.path} variants={fadeUp}>
                  <Link to={link.path} className="text-sm text-brand-neutral/65 transition-colors hover:text-brand-secondary">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-neutral">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {servicesNav.map((link) => (
                <motion.li key={link.path} variants={fadeUp}>
                  <Link to={link.path} className="text-sm text-brand-neutral/65 transition-colors hover:text-brand-secondary">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-neutral">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resources.map((link) => (
                <motion.li key={link.path} variants={fadeUp}>
                  <Link to={link.path} className="text-sm text-brand-neutral/65 transition-colors hover:text-brand-secondary">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-12 border-t border-brand-neutral/10 pt-6 text-center">
          <p className="text-sm text-brand-neutral/50">&copy; {year} Forgeone Inc. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
