/**
 * Reusable Tailwind CSS Configuration
 *
 * This configuration defines the custom theme options for the Phyllon Tech website.
 * It can be imported into any HTML page that uses Tailwind CSS to ensure consistent
 * styling across the entire website.
 *
 * To use this configuration in other pages:
 * 1. Include the Tailwind CDN script in the HTML head
 * 2. Reference this file after the CDN script
 *
 * Example usage in HTML:
 * <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
 * <script src="tailwind-config.js"></script>
 */

// Initialize Tailwind configuration
tailwind.config = {
  darkMode: "class",  // Enables dark mode using the 'dark:' prefix when 'dark' class is present on an ancestor element
  theme: {
    extend: {
      colors: {
        "primary": "#2d85cd",         // Primary blue color for buttons, links, etc.
        "accent": "#e61c1a",         // Accent red color for highlights and emphasis
        "background-light": "#f6f7f8", // Light background color for light mode
        "background-dark": "#121a20",  // Dark background color for dark mode
        secondary: '#e61c1a',         // Secondary red color (duplicate of accent)
        dark: '#0f172a'              // Dark text/background color
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],  // Font family for headings and prominent text
        "body": ["Noto Sans", "sans-serif"]  // Font family for body text
      },
      borderRadius: {
        "DEFAULT": "0.25rem",  // Default border radius (4px)
        "lg": "0.5rem",       // Large border radius (8px)
        "xl": "0.75rem",      // Extra large border radius (12px)
        "full": "9999px"      // Full border radius (circular)
      },
    },
  },
};

// Optional: Log initialization for debugging purposes
console.log("Tailwind configuration loaded:", tailwind.config);