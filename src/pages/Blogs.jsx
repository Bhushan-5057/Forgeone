import blogs from '../data/blogs.json'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/shared/PageHero'
import ContentListing from '../components/shared/ContentListing'
import CTABanner from '../components/ui/CTABanner'

export default function Blogs() {
  usePageMeta(blogs.meta.title, blogs.meta.description)

  return (
    <>
      <PageHero {...blogs.hero} />
      <ContentListing
        items={blogs.posts}
        categories={blogs.categories}
        featuredId={blogs.featuredId}
        getHref={(item) => `/blogs/${item.slug}`}
        type="blog"
      />
      {blogs.cta && <CTABanner {...blogs.cta} />}
    </>
  )
}
