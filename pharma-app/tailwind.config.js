/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // The deep navy blue used in your sidebar
        brand: {
          dark: '#27374D',   // Sidebar background
          light: '#526D82',  // Secondary sidebar elements
          accent: '#1D4ED8', // The bright blue for links (e.g., ORD-2841)
        },
        // The background of the main dashboard area
        app: '#F8FAFC', // Standard Tailwind slate-50
        
        // Status Colors mapped exactly from your screenshots
        status: {
          success: {
            bg: '#D1FAE5',   // Light green background for badges
            text: '#059669', // Dark green text ("Delivered", "+12% vs last week")
            solid: '#10B981', // Solid green chart bars
          },
          warning: {
            bg: '#FEF3C7',   // Light amber for alerts
            text: '#D97706', // Amber text ("Pending dispatch")
            border: '#FCD34D'
          },
          danger: {
            bg: '#FEE2E2',
            text: '#DC2626', // Red for notifications (the '12' and '4' in sidebar)
          },
          info: {
            bg: '#DBEAFE',
            text: '#2563EB', // Blue for "Dispatched" badges
          }
        }
      }
    },
  },
  plugins: [],
}
