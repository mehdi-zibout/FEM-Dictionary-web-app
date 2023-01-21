/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    colors: {
      purple: "#A445ED",
      red: "#FF5252",
      white: "#FFF",
      "white-100": "#F4F4F4",
      "white-200": "#E9E9E9",
      "white-300": "#757575",
      black: "#050505",
      "black-100": "#1F1F1F",
      "black-200": "#2D2D2D",
      "black-300": "#3A3A3A",
    },
    fontSize: {
      hl: ["4rem", { lineHeight: "77px", fontWeight: 700 }],
      hm: ["1.5rem", { lineHeight: "29px" }],
      hs: ["1.25rem", { lineHeight: "24px" }],
      bodym: ["1.125rem", { lineHeight: "24px" }],
      bodys: ["0.875rem", { lineHeight: "17px" }],
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Lora", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
