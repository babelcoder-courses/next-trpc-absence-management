import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
