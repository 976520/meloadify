export const theme = {
  colors: {
    primary: "#1DB954",
    primaryHover: "#1ed760",
    black: "#121212",
    darkGrey: "#282828",
    lightGrey: "#B3B3B3",
    white: "#FFFFFF",
    error: "#F15E6C",
    background: {
      base: "#121212",
      highlight: "#1A1A1A",
      press: "#000000",
    },
    gray: {
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
  typography: {
    fontFamily: "CircularStd, -apple-system, BlinkMacSystemFont, sans-serif",
    weights: {
      book: 400,
      medium: 500,
      bold: 700,
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  transitions: {
    default: "200ms ease-in-out",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    pill: "500px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type Theme = typeof theme;
