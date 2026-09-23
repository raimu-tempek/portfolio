/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0066FF",
        frame: "#FFEE00",
        borderSubtle: "#E8E8E8",
        textPrimary: "#000000",
        textSecondary: "#A8A8A8",
        surfaceSubtle: "#F7F7F8",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      maxWidth: {
        container: "1080px",
      },
      boxShadow: {
        button: "0 8px 20px -4px rgba(0, 102, 255, 0.3)",
        card: "0 4px 20px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
