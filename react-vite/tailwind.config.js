/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: "475px", // Custom extra small devices
        sm: "640px", // Small screens (default Tailwind)
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1280px", // Extra large screens
        "2xl": "1536px", // 2x Extra large
      },
      colors: {
        ivory: "#F8F5F2", // main, accent or highlight
        midnight: "#2C3E50", // main, accent or highlight
        charcoal: "#4A4A4A", // main, accent or highlight
        gold: "#CBA135", // main, accent or highlight
        mint: "#9CCEB4", // main, accent or highlight
        blush: "#F5E9E2", // main, accent or highlight
        black: "#000000", // main, accent or highlight
      },
      animation: {
        shine: "shine 5s linear infinite", // Using only the new shine animation
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
        "bounce-soft": "bounceSoft 1s infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "text-flicker": "flicker 1.5s infinite",
        "slow-pulse": "slowBackground 60s linear infinite",
        "ultra-slow-pulse": "slowBackground 90s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "-100%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        slowBackground: {
          "0%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        elegant: "0 0 15px -3px rgba(203, 161, 53, 0.1)",
        hover: "0 10px 20px -5px rgba(44, 62, 80, 0.15)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "button-glow": "0px 4px 20px rgba(255, 255, 255, 0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "pattern-dots": "radial-gradient(circle, #CBA135 1px, transparent 1px)",
      },
      backgroundSize: {
        "dots-sm": "20px 20px",
      },
      spacing: {
        'inbox-width': '360px', // Ensure consistency across components
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};
