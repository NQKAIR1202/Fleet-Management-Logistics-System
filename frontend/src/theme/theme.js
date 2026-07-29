import { createTheme } from "@mui/material/styles";

const common = {
  shape: {
    borderRadius: 20,
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",

    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h5: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },

    h6: {
      fontWeight: 600,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all .2s ease",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...common,

  palette: {
    mode: "light",

    primary: {
      main: "#1565C0",
    },

    secondary: {
      main: "#00ACC1",
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: "#ED6C02",
    },

    error: {
      main: "#D32F2F",
    },

    background: {
      default: "#b1c7e9",
      paper: "#FFFFFF",
    },
  },
});

export const darkTheme = createTheme({
  ...common,

  palette: {
    mode: "dark",

    primary: {
      main: "#42A5F5",
    },

    secondary: {
      main: "#26C6DA",
    },

    success: {
      main: "#66BB6A",
    },

    warning: {
      main: "#FFA726",
    },

    error: {
      main: "#EF5350",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
  },
});