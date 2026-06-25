/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ added

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        bg1: "#0a0a1a",
        bg2: "#141432",
        bg3: "#1e1e5a",
        brand: "#6366f1",
        brand2: "#8b5cf6",
      },

      backgroundImage: {
        'app-gradient':
          'linear-gradient(160deg, #0a0a1a 0%, #141432 50%, #1e1e5a 100%)',

        'brand-gradient':
          'linear-gradient(135deg, #6366f1, #8b5cf6)',
      },
    },
  },

  plugins: [],
};