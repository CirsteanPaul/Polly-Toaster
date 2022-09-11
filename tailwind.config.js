/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      accent: '#E2A750',
      headline: '#D9D9D9',
      title: '#242424',
      overlay: 'rgba(43, 43, 43, 0.7);',
      text: '#272C2F',
      border: '#2B2B2B',
      background: '#1E1E1E',
      footer: '#4D4B4B',
      fontBackground: '#2B2B2B',
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
      xs: { max: '500px' },
    },
    extend: {
      backgroundImage: {
        'banner-image': "url('../public/repeated-bg.jpg')",
        'new-portal': "url('../public/new-portal.jpg')",
      },
    },
  },
  plugins: [],
};
