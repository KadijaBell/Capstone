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
        shine: "shine 1.5s infinite", // Add the shine animation
      },
      keyframes: {
        shine: {
          "0%": {
            backgroundPosition: "-100% 0",
          },
          "50%": {
            backgroundPosition: "100% 0",
          },
          "100%": {
            backgroundPosition: "100% 0",
          },
        },
      },
    },
  },
  plugins: [],
};
