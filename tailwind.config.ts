import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f7',
          100: '#e6e9e9',
          200: '#c5cccd',
          300: '#9ba6a8',
          400: '#6f7d7f',
          500: '#4f5d60',
          600: '#3a484b',
          700: '#2a3537',
          800: '#1a2123',
          900: '#0c1112',
          950: '#060809'
        },
        emerald: {
          50: '#effaf5',
          100: '#d8f3e3',
          200: '#b3e6cb',
          300: '#7fd1a9',
          400: '#48b483',
          500: '#1f9966',
          600: '#0f7c52',
          700: '#0a6243',
          800: '#0a4e37',
          900: '#0a3e2e',
          950: '#03241b'
        },
        gold: {
          50: '#fbf8f1',
          100: '#f4ecd8',
          200: '#e8d6ad',
          300: '#dabb7e',
          400: '#cd9e57',
          500: '#c4884a',
          600: '#a86c3c',
          700: '#875133',
          800: '#6f4230',
          900: '#5d382c',
          950: '#341c14'
        },
        cream: {
          50: '#fefcf7',
          100: '#fbf6e9',
          200: '#f5ebcd',
          300: '#eddca6',
          400: '#e3c87a',
          500: '#d9b358'
        },
        primary: {
          DEFAULT: '#0a3e2e',
          dark: '#03241b',
          light: '#0f7c52'
        },
        accent: {
          DEFAULT: '#cd9e57',
          dark: '#a86c3c',
          light: '#dabb7e'
        }
      },
      fontFamily: {
        sans: ['Lexend', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        editorial: '-0.03em'
      },
      maxWidth: {
        container: '1240px',
        prose: '70ch'
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(10, 62, 46, 0.08)',
        card: '0 16px 48px -16px rgba(10, 62, 46, 0.18)',
        glow: '0 0 60px -10px rgba(205, 158, 87, 0.55)',
        ring: '0 0 0 1px rgba(255, 255, 255, 0.08)',
        inset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)'
      },
      backgroundImage: {
        'mesh-emerald':
          'radial-gradient(at 20% 0%, rgba(15, 124, 82, 0.45) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(205, 158, 87, 0.35) 0px, transparent 50%), radial-gradient(at 30% 90%, rgba(31, 153, 102, 0.35) 0px, transparent 50%)',
        'mesh-cream':
          'radial-gradient(at 0% 0%, rgba(218, 187, 126, 0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(15, 124, 82, 0.08) 0px, transparent 50%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      },
      animation: {
        'fade-in': 'fadeIn .8s ease-out both',
        'slide-up': 'slideUp .9s cubic-bezier(.22,1,.36,1) both',
        'float': 'float 8s ease-in-out infinite',
        'mesh-shift': 'meshShift 18s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'marquee': 'marquee 30s linear infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        meshShift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(2%, -2%) scale(1.03)' },
          '66%': { transform: 'translate(-2%, 1%) scale(0.98)' }
        },
        gradientX: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
