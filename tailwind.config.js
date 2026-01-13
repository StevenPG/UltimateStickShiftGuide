/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // RPM zone colors
        rpm: {
          green: '#22c55e',
          yellow: '#eab308',
          red: '#ef4444',
        },
        // Automotive accent colors
        accent: {
          orange: '#f97316',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'needle': 'needle 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
