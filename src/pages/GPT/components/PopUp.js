import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const PopUp = ({ onClose, children, setLogs, setFeedbackValue, height, width }) => {
  
  console.log(height, width);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 999,
        // border: "1px solid red",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          // width: "30vw",
          width: width,
          // height: "35vh",
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999999999,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          onClick={() => {
            onClose(false);
            setLogs("");
            setFeedbackValue("");
          }}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 999999,
            cursor: "pointer",
            color: "themeColor",
          }}
        >
          <CancelIcon sx={{ fontSize: "30px" }} />
        </Box>
        <Box
          sx={{
            background: "#1f2937",
            padding: "0",
            // borderRadius: "8px",
            width: "100%",
            height: "100%",
            position: "relative",
            // overflow: "scroll",
          }}
          // onClick={(e) => e.stopPropagation()}
        >
          {children()}
        </Box>
      </Box>
    </Box>
  );
};

export default PopUp;
