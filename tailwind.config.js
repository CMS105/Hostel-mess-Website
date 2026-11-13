/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Institutional University Operations Palette
        forest: {
          DEFAULT: '#183F32',
          50: '#f0f5f2',
          100: '#dce7dc',
          200: '#b8d0b9',
          300: '#8eb390',
          400: '#649567',
          500: '#3f7344',
          600: '#2d5b32',
          700: '#183F32', // Brand Primary Forest Green
          800: '#123126',
          900: '#0c221a',
          950: '#071510',
        },
        charcoal: {
          DEFAULT: '#252A27',
          50: '#f6f7f6',
          100: '#e5e7e5',
          200: '#c7cbc8',
          300: '#a3aca5',
          400: '#7e8b81',
          500: '#5e6c62',
          600: '#46534a',
          700: '#343e37',
          800: '#252A27', // Brand Deep Charcoal
          900: '#1a1f1b',
          950: '#101311',
        },
        ivory: {
          DEFAULT: '#F7F5EF',
          50: '#fdfcf9',
          100: '#F7F5EF', // Brand Warm Ivory
          200: '#ece7db',
          300: '#ded5c1',
          400: '#cbbea1',
          500: '#b4a381',
          600: '#948363',
          700: '#75664b',
          800: '#584d38',
          900: '#3c3426',
        },
        mustard: {
          DEFAULT: '#D8B65A',
          50: '#fbf8ee',
          100: '#f5ecd1',
          200: '#ebdaa6',
          300: '#dfc57a',
          400: '#D8B65A', // Brand Muted Mustard
          500: '#c59f42',
          600: '#a48031',
          700: '#816226',
          800: '#614920',
          900: '#443217',
        },
        sage: {
          DEFAULT: '#DCE7DC',
          50: '#f4f8f4',
          100: '#DCE7DC', // Brand Soft Sage
          200: '#c0d4c1',
          300: '#9fbfa1',
          400: '#7da780',
          500: '#5e8c62',
          600: '#486e4b',
          700: '#365338',
          800: '#273b28',
          900: '#1a271b',
        },
        terracotta: {
          DEFAULT: '#B66B50',
          50: '#faf2ee',
          100: '#f2dfd7',
          200: '#e4beaf',
          300: '#d39882',
          400: '#B66B50', // Brand Terracotta
          500: '#a1563b',
          600: '#84422b',
          700: '#683321',
          800: '#4f2518',
          900: '#381a10',
        },
        // Backward-compatibility aliases so existing components render seamlessly
        leaf: {
          50: '#f0f5f2',
          100: '#dce7dc',
          200: '#b8d0b9',
          300: '#8eb390',
          400: '#649567',
          500: '#3f7344',
          600: '#2d5b32',
          700: '#183F32',
          800: '#123126',
          900: '#0c221a',
        },
        cream: {
          50: '#fdfcf9',
          100: '#F7F5EF',
          200: '#ece7db',
          300: '#ded5c1',
          400: '#cbbea1',
          500: '#b4a381',
        },
        turmeric: {
          50: '#fbf8ee',
          100: '#f5ecd1',
          200: '#ebdaa6',
          300: '#dfc57a',
          400: '#D8B65A',
          500: '#c59f42',
          600: '#a48031',
          700: '#816226',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
