import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // базовые токены (из :root)
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },

        // для классов border-border / ring-ring
        border: "var(--border)",
        ring: "var(--ring)",

        // кастомные цвета, используемые в variants кнопок и прочем
        orange: "var(--orange)",
        "dark-orange": "var(--dark-orange)",
        violet: "var(--violet)",
        "soft-violet": "var(--soft-violet)",
        "dark-violet": "var(--dark-violet)",
        purple: "var(--purple)",

        "button-blue": "var(--button-blue)",
        "button-yellow": "var(--button-yellow)",
        "button-green": "var(--button-green)",
        "button-cyan": "var(--button-cyan)",
        "button-red": "var(--button-red)",

        "dialog-border": "var(--dialog-border)",
        dialog: "var(--dialog)",
        description: "var(--description-color)",
        "points-green": "var(--points-green)",
        "ref-gray": "var(--ref-gray)",

        alarm: "var(--alarm)",
        "red-opacity": "var(--red-opacity)",
        whiteopacity: "var(--whiteopacity)",
      },
      ringColor: {
        DEFAULT: "var(--ring)",
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        archivo: ["var(--font-archivo)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jura: ["var(--font-jura)", "sans-serif"],
        anybody: ["var(--font-anybody)", "sans-serif"],
      },
    },
  },
};

export default config;
