import { CssBaseline, Stack } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import Axios from "./Axios";

import Home from "./pages/Home";
import Topbar from "../../Components/Topbar";

// import Navbar from "../../Components/Navbar";


let theme = createTheme({
  palette: {
    background: {
      default: "#1c2427",
    },
    themeColor: "#d6ff41",
    bgColor: "#1c2427",
    inputBorderColor: "#3E5056",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "white",
        },
      },
    },
  },

  typography: {
    htmlFontSize: 10,
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
    body1: {
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
});

theme = responsiveFontSizes(theme);

const App = () => {
  // const [isLoading, setIsLoading] = useState(false);

  // Axios
  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.data.error) {
        console.log(error.response.data.error);
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Topbar BrandName=""/>
      {/* <Navbar /> */}
      <div className="main-content">
        <div className="page-content">
          <Stack
            justifyContent={"space-between"}
            flexGrow={1}
            sx={{ height: "80vh", border: "1px solid #3e5056" }}
          >
            <>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Home />
              </ThemeProvider>
            </>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default App;