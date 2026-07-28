import { usePageMeta } from '../hooks/usePageMeta'
import home from '../data/home.json'
import blogs from '../data/blogs.json'
import caseStudies from '../data/case-studies.json'
import HeroCarousel from '../components/home/HeroCarousel'
import ClientLogos from '../components/home/ClientLogos'
import WhoWeAre from '../components/home/WhoWeAre'
import AboutInfo from '../components/home/AboutInfo'
import ServicesGrid from '../components/home/ServicesGrid'
import TechStackSlider from '../components/shared/TechStackSlider'
import ContentPreview from '../components/shared/ContentPreview'
import Testimonials from '../components/shared/Testimonials'
import CTABanner from '../components/ui/CTABanner'

export default function Home() {
  usePageMeta(home.meta.title, home.meta.description)

  const featuredBlogs = home.blogs.featuredIds
    .map((id) => blogs.posts.find((post) => post.id === id))
    .filter(Boolean)

  const featuredCases = home.caseStudies.featuredIds
    .map((id) => caseStudies.studies.find((study) => study.id === id))
    .filter(Boolean)

  return (
    <>
      <HeroCarousel data={home.hero} />
      <ClientLogos data={home.clients} />
      <WhoWeAre data={home.whoWeAre} />
      <AboutInfo data={home.aboutInfo} />
      <ServicesGrid data={home.services} />
      <CTABanner {...home.contactBanner} />
      <TechStackSlider data={home.technologies} />
      <ContentPreview
        eyebrow={home.blogs.eyebrow}
        title={home.blogs.title}
        description={home.blogs.description}
        items={featuredBlogs}
        viewAllPath={home.blogs.viewAllPath}
        viewAllLabel="View All Blogs"
        getHref={(item) => `/blogs/${item.slug}`}
        type="blog"
      />
      <ContentPreview
        eyebrow={home.caseStudies.eyebrow}
        title={home.caseStudies.title}
        description={home.caseStudies.description}
        items={featuredCases}
        viewAllPath={home.caseStudies.viewAllPath}
        viewAllLabel="View All Case Studies"
        getHref={(item) => `/case-studies/${item.slug}`}
        type="case"
      />
      <Testimonials data={home.testimonials} />
      <CTABanner {...home.finalCta} />
    </>
  )
}
