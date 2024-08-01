// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// mui components
import { CssBaseline, Typography } from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "black",
    },
    themeColor: "#d6ff41",
    bgColor: "#1c2427",
    borderColor: "#3E5056",
  },

  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    h1: {
      fontSize: 16,
    },

    h2: {
      fontSize: 15,
    },
    h3: {
      fontSize: 14,
    },
    h4: {
      fontSize: 13,
    },
    h5: {
      fontSize: 12,
    },
    h6: {
      fontSize: 11,
    },
    small: {
      fontSize: 10,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "26px", // Set default size for all icons
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Typography variant="h1" sx={{ color: "themeColor" }}>
                  MMM
                </Typography>
              }
            />
          </Routes>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
