/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        card: '#2d2d2d',
        'card-foreground': '#ffffff',
        border: '#444444',
        input: '#1a1a1a',
        primary: {
          DEFAULT: '#4285f4',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#3d3d3d',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#888888',
          foreground: '#aaaaaa',
        },
        destructive: {
          DEFAULT: '#dc3545',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
