/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    keyframes: {},
    animation: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  purge: false,
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
