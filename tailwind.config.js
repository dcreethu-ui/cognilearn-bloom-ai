/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aesthetic palette inspired by warm terracotta & cream UI
        cream: {
          50: '#FDFBF7',
          100: '#FAF5EC',
          200: '#F5ECE0',
          300: '#EBDDCB',
          400: '#DFCBB3',
        },
        terracotta: {
          50: '#FDF6F0',
          100: '#FBECDE',
          200: '#F7D7BD',
          300: '#F1B78D',
          400: '#E89056',
          500: '#E06F28', // Core warm orange
          600: '#C7571B',
          700: '#A44116',
          800: '#843516',
          900: '#54220E',
        },
        espresso: {
          50: '#F9F6F4',
          100: '#EDE6E1',
          200: '#DCCEC4',
          400: '#997E6E',
          600: '#5F4738',
          800: '#3D2A1F',
          900: '#281A12',
        },
        // Bloom's Taxonomy Cognitive Level standard warm-harmonic colors
        bloom: {
          remember: {
            DEFAULT: '#4F6B8A', // Slate steel
            light: '#EAF0F6',
            dark: '#283B4F',
          },
          understand: {
            DEFAULT: '#5A8260', // Warm Sage
            light: '#EAF3EB',
            dark: '#2E4C33',
          },
          apply: {
            DEFAULT: '#D9822B', // Honey Amber
            light: '#FDF2E2',
            dark: '#854B10',
          },
          analyze: {
            DEFAULT: '#C95438', // Terracotta Coral
            light: '#FCEBE6',
            dark: '#7D2A16',
          },
          evaluate: {
            DEFAULT: '#884D6A', // Mulberry Wine
            light: '#F7EBF1',
            dark: '#54263D',
          },
          create: {
            DEFAULT: '#E65D24', // Saturated Mandarin
            light: '#FDEDE6',
            dark: '#8F320C',
          },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 4px 20px -2px rgba(61, 42, 31, 0.06), 0 2px 6px -1px rgba(61, 42, 31, 0.04)',
        'warm-md': '0 8px 30px -4px rgba(61, 42, 31, 0.1), 0 4px 10px -2px rgba(61, 42, 31, 0.06)',
        'warm-lg': '0 16px 40px -6px rgba(61, 42, 31, 0.14), 0 6px 16px -3px rgba(61, 42, 31, 0.08)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
