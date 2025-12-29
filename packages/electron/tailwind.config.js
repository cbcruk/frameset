/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // Arc-style dark theme
        background: '#161616',
        foreground: '#ffffff',
        card: '#1c1c1e',
        'card-foreground': '#ffffff',
        border: '#2d2d2d',
        input: '#232325',
        primary: {
          DEFAULT: '#8b5cf6', // Purple accent
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#2d2d2f',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#6b6b6b',
          foreground: '#9a9a9a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        // Additional Arc-style colors
        surface: '#232325',
        'surface-hover': '#2d2d2f',
        accent: '#8b5cf6',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
}
