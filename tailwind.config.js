/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#07111F',
            soft: '#0D1A2E',
            muted: '#14243D',
          },
          secondary: {
            DEFAULT: '#38BDF8',
            soft: '#E0F2FE',
            deep: '#0EA5E9',
          },
          accent: {
            DEFAULT: '#8B5CF6',
            soft: '#EDE9FE',
            deep: '#7C3AED',
          },
          neutral: {
            DEFAULT: '#F8FAFC',
            warm: '#EFF4FF',
            card: '#FFFFFF',
            muted: '#7C8AA5',
          },
          surface: {
            1: '#0A1629',
            2: '#0F1D33',
            3: '#142744',
          },
          success: '#10B981',
          error: '#EF4444',
        },
        ink: {
          DEFAULT: '#07111F',
          soft: '#0D1A2E',
          muted: '#14243D',
        },
        steel: {
          DEFAULT: '#52627F',
          light: '#7C8AA5',
          pale: '#B2C0DA',
        },
        ember: {
          DEFAULT: '#38BDF8',
          deep: '#0EA5E9',
          soft: '#7DD3FC',
          glow: '#E0F2FE',
        },
        frost: {
          DEFAULT: '#F8FAFC',
          warm: '#EFF4FF',
          card: '#FFFFFF',
        },
        teal: {
          DEFAULT: '#8B5CF6',
          soft: '#EDE9FE',
        },
        night: '#030712',
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        body: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
        wide: '1400px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 16px 50px rgba(7, 17, 31, 0.08)',
        lift: '0 24px 80px rgba(7, 17, 31, 0.16)',
        nav: '0 12px 40px rgba(3, 7, 18, 0.22)',
        glow: '0 0 0 1px rgba(148, 163, 184, 0.08), 0 24px 70px rgba(56, 189, 248, 0.15)',
      },
      backgroundImage: {
        'mesh-dark':
          'radial-gradient(circle at top left, rgba(56, 189, 248, 0.20), transparent 32%), radial-gradient(circle at top right, rgba(139, 92, 246, 0.16), transparent 28%), linear-gradient(180deg, rgba(7, 17, 31, 1) 0%, rgba(10, 22, 41, 1) 52%, rgba(248, 250, 252, 0.98) 100%)',
        'grid-light':
          'linear-gradient(rgba(124, 138, 165, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 138, 165, 0.08) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
