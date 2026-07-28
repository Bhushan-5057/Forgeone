import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock3, Mail, MessageSquare, Sparkles, Target } from 'lucide-react'
import contact from '../data/contact.json'
import { usePageMeta } from '../hooks/usePageMeta'
import PageHero from '../components/shared/PageHero'
import Button from '../components/ui/Button'
import { scaleIn } from '../lib/motion'

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const pointIcons = [MessageSquare, Sparkles, Target]

export default function Contact() {
  usePageMeta(contact.meta.title, contact.meta.description)

  const initial = useMemo(
    () => ({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }),
    []
  )

  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!emailOk(form.email)) next.email = 'Enter a valid email address.'
    if (!form.phone.trim()) next.phone = 'Please enter a phone number.'
    if (!form.subject) next.subject = 'Please select a subject.'
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = 'Please share a bit more detail (at least 20 characters).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm(initial)
  }

  const fieldClass = (field) =>
    `w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-steel/50 focus:border-brand-secondary ${
      errors[field] ? 'border-red-400' : 'border-ink/10'
    }`

  return (
    <>
      <PageHero {...contact.hero} />

      <section className="section-pad site-section">
        <div className="container-wide lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
          <aside className="premium-panel-dark relative hidden overflow-hidden lg:flex lg:flex-col">
            <img
              src={contact.aside.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/88 to-brand-primary/56" />
            <div className="relative z-10 flex h-full flex-col justify-center gap-10 p-8 xl:p-10">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
                  {contact.aside.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance xl:text-4xl text-white">
                  {contact.aside.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
                  {contact.aside.description}
                </p>
              </div>

              <ul className="space-y-5">
                {contact.aside.points.map((point, index) => {
                  const Icon = pointIcons[index] || MessageSquare
                  return (
                    <li key={point.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-brand-neutral/20 bg-brand-primary/40 text-brand-secondary">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-white">
                          {point.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/65">
                          {point.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          <div className="premium-panel flex h-full flex-col p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial="hidden"
                animate="show"
                variants={scaleIn}
                className="flex h-full min-h-[360px] flex-col items-start justify-center"
              >
                <CheckCircle2 className="text-brand-secondary" size={40} />
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  {contact.form.success.title}
                </h3>
                <p className="mt-3 text-steel">{contact.form.success.message}</p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 flex flex-wrap gap-3">
                  <div className="rounded-full border border-brand-secondary/18 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
                    Fast response
                  </div>
                  <div className="rounded-full border border-brand-primary/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary/70">
                    Senior review
                  </div>
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  {contact.form.title}
                </h2>
                <p className="mt-2 text-sm text-steel">{contact.form.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-primary/72">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} className="text-brand-secondary" />
                    Response within one business day
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail size={15} className="text-brand-secondary" />
                    Direct contact with the team
                  </span>
                </div>

                <form onSubmit={onSubmit} className="mt-6 flex flex-1 flex-col space-y-4" noValidate>
                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      {contact.form.fields.name.label}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder={contact.form.fields.name.placeholder}
                      className={fieldClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                        {contact.form.fields.email.label}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        placeholder={contact.form.fields.email.placeholder}
                        className={fieldClass('email')}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                        {contact.form.fields.phone.label}
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder={contact.form.fields.phone.placeholder}
                        className={fieldClass('phone')}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      {contact.form.fields.subject.label}
                    </label>
                    <select
                      value={form.subject}
                      onChange={update('subject')}
                      className={fieldClass('subject')}
                    >
                      <option value="">{contact.form.fields.subject.placeholder}</option>
                      {contact.form.fields.subject.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>

                  <div className="flex-1">
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      {contact.form.fields.message.label}
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder={contact.form.fields.message.placeholder}
                      className={`${fieldClass('message')} min-h-[120px] resize-y`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    {contact.form.submitLabel}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
