import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      },
      colors: {
        primary: "#FF6F61",
        secondary: "#4A4E69",
        accent: "#F9F3E0",
      },
    },
  },
  plugins: [],
};
export default config;