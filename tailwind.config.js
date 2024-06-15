/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      slackfont: ["Montserrat", "sans-serif"],
    },

    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "slack-Auberginie": "#4A154B",
        "slack-Auberginie-darker": "#410f42",
        "slack-black": "#1D1C1D",
        "slack-blue": "#36C5F0",
        "slack-blue-dark": "#2cb5de",
        "slack-green": "#2EB67D",
        "slack-yellow": "#ECB22E",
        "slack-red": "#E01E5A",
      },
    },
  },
  plugins: [],
};
