import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Dark theme
    primary: {
      main: "#1976d2", // Blue primary color
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Slightly lighter background for paper components
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b3b3b3", // Light gray text
    },
  },
});

export default theme;
