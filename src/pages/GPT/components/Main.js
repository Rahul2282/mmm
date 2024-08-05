import { Stack } from "@mui/material";

import Form from "./Form";
import Response from "./Response";

const Main = ({
  setInputFile,
  setInputMappingFile,
  query,
  setQuery,
  fetchData,
  outputs,
  setInputFileName,
  inputFileName,
  setInputMappingFileName,
  inputMappingFileName,
  fileUpload,
  setOutputs,
  setIsPopUpOpen,
  setFeedbackPayload,
  setPopupId,
  setLogs,
  setQueryAsked,
  credits
}) => {
  return (
    <Stack sx={{ border: "none", height: "100%" }}>
      <Response
        outputs={outputs}
        setIsPopUpOpen={setIsPopUpOpen}
        setFeedbackPayload={setFeedbackPayload}
        setPopupId={setPopupId}
        setLogs={setLogs}
      />
      <Form
        setInputFile={setInputFile}
        setInputMappingFile={setInputMappingFile}
        query={query}
        setQuery={setQuery}
        fetchData={fetchData}
        setInputFileName={setInputFileName}
        inputFileName={inputFileName}
        setInputMappingFileName={setInputMappingFileName}
        inputMappingFileName={inputMappingFileName}
        fileUpload={fileUpload}
        setOutputs={setOutputs}
        setQueryAsked={setQueryAsked}
        credits={credits}
      />
    </Stack>
  );
};

export default Main;
