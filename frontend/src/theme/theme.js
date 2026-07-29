import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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

            boxShadow:
                "0 8px 24px rgba(15,23,42,.08)",

            transition:
                "all .2s ease",

            "&:hover": {

                transform:
                    "translateY(-2px)",

                boxShadow:
                    "0 12px 32px rgba(15,23,42,.12)",

            },
        },
    },
},

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E5E7EB",
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
});

export default theme;