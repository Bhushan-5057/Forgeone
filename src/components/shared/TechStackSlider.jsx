import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp } from '../../lib/motion'
import 'swiper/css'

export default function TechStackSlider({ data }) {
  const [active, setActive] = useState(data.categories[0])

  const filtered = useMemo(
    () => data.items.filter((item) => item.category === active),
    [active, data.items]
  )

  return (
    <section className="section-pad section-divider bg-white/60 py-16 sm:py-20">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          align="center"
          className="mb-10"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {data.categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                active === category
                  ? 'border-brand-secondary/30 bg-brand-primary text-frost'
                  : 'border-brand-primary/8 bg-white/90 text-steel hover:border-brand-secondary/30 hover:text-ink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fadeUp}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {filtered.map((tech) => (
                <SwiperSlide key={tech.name}>
                  <div className="flex h-28 flex-col items-center justify-center gap-3 px-4 text-center">
                    <img src={tech.logo} alt="" className="h-16 w-16 object-contain" />
                    <span className="font-display text-sm font-semibold text-ink">{tech.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
