import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import InputFileUpload from "./InputFileUpload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InputText from "./InputText";

import AttachFileIcon from "@mui/icons-material/AttachFile";

import CancelIcon from "@mui/icons-material/Cancel";

const Form = ({
  setInputFile,
  setInputMappingFile,
  query,
  setQuery,
  fetchData,
  setInputFileName,
  inputFileName,
  setInputMappingFileName,
  inputMappingFileName,
  fileUpload,
  setOutputs,
  setQueryAsked,
  credits,
}) => {
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);

  const isDisabled = () => {
    if (inputFileName === "" || inputMappingFileName === "") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Stack
      sx={{
        border: "none",
        position: "relative",
        height: "15%",
        // height: 200,
        padding: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          border: "1px solid #3e5056",
          borderRadius: "1rem",
          height: "100%",
          padding: "0 1rem",
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* <AttachFileIcon
          fontSize="small"
          onClick={() => setIsOpenFileUpload(true)}
          sx={{ color: "white", cursor: "pointer" }}
        /> */}
        <InputText
          disabled={credits?.is_question_input_disabled}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Message Skewb-GPT"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault(); // Prevent default behavior (submitting form)
              setQuery(query + "\n"); // Change the line in the text input
            } else if (e.key === "Enter") {
              fetchData(); // Hit the API when Enter is pressed without Shift
              setQuery("");
            }
          }}
        />
        <ArrowUpwardIcon
          onClick={() => {
            fetchData();
            setQuery("");
          }}
          sx={{
            cursor: "pointer",
            color: query ? "white" : "gray",
            pointerEvents: query ? "all" : "none",
          }}
        />
      </Stack>
      {isOpenFileUpload && (
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            position: "absolute",
            zIndex: 999,
            top: -160,
            left: 40,
            border: "1px solid black",
            backgroundColor: "black",
            borderRadius: "5px",
          }}
        >
          <Stack gap={2} sx={{ padding: "1rem" }}>
            <Stack direction={"row"} gap={2}>
              <Stack direction={"row"} gap={1}>
                <Stack gap={1}>
                  <Stack direction={"row"} gap={2}>
                    <InputFileUpload
                      setInputFile={setInputFile}
                      setInputFileName={setInputFileName}
                      title={"Main File"}
                    />
                    {inputFileName && (
                      <Stack
                        gap={2}
                        direction={"row"}
                        sx={{
                          padding: "0.4rem 2rem 0.4rem 0.4rem",
                          border: "1px solid #3e5056",
                          borderRadius: "5px",
                          position: "relative",
                        }}
                      >
                        <Typography variant="h6">{inputFileName}</Typography>
                        <CancelIcon
                          onClick={() => {
                            setInputFile("");
                            setInputFileName("");
                          }}
                          sx={{
                            color: "white",
                            cursor: "pointer",
                            fontSize: "16px",
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        />
                      </Stack>
                    )}
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    <InputFileUpload
                      setInputFile={setInputMappingFile}
                      setInputFileName={setInputMappingFileName}
                      title={"Mapping File"}
                    />
                    {inputMappingFileName && (
                      <Stack
                        gap={2}
                        direction={"row"}
                        sx={{
                          padding: "0.4rem 2rem 0.4rem 0.4rem",
                          border: "1px solid #3e5056",
                          borderRadius: "5px",
                          position: "relative",
                        }}
                      >
                        <Typography variant="h6">
                          {inputMappingFileName}
                        </Typography>
                        <CancelIcon
                          onClick={() => {
                            setInputMappingFileName("");
                            setInputMappingFile("");
                          }}
                          sx={{
                            color: "white",
                            cursor: "pointer",
                            fontSize: "16px",
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        />
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Button
              disabled={isDisabled()}
              onClick={() => {
                setIsOpenFileUpload(false);
                setInputMappingFileName("");
                setInputMappingFile("");
                setInputFile("");
                setInputFileName("");
                fileUpload();
                setOutputs([]);
                setQuery("");
              }}
              sx={{
                backgroundColor: "black",
                border: isDisabled() ? "1px solid black" : "1px solid white",
                width: 80,
                color: "white",
                textTransform: "capitalize",
                marginRight: 0,
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <Typography>upload</Typography>
            </Button>
          </Stack>
          <CancelIcon
            onClick={() => {
              setIsOpenFileUpload(false);
              setInputMappingFileName("");
              setInputMappingFile("");
              setInputFile("");
              setInputFileName("");
            }}
            fontSize="small"
            sx={{ color: "white", cursor: "pointer" }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Form;
