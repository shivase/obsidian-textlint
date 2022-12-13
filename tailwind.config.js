/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tailwind-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{ts,tsx}'],
  theme: {},
  plugins: [require('daisyui')],
  purge: false,
  daisyui: {
    prefix: 'daisy-',
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
