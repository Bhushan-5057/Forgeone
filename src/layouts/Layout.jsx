import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import ScrollToTopButton from '../components/layout/ScrollToTopButton'
import ScrollProgress from '../components/layout/ScrollProgress'

export default function Layout() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
    })

    let rafId = 0

    const frame = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
