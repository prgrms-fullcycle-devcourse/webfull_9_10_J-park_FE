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
      colorCycle: {
        '0%, 100%': {
          backgroundPosition: '0% 50%',
        },
        '50%': { backgroundPosition: '100% 50%' },
      },
      ping: {
        '75%, 100%': { transform: 'scale(1.2)', opacity: '0' },
      },
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInOut: {
        '0%, 100%': { opacity: '0' },
        '20%, 90%': { opacity: '1' },
      },
    },
    animation: {
      bgCycle: 'colorCycle 12s ease infinite',
      fadeIn: 'fadeIn 0.5s ease-out forwards',
      fadeInOut: 'fadeInOut 15s ease-out forwards',
      ping: 'ping 1s ease-in-out infinite',
    },
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
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
