import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import caseStudies from '../data/case-studies.json'
import { usePageMeta } from '../hooks/usePageMeta'
import CTABanner from '../components/ui/CTABanner'
import ContentPreview from '../components/shared/ContentPreview'
import ScrambleText from '../components/ui/ScrambleText'
import { fadeUp, scaleIn, viewportOnce } from '../lib/motion'

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = caseStudies.studies.find((item) => item.slug === slug)
  const related = caseStudies.studies.filter((item) => item.slug !== slug).slice(0, 2)

  usePageMeta(study ? `${study.title} | Forgeone` : 'Case Studies | Forgeone', study?.excerpt)

  if (!study) return <Navigate to="/case-studies" replace />

  return (
    <>
      <motion.article initial="hidden" animate="show" variants={fadeUp}>
        <div className="relative overflow-hidden bg-mesh-dark pt-28 sm:pt-32">
          <img src={study.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-24" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary/55" />
          <div className="absolute inset-0 premium-grid-dark opacity-20" />
          <div className="relative container-wide section-pad py-14 sm:py-18">
            <Link
              to="/case-studies"
              className="mb-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-neutral/70 hover:text-brand-secondary"
            >
              <ArrowLeft size={16} /> Back to case studies
            </Link>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-secondary">
              {study.industry} · {study.client}
            </p>
            <ScrambleText
              as="h1"
              text={study.title}
              className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.04em] text-brand-neutral text-balance sm:text-4xl lg:text-5xl"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-neutral/75 sm:text-lg">
              {study.excerpt}
            </p>
          </div>
        </div>

        <div className="container-wide section-pad py-12 sm:py-16">
          {study.results?.length > 0 && (
            <div className="mb-12 grid gap-4 sm:grid-cols-3">
              {study.results.map((result) => (
                <motion.div
                  key={result.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={scaleIn}
                  className="premium-card p-6 text-center"
                >
                  <p className="font-display text-3xl font-bold text-brand-secondary sm:text-4xl">{result.metric}</p>
                  <p className="mt-2 text-sm text-steel">{result.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            {study.sections?.length > 0 ? (
              <div className="space-y-12">
                {study.sections.map((section) => (
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
              <>
                <div className="premium-card mb-10 p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold text-brand-primary">Challenge</h2>
                  <p className="mt-3 text-base leading-relaxed text-steel sm:text-lg">{study.challenge}</p>
                </div>
                <div className="premium-card mb-10 p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold text-brand-primary">Solution</h2>
                  <p className="mt-3 text-base leading-relaxed text-steel sm:text-lg">{study.solution}</p>
                </div>
                {study.content?.length > 0 && (
                  <div className="space-y-5">
                    {study.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="text-base leading-[1.85] text-steel sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </>
            )}

            {study.services?.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                  Services involved
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span key={service} className="rounded-full border border-brand-primary/10 bg-white/80 px-3 py-1.5 text-sm text-brand-primary">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.article>

      {related.length > 0 && (
        <ContentPreview
          eyebrow="More Proof"
          title="Related case studies"
          description="Other engagements with measurable outcomes."
          items={related}
          viewAllPath="/case-studies"
          viewAllLabel="All Case Studies"
          getHref={(item) => `/case-studies/${item.slug}`}
          type="case"
        />
      )}

      {caseStudies.cta && <CTABanner {...caseStudies.cta} />}
    </>
  )
}
