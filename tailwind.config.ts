import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-grey': 'rgba( 36,38,40 ,0.5)',
        'custom-grey-hover': 'rgba( 36,38,40 ,0.15)',
        'custom-grey-card': 'rgba( 36,38,40 ,0.05)',
        'custom-black-grey': 'rgba( 36,38,40 ,0.95)'
      }
    },
  },
  plugins: [],
}
export default config
