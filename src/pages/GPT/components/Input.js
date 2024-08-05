import { styled } from "@mui/material/styles";
import { Stack, Typography, Button, Box } from "@mui/material";

const Input = styled("textarea")({
  outline: "none",
  height: "150px",
  border: "1px solid #3e5056",
  backgroundColor: "#1c2427",
  borderRadius: "5px",
  color: "white",
  fontSize: "1rem",
  fontFamily: "sans-serif",
  padding: "0.5rem",
  resize: "none",
  width: "100%"
});

// export default Input;


const InputPopUp = ({feedbackValue, setFeedbackValue, submitFeedback}) => {
  return (
    <Stack
      sx={{ height: "100%", paddingBottom: "1rem", border: "none" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          value={feedbackValue}
          onChange={(e) => {
            setFeedbackValue(e.target.value);
          }}
          placeholder="Write your feedback..."
        />
      </Box>
      <Button
        onClick={() => {
          submitFeedback();
        }}
        sx={{
          width: 100,
          backgroundColor: "#1c2427",
          color: "#d6ff41",
          border: "1px solid #d6ff41",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#d6ff41",
            color: "black",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "inherit",
          }}
        >
          submit
        </Typography>
      </Button>
    </Stack>
  );
};


export default InputPopUp;