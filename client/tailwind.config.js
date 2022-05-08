module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 53px -14px rgba(88, 87, 115, 0.23);',
      },
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif']
      },
      colors: {
        'color3': '#FF6A74',
        'purp1': '#3734A9'
      },
    },
    plugins: [],
  }
}
