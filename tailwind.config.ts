import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base-red": "#ed3237",
        "darker-red": "#C92A30",
        "jayma-dark": "#4f1113",
        "jayma-tan": "#ECE4B7",
        "dark-text": "#4b4b4d",
        "mulch-green": "#2c612c",
        "mulch-accent": "#fcbf57",
      },
    },
  },
  plugins: [],
};
export default config;
