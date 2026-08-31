import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pos: {
          primary: {
            light: "#d1d5db",
            DEFAULT: "#6b7280",
            dark: "#374151",
          },
          close: {
            DEFAULT: "#85100a",
            light: "#b3150c",
            lighter: "#fc1c0f"
          }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
