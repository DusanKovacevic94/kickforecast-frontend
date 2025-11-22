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
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#10B981", // Emerald 500
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#0F172A", // Slate 900
                    foreground: "#F8FAFC", // Slate 50
                },
                accent: {
                    DEFAULT: "#F59E0B", // Amber 500
                    foreground: "#FFFFFF",
                },
                card: {
                    DEFAULT: "#1E293B", // Slate 800
                    foreground: "#F8FAFC",
                },
            },
        },
    },
    plugins: [],
};
export default config;
