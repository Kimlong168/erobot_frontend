/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
export default {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: "true",
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1350px",
      "1xl": "1550px",
      "2xl": "1736px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        "bakong-red": "#E1232E",
        primary: "#0330a3", //blue
        secondary: "#de0025", //red
        tertiary: "#fbb80f", //yellow
        dark: "#333333", //black
        success: "#27AE60",
        warning: "#E2B93B",
        error: "#EB5757",
        info: "#2F80ED",
        "gray-1": "#333333", //gray1
        "gray-2": "#4F4F4F", //gray2
        "gray-3": "#828282", //gray3
        "gray-4": "#BDBDBD", //gray4
        "gray-5": "#E0E0E0", //gray5
      },
      backgroundImage: {
        donate: "url('/images/heroImage.jpg')",
        boy: "url('/images/boy.jpg')",
      },
      fontFamily: {
        bakong: "Nunito Sans",
        primary: "Shrikhand",
        secondary: "Open Sans",
      },
    },
  },
  plugins: [
    typography,
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-stroke": {
          "-webkit-text-stroke": "2px black",
          color: "transparent",
        },
        ".text-stroke-sm": {
          "-webkit-text-stroke": "1px black",
          color: "transparent",
        },
        ".text-stroke-lg": {
          "-webkit-text-stroke": "3px black",
          color: "transparent",
        },
      });
    }),
  ],
};

// export default config;
