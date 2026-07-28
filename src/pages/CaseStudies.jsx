import caseStudies from '../data/case-studies.json'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/shared/PageHero'
import ContentListing from '../components/shared/ContentListing'
import CTABanner from '../components/ui/CTABanner'

export default function CaseStudies() {
  usePageMeta(caseStudies.meta.title, caseStudies.meta.description)

  return (
    <>
      <PageHero {...caseStudies.hero} />
      <ContentListing
        items={caseStudies.studies}
        categories={caseStudies.categories}
        featuredId={caseStudies.featuredId}
        getHref={(item) => `/case-studies/${item.slug}`}
        type="case"
      />
      {caseStudies.cta && <CTABanner {...caseStudies.cta} />}
    </>
  )
}
