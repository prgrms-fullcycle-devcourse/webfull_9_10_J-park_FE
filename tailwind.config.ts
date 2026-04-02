import { heroui } from '@heroui/react';
import tailWindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-out forwards',
    },
    fontFamily: {
      notosan: ['NotoSan', 'sans-serif'],
    },
    extend: {
      keyframes: {
        'slide-loop': {
          from: { transform: 'translateX(50%)' },
          to: { transform: 'translateX(-105%)' },
        },
      },
      animation: {
        'slide-loop': 'slide-loop 20s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui(), tailWindScrollbarHide],
};

export default config;
