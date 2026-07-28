import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/shared/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import FAQ from '../components/shared/FAQ'
import CTABanner from '../components/ui/CTABanner'
import ContentPreview from '../components/shared/ContentPreview'
import blogs from '../data/blogs.json'
import caseStudies from '../data/case-studies.json'
import { fadeUp, scaleIn, viewportOnce } from '../lib/motion'
import { iconMap } from '../lib/iconMap'

const serviceModules = import.meta.glob('../data/services/*.json', { eager: true })

const servicesBySlug = Object.values(serviceModules).reduce((acc, mod) => {
  const data = mod.default || mod
  if (data?.slug) acc[data.slug] = data
  return acc
}, {})

export default function ServicePage() {
  const { slug } = useParams()
  const service = servicesBySlug[slug]

  usePageMeta(service?.meta?.title || 'Services | Forgeone', service?.meta?.description)

  if (!service) return <Navigate to="/" replace />

  const relatedCases = (service.relatedCaseStudyIds || [])
    .map((id) => caseStudies.studies.find((s) => s.id === id))
    .filter(Boolean)

  const relatedBlogs = (service.relatedBlogIds || [])
    .map((id) => blogs.posts.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <>
      <PageHero {...service.hero} />

      <section className="section-pad site-section">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={service.overview.eyebrow}
              title={service.overview.title}
              description={service.overview.description}
            />
          </div>
          <ul className="space-y-3 self-center">
            {service.overview.highlights.map((item) => (
              <li
                key={item}
                className="premium-card flex gap-3 px-4 py-3 text-sm text-steel"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad site-section section-divider bg-white/70">
        <div className="container-wide">
          <SectionHeading
            eyebrow={service.offerings.eyebrow}
            title={service.offerings.title}
            description={service.offerings.description}
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {service.offerings.items.map((item, index) => {
              const Icon = iconMap[item.icon] || iconMap.Box
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="premium-card p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-secondary/12 text-brand-secondary">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad site-section">
        <div className="container-wide">
          <SectionHeading
            eyebrow={service.process.eyebrow}
            title={service.process.title}
            description={service.process.description}
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {service.process.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={index % 2 === 0 ? fadeUp : scaleIn}
                transition={{ delay: index * 0.06 }}
                className="premium-card p-5"
              >
                <p className="font-display text-sm font-bold text-brand-secondary">{step.number}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {service.tech && (
        <section className="section-pad section-divider bg-white/70 py-14 sm:py-16">
          <div className="container-wide">
            <SectionHeading
              eyebrow={service.tech.eyebrow}
              title={service.tech.title}
              description={service.tech.description}
              align="center"
              className="mb-8"
            />
            <div className="-mx-1 flex flex-nowrap items-end justify-start gap-5 overflow-x-auto px-1 pb-2 sm:gap-7 md:justify-center md:gap-8 md:overflow-visible lg:gap-10">
              {Array.from(
                new Map(
                  service.tech.items.map((tech) => {
                    const name = typeof tech === 'string' ? tech : tech.name
                    const logo = typeof tech === 'string' ? null : tech.logo
                    return [name, { name, logo }]
                  })
                ).values()
              ).map(({ name, logo }) => (
                <div
                  key={name}
                  className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2.5 sm:w-[5.25rem]"
                >
                  {logo && (
                    <img
                      src={logo}
                      alt={name}
                      className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                      loading="lazy"
                    />
                  )}
                  <span className="text-center font-display text-[0.7rem] font-semibold leading-tight text-ink sm:text-xs">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedCases.length > 0 && (
        <ContentPreview
          eyebrow="Related Work"
          title="Case studies in this capability"
          description="Selected engagements where this service created measurable outcomes."
          items={relatedCases}
          viewAllPath="/case-studies"
          viewAllLabel="All Case Studies"
          getHref={(item) => `/case-studies/${item.slug}`}
          type="case"
        />
      )}

      {relatedBlogs.length > 0 && (
        <ContentPreview
          eyebrow="Related Insights"
          title="Further reading"
          description="Perspectives that complement this service offering."
          items={relatedBlogs}
          viewAllPath="/blogs"
          viewAllLabel="All Blogs"
          getHref={(item) => `/blogs/${item.slug}`}
          type="blog"
        />
      )}

      {service.faqs && <FAQ data={service.faqs} />}
      <CTABanner {...service.cta} />
    </>
  )
}
