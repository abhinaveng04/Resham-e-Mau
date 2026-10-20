/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6F0',
          50: '#FFFFFF',
          100: '#FAF6F0',
          200: '#F3ECE0',
          300: '#E7DC melt',
          400: '#D9C8AF',
          border: '#E8DEC8',
        },
        maroon: {
          DEFAULT: '#5A1827',
          50: '#FBF4F5',
          100: '#F5E4E7',
          200: '#EAC2C9',
          600: '#6B1E30',
          700: '#5A1827',
          800: '#47111D',
          900: '#340C15',
        },
        gold: {
          DEFAULT: '#C59B27',
          50: '#FDFBF4',
          100: '#FAF5E3',
          200: '#F2E4B9',
          300: '#E6D089',
          400: '#D7B951',
          500: '#C59B27',
          600: '#A9811C',
          700: '#8A6615',
        },
        charcoal: {
          DEFAULT: '#1F1A1C',
          muted: '#5C5457',
          light: '#8E8588',
        },
        emerald: {
          trust: '#1B5E20',
          light: '#E8F5E9',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(90, 24, 39, 0.12)',
        'card': '0 4px 20px -2px rgba(31, 26, 28, 0.06)',
        'gold-glow': '0 0 20px rgba(197, 155, 39, 0.25)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
