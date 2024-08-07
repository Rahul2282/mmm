// router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// mui components
import { CssBaseline, Typography } from "@mui/material";

// pagesgit 

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import PortfolioLandscape from "./pages/PortfolioLandscape";
import GPT from "./pages/GPT/App"
import DetailsPopUp from "./Components/DetailsPopUp"
import AppState from "./context/appState";

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
  const [analyticsTool, setAnalyticsTool] = useState('CSS');
  const analyticsToolOptions = [
    { key: 'html', value: 'HTML' },
    { key: 'css', value: 'CSS' },
    { key: 'js', value: 'JavaScript' },
    { key: 'bootstrap', value: 'Bootstrap' },
    { key: 'python', value: 'Python' },
    { key: 'java', value: 'Java' },
    { key: 'node', value: 'Node.js' },
    { key: 'angular', value: 'Angular' },
  ];
  const props = {
    Details: {
      img: 'path/to/image', // replace with the actual image path
      name: 'User Name', // replace with actual user name
      id: "tea-lipton"// replace with actual id
    },
    tag1: 'Tag 1',
    tag_val1: 'Value 1',
    tag_unit1: 'Unit 1',
    tag2: 'Tag 2',
    tag_val2: 'Value 2',
    tag_unit2: 'Unit 2',
    AllBrands: ['Brand 1', 'Brand 2'], // replace with actual brands data
    divWidth: 300,
    setGetBrand: () => {},
    setDetailsId: () => {},
    setDetails: () => {},
    getKPI: 'Some KPI',
    matchKPI: 'Matched KPI',
    allKPI: ['KPI 1', 'KPI 2'], // replace with actual KPIs data
    setGetKPI: () => {},
    AnalyticsToolAll: ['Tool 1', 'Tool 2'], // replace with actual tools data
    setShowPopup: () => {},
  };
  return (
    <>
     {/* <CustomSelect
        value={analyticsTool}
        onChange={(e) => setAnalyticsTool(e.target.value)}
        options={analyticsToolOptions}
      /> */}
     <AppState>
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
            <Route path="/gpt" element={<GPT />} />

            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/portfolio" element={<PortfolioLandscape />} />
            <Route path='/detailPopUp' element={ <DetailsPopUp />}/>
          </Routes>
          <ToastContainer theme="colored"/>
        </ThemeProvider>
      </BrowserRouter>
      </AppState>
      
    </>
  );
};

export default App;
