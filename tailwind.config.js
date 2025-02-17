/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: "#F0FFF4",  // Fondo verde muy claro
            foreground: "#0A3729",  // Texto oscuro para contraste
            primary: {
              50: "#E6FCEB",
              100: "#CFF9D8",
              200: "#A8F0B7",
              300: "#81E896",
              400: "#5BDF74",
              500: "#34D653", // Verde principal vibrante
              600: "#29B443",
              700: "#1E9233",
              800: "#136122",
              900: "#0A3729",
              DEFAULT: "#34D653",
              foreground: "#ffffff", // Texto blanco en botones primarios
            },
            focus: "#81E896", // Color para efectos de foco/resaltado
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
        dark: {
          colors: {
            background: "#0A1F16",  // Verde oscuro casi negro
            foreground: "#E6FCEB",  // Verde claro para el texto
            primary: {
              50: "#0D3325",
              100: "#13452F",
              200: "#19603E",
              300: "#1F7A4D",
              400: "#25945C",
              500: "#2BAE6B", // Verde principal vibrante
              600: "#34D67E",
              700: "#5BE099",
              800: "#81E8B3",
              900: "#A8F0CD",
              DEFAULT: "#34D67E",
              foreground: "#0A1F16", // Texto oscuro en botones primarios
            },
            focus: "#5BE099", // Color para efectos de foco/resaltado
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
};
