/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffebff",
        playground: "#052255",
        black: "#333333"
      },
    },
  },
  plugins: [],
};
