/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {},
  },
  daisyui: {
    utils: true,
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "#2DD4BF",
          secondary: '#ECFCCB',
        },
      },
    ],
  },
  plugins:[
    require("daisyui"),
    require("tailwindcss-bg-patterns"),
  ],
}