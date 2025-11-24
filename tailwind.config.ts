import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#121212", // F365 Dark BG
                foreground: "#e0e0e0", // Light Grey Text
                primary: {
                    DEFAULT: "#e50000", // F365 Red
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1e1e1e", // Header/Card Dark Grey
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#e50000", // F365 Red
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#1e1e1e", // Card Dark Grey
                    foreground: "#e0e0e0",
                },
                muted: {
                    DEFAULT: "#a0a0a0", // Medium Grey
                    foreground: "#121212",
                }
            },
            fontFamily: {
                sans: ["var(--font-roboto)", "sans-serif"],
                heading: ["var(--font-roboto-condensed)", "sans-serif"],
                logo: ["var(--font-nanum)", "cursive"],
            },
        },
    },
    plugins: [],
};
export default config;
