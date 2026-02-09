/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          50: 'hsl(217, 91%, 95%)',
          100: 'hsl(217, 91%, 90%)',
          200: 'hsl(217, 91%, 80%)',
          300: 'hsl(217, 91%, 70%)',
          400: 'hsl(217, 91%, 65%)',
          500: 'hsl(217, 91%, 60%)',
          600: 'hsl(217, 91%, 50%)',
          700: 'hsl(217, 91%, 40%)',
          800: 'hsl(217, 91%, 30%)',
          900: 'hsl(217, 91%, 20%)',
        },
        secondary: {
          DEFAULT: 'hsl(142, 76%, 36%)',
          50: 'hsl(142, 76%, 95%)',
          100: 'hsl(142, 76%, 85%)',
          200: 'hsl(142, 76%, 70%)',
          300: 'hsl(142, 76%, 55%)',
          400: 'hsl(142, 76%, 45%)',
          500: 'hsl(142, 76%, 36%)',
          600: 'hsl(142, 76%, 28%)',
          700: 'hsl(142, 76%, 22%)',
        },
        dark: {
          DEFAULT: 'hsl(240, 10%, 8%)',
          50: 'hsl(240, 6%, 20%)',
          100: 'hsl(240, 6%, 16%)',
          200: 'hsl(240, 8%, 12%)',
          300: 'hsl(240, 10%, 10%)',
          400: 'hsl(240, 10%, 8%)',
          500: 'hsl(240, 12%, 6%)',
          600: 'hsl(240, 14%, 4%)',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
