/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainText: '#292626',
        secondaryText: '#615D5C',
        tertiaryText: '#7D7A79',
        accent: '#FF4800',
        background: '#F7F7F7',
        dividers: '#D9D5D3',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        'in-out-expo': 'cubic-bezier(0.34, 0, 0.36, 1)',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      spacing: {
        gutter: 'var(--gutter)',
        columnGap: 'var(--columnGap)',
      },
      lineHeight: {
        tight: 1.2,
      },
      screens: {
        md: '819px',
        lg: '1024px',
        ml: '1350px',
        xl: '1600px',
      },
      fontFamily: {
        monoRegular: ['Semi-Mono', 'monospace'],
        monoMedium: ['Semi-Mono-Medium', 'monospace'],
        sansMedium: ['Geist-Medium', 'sans-serif'],
        sansRegular: ['Geist', 'sans-serif'],
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
