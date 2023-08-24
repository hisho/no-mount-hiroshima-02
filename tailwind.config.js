const _ = require('lodash')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.ts', './src/**/*.tsx'],
  plugins: [require('@tailwindcss/container-queries')],
  theme: {
    fontFamily: {
      body: ['system-ui'],
    },
  },
  theme: {
    extend: {
      spacing: Object.fromEntries(
        _.range(0, 211).map((n) => [n / 2, `${n / 8}rem`])
      ),
    },
    fontSize: Object.fromEntries(
      _.range(10, 81, 1).map((n) => [n, `${n / 16}rem`])
    ),
    lineHeight: Object.fromEntries(
      _.range(100, 201, 5).map((n) => [n / 100, n / 100])
    ),
    maxWidth: {
      none: 'none',
      ...Object.fromEntries(
        _.range(0, 1201, 2).map((n) => [n / 4, `${n / 16}rem`])
      ),
    },
  },
}
