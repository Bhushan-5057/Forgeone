import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import Button from '../ui/Button'

export default function ServicesGrid({ data }) {
  return (
    <section className="section-pad site-section">
      <div className="container-wide">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            className="max-w-3xl"
          />
          <Button to="/contact" variant="outline" className="self-start lg:self-auto">
            Discuss Your Roadmap
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.items.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
