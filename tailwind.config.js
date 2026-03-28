/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "var(--color-primary, #C9A96E)",
          light: "#D4BC8A",
          dark: "#A8834A",
        },
        dark: {
          DEFAULT: "#0D0D0D",
          100: "#1A1A1A",
          200: "#242424",
          300: "#2E2E2E",
        },
        cream: {
          DEFAULT: "#F5F5F0",
          dark: "#E8E8E0",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-left": "slideLeft 0.5s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideLeft: {
          from: { opacity: 0, transform: "translateX(30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: 0, transform: "translateX(-30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
