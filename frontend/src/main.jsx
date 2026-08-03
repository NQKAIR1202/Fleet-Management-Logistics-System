import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";

import {
  lightTheme,
  darkTheme,
} from "./theme/theme";

import ColorModeContext from "./context/ColorModeContext";
import { AuthProvider } from "./context/AuthContext";

function Main() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const colorMode = useMemo(
    () => ({
      mode,

      toggleColorMode: () => {
        setMode((prev) => {
          const next =
            prev === "light"
              ? "dark"
              : "light";

          localStorage.setItem(
            "theme",
            next
          );

          return next;
        });
      },
    }),
    [mode]
  );

  const theme =
    mode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>

        <CssBaseline />

        <AuthProvider>

            <App />

        </AuthProvider>

    </ThemeProvider>

</ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);