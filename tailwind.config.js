/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      slackfont: ["Montserrat", "sans-serif"],
    },

    extend: {
      colors: {
        "slack-Auberginie": "#4A154B",
        "slack-black": "#1D1C1D",
        "slack-blue": "#36C5F0",
        "slack-green": "#2EB67D",
        "slack-yellow": "#ECB22E",
        "slack-red": "#E01E5A",
      },
    },
  },
  plugins: [],
};
