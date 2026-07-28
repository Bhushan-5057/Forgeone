import { motion } from 'framer-motion'
import about from '../data/about.json'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/shared/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import { fadeUp, scaleIn, staggerWrap, viewportOnce } from '../lib/motion'
import { iconMap } from '../lib/iconMap'

export default function About() {
  usePageMeta(about.meta.title, about.meta.description)

  return (
    <>
      <PageHero {...about.hero} />

      <section className="section-pad site-section">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
            <div className="mt-6 space-y-4">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-steel">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <motion.img
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={scaleIn}
            src={about.story.image}
            alt=""
            className="aspect-[4/3] w-full rounded-[32px] object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="section-pad site-section section-divider bg-white/70">
        <div className="container-wide">
          <SectionHeading
            eyebrow={about.mission.eyebrow}
            title={about.mission.title}
            description={about.mission.description}
            className="mb-12"
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerWrap(0.08, 0.08)}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {about.mission.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={index % 2 === 0 ? fadeUp : scaleIn}
                className="premium-card p-6"
              >
                <h3 className="font-display text-xl font-semibold text-brand-primary">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {about.approach && (
        <>
          <section className="section-pad site-section">
            <div className="container-wide">
              <SectionHeading
                eyebrow={about.approach.eyebrow}
                title={about.approach.title}
                description={about.approach.description}
                className="mb-12"
              />
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {about.approach.steps.map((step, index) => {
                  const Icon = iconMap[step.icon] || iconMap.Circle
                  return (
                    <motion.div
                      key={step.number}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportOnce}
                      variants={fadeUp}
                      transition={{ delay: index * 0.06 }}
                      className="premium-card p-5"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-secondary/12 text-brand-secondary">
                        <Icon size={20} />
                      </div>
                      <p className="font-display text-sm font-bold text-brand-secondary">{step.number}</p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-brand-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-steel">{step.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          {about.approach.milestones && (
            <section className="section-pad site-section overflow-hidden bg-mesh-dark py-16 sm:py-20">
              <div className="container-wide">
                <SectionHeading
                  eyebrow="Our Journey"
                  title="Milestones that shaped how we deliver."
                  light
                  className="mb-10"
                />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {about.approach.milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportOnce}
                      variants={scaleIn}
                      transition={{ delay: index * 0.06 }}
                      className="premium-panel-dark p-5"
                    >
                      <p className="font-display text-2xl font-bold text-brand-secondary">{milestone.year}</p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-brand-neutral">{milestone.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-neutral/70">{milestone.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {about.culture && (
        <section className="section-pad site-section">
          <div className="container-wide">
            <SectionHeading
              eyebrow={about.culture.eyebrow}
              title={about.culture.title}
              description={about.culture.description}
              className="mb-12"
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {about.culture.values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ delay: index * 0.06 }}
                  className="premium-card p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-brand-primary">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner {...about.cta} />
    </>
  )
}
