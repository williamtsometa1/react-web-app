import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#31394F',
          gray: '#828282',
          white: '#F5F5F5',
        },
        sencondary: {
          black: '#9998AE',
          gray: '#31394FB2',
        },
        backgroundGradient: {
          from: '#DECDC9',
          to: '#9998AE',
        },
        decoration: {
          gray: '#DCDCDC',
        },
        disabled: {
          input: '#31394F80',
        },
      },
    },
  },
  plugins: [],
};
export default config;
