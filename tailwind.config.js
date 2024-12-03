/** @type {import('tailwindcss').Config} */
//将hex转变为rgb，输出三个值按逗号分隔

module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './render/src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      // padding: '2rem',
      screens: {
        // '2xl': '1400px',
      },
    },
    extend: {
      ringColor: {
        DEFAULT: 'rgb(52, 199, 89)', // 默认环形颜色
      },
      colors: {
        'icon-bg-red': '#F06554',
        'icon-bg-green': '#43C470',
        grey: 'var(--grey-default)',
        green: 'var(--green-default)',
        red: 'var(--red-default)',
        blue: 'var(--blue-default)',
        yellow: 'var(--yellow-default)',
        'container-bg-3': 'var(--container-bg-2)',
        'icon-bg-1': '#FBC74E',
        'border-default': 'var(--border-default)',
        'container-bg': 'var(--container-bg)',
        'font-default': 'var(--text-color)',
        'select-menu-bg': 'var(--select-menu-bg)',
        'grey-1': `var(--menu-text-color-default)`,
        'container-bg-2': 'var(--menu-bg)',
        'grey-3': 'var(--menu-icon-bg)',
        primary: 'var(--menu-text-color-active)',
        black: '#000',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
