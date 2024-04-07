/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "author-bold": ["Author-Bold", "sans"],
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"]
      },
      colors: {
        ghostwhite: "#F8F8FF",
        light: {
          50: "#ffffff",
          60: "#f2f2f2",
          70: "#d6d6d6",
        },
        dark: {
          primary: "#191a1b",
          secondary: "#232425"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/line-clamp')]
};
