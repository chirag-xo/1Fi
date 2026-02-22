/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
                display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
            },
            colors: {
                background: "#F4F7FE",
                surface: "#FFFFFF",
                "surface-2": "#F8FAFF",
                border: "#E2E8F0",
                accent: "#155EEF",
                "accent-2": "#2E90FA",
                muted: "#94A3B8",
                "text-primary": "#050A30",
                "text-secondary": "#64748B",
            },
            backgroundImage: {
                "gradient-accent": "linear-gradient(135deg, #4f8ef7 0%, #7c3aed 100%)",
                "gradient-card": "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out",
                "fade-in": "fadeIn 0.4s ease-out",
                shimmer: "shimmer 2s infinite",
                float: "float 3s ease-in-out infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            backdropBlur: {
                xs: "4px",
            },
        },
    },
    plugins: [],
};
