/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef3ff",
          100: "#dbe7ff",
          500: "#4f7cff",
          600: "#3f68f2",
          700: "#3254d6",
        },
      },
      boxShadow: {
        card: "0 12px 30px rgba(2, 6, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
