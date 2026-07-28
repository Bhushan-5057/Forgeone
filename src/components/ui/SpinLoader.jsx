export default function SpinLoader({ className = '', size = 48 }) {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span
        className="block animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          background:
            'conic-gradient(from 0deg, #38BDF8 0%, #8B5CF6 35%, #EC4899 65%, #F97316 85%, #38BDF8 100%)',
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
