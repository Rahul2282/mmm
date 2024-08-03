// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// mui components
import { CssBaseline, Typography } from "@mui/material";

// pages

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import PortfolioLandscape from "./pages/PortfolioLandscape";

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
    themeColor: "#d6ff41", //yellow sa
    bgColor: "#1c2427",  // black sa
    borderColor: "#3E5056",// thoda alg sa 
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
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/portfolio" element={<PortfolioLandscape />} />
          </Routes>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
      
    </>
  );
};

export default App;
