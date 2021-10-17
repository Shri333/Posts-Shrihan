module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        '165': '1.65',
        '200': '2'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
