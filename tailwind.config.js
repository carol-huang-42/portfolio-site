/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#EC8B40",
        heading: "#1A1A1A",
        body: "#4A4A4A",
        "bg-site": "#FAFAFA",
      },
      keyframes: {
        taskStatusFlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(236, 139, 64, 0.38)" },
          "70%": { boxShadow: "0 0 0 14px rgba(236, 139, 64, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(236, 139, 64, 0)" },
        },
        approvalConfirm: {
          "0%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.2)", filter: "brightness(1)" },
          "45%": { boxShadow: "0 0 0 11px rgba(37, 99, 235, 0)", filter: "brightness(1.015)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)", filter: "brightness(1)" },
        },
      },
      animation: {
        "task-status-flow": "taskStatusFlow 0.9s ease-out 1",
        "approval-confirm": "approvalConfirm 1.1s ease-out 1",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
}

