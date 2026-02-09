/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(400px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        progress: "progress 3s linear forwards",
      },
    },
  },
  plugins: [],
};
