import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalStyles = defineGlobalStyles({
  "*": {
    boxSizing: "border-box",
  },
  html: {
    height: "100%",
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "apple-system, sans-serif",
    height: "100%",
  },
  h1: {
    fontSize: "2rem",
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  button: {
    cursor: "pointer",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
    color: "black",
    padding: "1rem",
    borderRadius: "0.5rem",
    "&:hover": {
      boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  globalCss: globalStyles,
  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin3d: {
          "0%": { transform: "rotate3d(0,0,0,0deg)" },
          "100%": { transform: "rotate3d(1,1,1,360deg)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
