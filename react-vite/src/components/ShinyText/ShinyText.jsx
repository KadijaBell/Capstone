const ShinyText = ({
  children,
  disabled = false,
  speed = 3.5,
  className = "",
}) => {
  return (
    <span className={`relative inline-block italic ${className}`}>
      {children}
      {!disabled && (
        <span
          className="absolute inset-0 pointer-events-none z-20 animate-shine"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "200% 100%",
            animationDuration: `${speed}s`,
            mixBlendMode: "screen",
          }}
        />
      )}
    </span>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
