import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFD93D",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      },
      animation: {
        'slide-left': 'slide-left 50s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;