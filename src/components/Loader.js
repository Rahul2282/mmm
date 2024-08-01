import React from "react";
import { Box } from "@mui/material";
import LoaderImage from "../assets/skewb-logomark.png";

const Loader = () => {
  return (
    <Box
      sx={{
        color: "red",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "99999",
        backgroundColor: "rgba(255, 255, 255, 0.1);"
      }}
    >
      <img
        src={LoaderImage}
        alt="Loading..."
        style={{
          animation: "rotate360 2s linear infinite",
          transformOrigin: "center",
        }}
      />
      <style>
        {`
          @keyframes rotate360 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default Loader;