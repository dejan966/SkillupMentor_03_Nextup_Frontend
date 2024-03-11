/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      phone: '340px',
      tablet: '800px',
      laptop: '1140px',
      desktop: '1650px',
    },
  },
  plugins: [],
}
