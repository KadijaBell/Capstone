module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include JSX and TSX files
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#2c3e50",
        ivory: "#f9f7f7",
        charcoal: "#36454f",
        gold: "#ffd700",
        mint: "#98ff98",
        blush: "#f5c2c7",
        black: "#000000",
      },
      animation: {
        shine: "shine 5s linear infinite", // Using only the new shine animation
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "-100%" },
        },
      },
    },
  },
  plugins: [],


};
