import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.sky,
        success: colors.green,
        danger: colors.red,
        info: colors.cyan,
        warn: colors.yellow,
        default: colors.gray,
      },
    },
  },
  plugins: [],
} satisfies Config;
