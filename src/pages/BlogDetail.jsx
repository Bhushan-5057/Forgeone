import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import blogs from '../data/blogs.json'
import { usePageMeta } from '../hooks/usePageMeta'
import CTABanner from '../components/ui/CTABanner'
import ContentPreview from '../components/shared/ContentPreview'
import ScrambleText from '../components/ui/ScrambleText'
import { fadeUp } from '../lib/motion'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogs.posts.find((item) => item.slug === slug)
  const related = blogs.posts.filter((item) => item.slug !== slug).slice(0, 3)

  usePageMeta(post ? `${post.title} | Forgeone` : 'Blog | Forgeone', post?.excerpt)

  if (!post) return <Navigate to="/blogs" replace />

  return (
    <>
      <motion.article
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="relative overflow-hidden bg-mesh-dark pt-28 sm:pt-32">
          <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-24" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary/60" />
          <div className="absolute inset-0 premium-grid-dark opacity-20" />
          <div className="relative container-wide section-pad py-14 sm:py-18">
            <Link
              to="/blogs"
              className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-neutral/70 hover:text-brand-secondary"
            >
              <ArrowLeft size={16} /> Back to blogs
            </Link>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">
              {post.category}
            </p>
            <ScrambleText
              as="h1"
              text={post.title}
              className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.04em] text-brand-neutral text-balance sm:text-4xl lg:text-5xl"
            />
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-brand-neutral/65">
              <span>{post.author}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="container-wide section-pad py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="premium-card p-6 text-xl font-medium leading-relaxed text-brand-primary">{post.excerpt}</p>

            {post.sections?.length > 0 ? (
              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-brand-primary">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)} className="text-base leading-[1.85] text-steel sm:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="mt-10 space-y-5">
                {post.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-base leading-[1.85] text-steel sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {post.takeaway && (
              <blockquote className="premium-card mt-12 p-6 sm:p-8">
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-secondary">Key Takeaway</p>
                <p className="mt-3 text-base leading-relaxed text-brand-primary sm:text-lg">{post.takeaway}</p>
              </blockquote>
            )}

            {post.tags?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-brand-primary/10 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>

      {related.length > 0 && (
        <ContentPreview
          eyebrow="Keep Reading"
          title="Related articles"
          description="More perspectives from the Forgeone team."
          items={related}
          viewAllPath="/blogs"
          viewAllLabel="All Blogs"
          getHref={(item) => `/blogs/${item.slug}`}
          type="blog"
        />
      )}

      {blogs.cta && <CTABanner {...blogs.cta} />}
    </>
  )
}
