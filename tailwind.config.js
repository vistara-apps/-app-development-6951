/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(24, 94%, 50%)',
        accent: 'hsl(204, 70%, 53%)',
        background: 'hsl(210, 36%, 96%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(210, 40%, 12%)',
        'text-secondary': 'hsl(210, 40%, 35%)',
        purple: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e4deff',
          300: '#d1c4ff',
          400: '#b79eff',
          500: '#9c73ff',
          600: '#8b4dff',
          700: '#7c3aed',
          800: '#6b21d0',
          900: '#581c87',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.625rem',
        'lg': '1rem',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 40%, 12%, 0.08)',
        'glow': '0 0 20px rgba(156, 115, 255, 0.4)',
      },
      spacing: {
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}