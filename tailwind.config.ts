import type { Config } from "tailwindcss";
import tailwindCSSAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "tentacle-fade-in": "fade-in 100s ease-in",
        "pull-right": "pull-right 50s ease-in 50s",
        "pull-right-small": "pull-right 50s ease-in 50s",
        "follow-button-fade-out": "follow-button-fade-out 50s ease-in 50s",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.1" },
          "100%": { opacity: "1" },
        },
        "pull-right": {
          "0": { left: "0" },
          "100%": { left: "50px" },
        },
        "pull-right-small": {
          "0": { left: "0" },
          "100%": { left: "10px" },
        },
        "follow-button-fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [tailwindCSSAnimate],
} satisfies Config;
