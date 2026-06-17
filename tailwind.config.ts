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
        aura: {
          black: "#111111",
          white: "#FFFFFF",
          gray: {
            light: "#F9F9F9",
            medium: "#E5E5E5",
            dark: "#717171",
          },
          accent: "#A6A6A6", // Màu nhấn nhẹ nhàng (Silver/Muted Gray)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
        luxury: ".2em",
      },
    },
  },
  plugins: [],
};

export default config;
