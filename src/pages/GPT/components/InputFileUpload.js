import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Box, Stack, Typography } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload = ({ setInputFile, title, setInputFileName }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInputFile(file);
      setInputFileName(file.name);

      // Reset the input value
      event.target.value = null;
    }
  };
  return (
    <Box
      component="label"
      variant="contained"
      sx={{
        // textTransform: "capitalize",
        // width: 80,
        border: "1px solid #3e5056",
        backgroundColor: "#3e5056",
        color: "white",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "#3e5056",
          color: "white",
        },
        cursor: "pointer",
        padding: "0.5rem",
      }}
    >
      {/* <AttachFileIcon fontSize="small" sx={{ color: "white" }} /> */}
      <Stack direction={"row"} alignItems={"center"}>
        <FileUploadIcon sx={{ fontSize: "24px" }} />
        <Typography sx={{ fontSize: "0.9rem" }}>{title}</Typography>
      </Stack>
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
        accept=".csv, .xls, .xlsx"
      />
    </Box>
  );
};

export default InputFileUpload;
