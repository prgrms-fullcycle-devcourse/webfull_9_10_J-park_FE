import { heroui } from '@heroui/react';
import tailWindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      notosan: ['NotoSan', 'sans-serif'],
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui(), tailWindScrollbarHide],
};

export default config;
