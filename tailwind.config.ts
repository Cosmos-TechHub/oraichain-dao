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
        'primary-grey': 'rgba( 36,38,40 ,0.5)',
        'primary-grey-bg': 'rgba( 36,38,40 ,0.15)',
        'secondary-grey-bg': 'rgba( 36,38,40 ,0.05)',
        'secondary-grey': 'rgba( 36,38,40 ,0.95)',
        'third-grey': 'rgba( 36,38,40 ,0.7)',
        'primary-purple': 'rgba( 123,97,255 ,0.95)',
        'primary-purple-bg': 'rgba( 123,97,255 ,0.25)'
      }
    },
  },
  plugins: [],
}
export default config
