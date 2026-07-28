import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import SpinLoader from './components/ui/SpinLoader'

const homeImport = () => import('./pages/Home')
const Home = lazy(homeImport)
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const ServicePage = lazy(() => import('./pages/ServicePage'))

const BOOT_MS = 2000

function CenteredLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-primary px-6">
      <SpinLoader size={52} />
    </div>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    let cancelled = false
    const started = Date.now()

    Promise.all([homeImport(), new Promise((resolve) => window.setTimeout(resolve, BOOT_MS))]).then(() => {
      if (cancelled) return
      // Ensure splash never ends before BOOT_MS even if import was slow/fast
      const wait = Math.max(0, BOOT_MS - (Date.now() - started))
      window.setTimeout(() => {
        if (!cancelled) setBooting(false)
      }, wait)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (booting) {
    return <CenteredLoader />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<CenteredLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:slug" element={<BlogDetail />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="services/:slug" element={<ServicePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
