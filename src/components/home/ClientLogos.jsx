import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import SectionHeading from '../ui/SectionHeading'
import 'swiper/css'

export default function ClientLogos({ data }) {
  return (
    <section className="section-pad section-divider bg-white/80 py-12 sm:py-16">
      <div className="container-wide">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          align="center"
          className="mb-10"
        />
        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          loop
          slidesPerView={2}
          spaceBetween={24}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4500}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="client-logos"
        >
          {data.logos.map((logo) => (
            <SwiperSlide key={logo.name}>
              <div className="flex h-20 items-center justify-center px-4 grayscale transition-all duration-300 hover:grayscale-0">
                <img src={logo.image} alt={logo.name} className="max-h-20 w-auto max-w-[140px] object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style>{`
        .client-logos .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  )
}
