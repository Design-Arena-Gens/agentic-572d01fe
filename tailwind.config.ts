import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#afd6ff",
          300: "#75b7ff",
          400: "#3c90ff",
          500: "#1c6dff",
          600: "#0b54db",
          700: "#0844ad",
          800: "#0c3887",
          900: "#112f6d"
        }
      }
    }
  },
  plugins: []
};

export default config;
