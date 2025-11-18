import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecf8ff",
          100: "#d5ecff",
          200: "#addbff",
          300: "#7bc4ff",
          400: "#45a5ff",
          500: "#1e84ff",
          600: "#0966eb",
          700: "#054fc4",
          800: "#073f9a",
          900: "#0a357a"
        }
      }
    }
  },
  plugins: []
};

export default config;
