

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Configure the content for all of your components
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B', // Soft Red
          light: '#FF8E8E',
          dark: '#E05555',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // Soft Teal
          light: '#72DFD8',
          dark: '#3AB7AF',
        },
        accent: {
          DEFAULT: '#FFE66D', // Soft Yellow
          light: '#FFF09E',
          dark: '#E6CF50',
        },
        background: '#F7F9FC', // Light Blue-Grey
        surface: '#FFFFFF',
        text: {
          DEFAULT: '#2D3436', // Dark Grey
          light: '#636E72',
        },
        success: '#55EFC4',
        warning: '#FD79A8',
        info: '#74B9FF',
      },
      fontFamily: {
        // We will stick to system fonts for now, or add Google Fonts later if requested
        sans: ['System'],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '28px',
        '3xl': '36px',
      }
    },
  },
  plugins: [],
}
