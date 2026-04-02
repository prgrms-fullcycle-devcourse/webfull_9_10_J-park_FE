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
      ping: {
        '75%, 100%': { transform: 'scale(1.2)', opacity: '0' },
      },
    },
    // 2. Map the keyframes to utility names
    animation: {
      ping: 'ping 1s ease-in-out infinite',
    },
    fontFamily: {
      notosan: ['NotoSan', 'sans-serif'],
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui(), tailWindScrollbarHide],
};

export default config;
