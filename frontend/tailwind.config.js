/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-8': 'rgba(0, 0, 0, 0.08)', // Siyah %8 opaklık
      },
      blur: {
        '12': '12px', // Özel 12px blur ekledik
      },
      boxShadow: {
        'custom': '0px 4px 10px rgba(0, 0, 0, 0.1)', // x: 0, y: 4
      },
      fontFamily: { jakarta: ['Plus Jakarta Sans', 'sans-serif'] },
      animation: {
        pulseCustom: "pulseCustom 2s infinite",
      },
      keyframes: {
        pulseCustom: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      keyframes: {
      },
  
    },
  },
  plugins: [],
}
}
