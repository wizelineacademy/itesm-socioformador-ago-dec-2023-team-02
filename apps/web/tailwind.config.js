/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    // single component styles
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // or you can use a glob pattern (multiple component styles)
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-inter)"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "primary-500": "#14167E",
        "secondary-500": "#FFB620",
        blue: "#004992",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(16, 16, 18, 0.6)",
        "dark-1": "#000000",
        "dark-2": "#121417",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        dark100: "#d2d2d3",
        dark200: "#a5a5a7",
        dark300: "#79797a",
        dark400: "#4c4c4e",
        dark500: "#1f1f22",
        dark600: "#19191b",
        dark700: "#131314",
        dark800: "#0c0c0e",
        dark900: "#060607",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "gray-1": "#697C89",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        "wizeline-brand": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#751F22",
              100: "#AF2E33",
              200: "#E93D44",
              300: "#EF5F6A",
              400: "#F3818B",
              500: "#F6A3AC",
              600: "#F8C5CD",
              700: "#FBE8EE",
              800: "#FDF2F4",
              900: "#FEFBFC",
              DEFAULT: "#E93D44",
              foreground: "#ffffff",
            },
            focus: "#F3818B",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
  /*
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "heading1-bold": [
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading1-semibold": [
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "heading2-bold": [
        "30px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading2-semibold": [
        "30px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "heading3-bold": [
        "24px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading4-medium": [
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body-semibold": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "body-medium": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "body-normal": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "body1-bold": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "base-regular": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "base-medium": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "base-semibold": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "base1-semibold": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "small-regular": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "small-medium": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "small-semibold": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      "subtle-medium": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "500",
        },
      ],
      "subtle-semibold": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "600",
        },
      ],
      "tiny-medium": [
        "10px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "x-small-semibold": [
        "7px",
        {
          lineHeight: "9.318px",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        "primary-500": "#14167E",
        "secondary-500": "#FFB620",
        blue: "#004992",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(16, 16, 18, 0.6)",
        "dark-1": "#000000",
        "dark-2": "#121417",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "gray-1": "#697C89",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  */
};
