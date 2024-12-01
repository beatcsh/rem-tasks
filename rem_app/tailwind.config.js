module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        fondogris: '#1d252c',
        titulos: '#a4acbc',
        morado: '#690b9b',
        moradobajo: '#9a26bd'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
