import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Sparkles, X } from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import { navLinks } from '../../data/navigation'
import { easePremium } from '../../lib/motion'

function DesktopDropdown({ item }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()

  const isActive = item.children?.some(
    (child) => location.pathname === child.path || location.pathname.startsWith(`${child.path}/`)
  )

  const openMenu = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 font-display text-sm font-semibold tracking-tight transition-colors ${
          isActive || open ? 'text-brand-secondary' : 'text-brand-neutral/78 hover:text-brand-secondary'
        }`}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: easePremium }}
            className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-3xl border border-white/10 bg-brand-primary/90 p-2 shadow-lift backdrop-blur-2xl"
          >
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={() => setOpen(false)}
                className={({ isActive: active }) =>
                  `block rounded-2xl px-3 py-3 font-display text-sm font-medium transition-colors ${
                    active
                      ? 'bg-white/10 text-brand-secondary'
                      : 'text-brand-neutral/78 hover:bg-white/6 hover:text-brand-secondary'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileAccordion({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isActive = item.children?.some((child) => location.pathname === child.path)

  return (
    <div className="border-b border-brand-primary/8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-2xl py-4 font-display text-base font-semibold ${
          isActive || open ? 'text-brand-secondary' : 'text-brand-neutral'
        }`}
      >
        {item.label}
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
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
            <div className="flex flex-col gap-1 pb-4 pl-2">
              {item.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  className={({ isActive: active }) =>
                    `rounded-md px-3 py-2.5 text-sm font-medium ${
                      active
                        ? 'bg-white/10 text-brand-secondary'
                        : 'text-brand-neutral/70 hover:bg-white/6 hover:text-white'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const linkClass = ({ isActive }) =>
    `relative font-display text-sm font-semibold tracking-tight transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-gradient-to-r after:from-brand-secondary after:to-brand-accent after:transition-all ${
      isActive
        ? 'text-brand-secondary after:w-full'
        : 'text-brand-neutral/78 hover:text-brand-secondary after:w-0 hover:after:w-full'
    }`

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'border-white/10 bg-brand-primary/78 shadow-nav backdrop-blur-2xl'
            : 'border-white/6 bg-brand-primary/54 backdrop-blur-xl'
        }`}
      >
        <div className="container-wide section-pad">
          <div className="relative flex h-[76px] items-center justify-center sm:h-[84px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.left.map((item) =>
                item.children ? (
                  <DesktopDropdown key={item.label} item={item} />
                ) : (
                  <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === '/'}>
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex max-w-[min(70vw,280px)] justify-center sm:max-w-none">
              <Logo light className="[&_img]:!h-10 sm:[&_img]:!h-12 lg:[&_img]:!h-14" />
            </div>

            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-end gap-3 lg:static lg:translate-y-0">
              <nav className="hidden items-center gap-5 lg:flex">
                {navLinks.right.map((item) =>
                  item.children ? (
                    <DesktopDropdown key={item.label} item={item} />
                  ) : (
                    <NavLink key={item.path} to={item.path} className={linkClass}>
                      {item.label}
                    </NavLink>
                  )
                )}
              </nav>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-brand-neutral lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-brand-primary/55 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,380px)] flex-col border-l border-white/10 bg-brand-primary shadow-lift lg:hidden"
            >
              <div className="flex h-[84px] items-center justify-between border-b border-white/10 px-5">
                <Logo light />
                <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <X size={22} className="text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="mb-5 rounded-3xl border border-white/10 bg-white/6 p-4 text-white">
                  <div className="mb-3 flex items-center gap-2 text-brand-secondary">
                    <Sparkles size={15} />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">Forgeone</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/72">
                    Enterprise software, cloud, and AI delivery designed to move decision-makers faster.
                  </p>
                </div>
                {navLinks.left.map((item) =>
                  item.children ? (
                    <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                  ) : (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/10 py-4 font-display text-base font-semibold ${
                          isActive ? 'text-brand-secondary' : 'text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                )}
                {navLinks.right.map((item) =>
                  item.children ? (
                    <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                  ) : (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/10 py-4 font-display text-base font-semibold ${
                          isActive ? 'text-brand-secondary' : 'text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                )}
              </div>
              <div className="border-t border-white/10 p-5">
                <Button to="/contact" variant="secondary" className="w-full" onClick={() => setMobileOpen(false)}>
                  Contact Us
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
