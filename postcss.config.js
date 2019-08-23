const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssMqpacker = require('css-mqpacker')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  plugins: [
    autoprefixer({
      add: true,
      grid: true
    }),
    // Only add purgecss, css-mqpacker in production
    !isDev
      ? purgecss({
        content: ['./src/**/*.html', './src/**/*.vue']
      })
      : '',
    !isDev ? cssMqpacker() : ''
  ]
}
