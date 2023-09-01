import type { Config } from 'tailwindcss'

import _ from 'lodash'

export default {
  content: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.mdx'],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      spacing: Object.fromEntries(
        _.range(0, 211).map((n) => [n / 2, `${n / 8}rem`])
      ),
    },
    fontFamily: {
      body: ['system-ui'],
    },
    fontSize: Object.fromEntries(
      _.range(10, 81, 1).map((n) => [n, `${n / 16}rem`])
    ),
    lineHeight: Object.fromEntries(
      _.range(100, 201, 5).map((n) => [n / 100, String(n / 100)])
    ),
    maxWidth: {
      none: 'none',
      ...Object.fromEntries(
        _.range(0, 1201, 2).map((n) => [n / 4, `${n / 16}rem`])
      ),
    },
  },
} satisfies Config
