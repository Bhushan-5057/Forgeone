import { Link } from 'react-router-dom'

export default function Logo({ className = '', light = false, compact = false }) {
  const src = light ? '/assets/logo/forgeone_logo_white.png' : '/assets/logo/forgeone_logo.webp'

  return (
    <Link
      to="/"
      className={`group inline-flex items-center justify-center ${className}`}
      aria-label="Forgeone home"
    >
      <img
        src={src}
        alt="Forgeone"
        className={`block w-auto max-w-none object-contain object-center transition-opacity group-hover:opacity-90 ${
          compact ? 'h-10 sm:h-11' : 'h-[3.25rem] sm:h-14'
        }`}
      />
    </Link>
  )
}
