/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
export default {
  mode: "jit",
  darkMode: "class",
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
      boxShadow: {
        "xl-dark":
          "0 10px 15px -3px rgba(255, 255, 255, 0.2), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
      },
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
        "dark-mode": "#030712",
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
      typography: {
        DEFAULT: {
          css: {
            color: "#333", // Default text color for light mode
            h1: {
              color: "#111",
            },
            h2: {
              color: "#222",
            },
            h3: {
              color: "#333",
            },
          },
        },
        dark: {
          css: {
            color: "rgba(255, 255, 255, 0.7)",
            h1: {
              color: "rgba(255, 255, 255, 0.9)",
            },
            h2: {
              color: "rgba(255, 255, 255, 0.8)",
            },
            h3: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            li: {
              color: "rgba(255, 255, 255, 0.7)",
            },
            strong: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
      },
    },
  },
  variants: {
    boxShadow: ["dark"], // Enable `dark` variant for box shadow
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
