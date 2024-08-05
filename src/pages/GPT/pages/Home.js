import { useState, useEffect } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import Axios from "../Axios";

import { Stack, Grid, Box, Typography } from "@mui/material";

import Loader from "../components/Loader";
import PopUp from "../components/PopUp";
// import Input from "../components/Input";


import InputPopUp from "../components/Input";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputFile, setInputFile] = useState("");
  const [inputFileName, setInputFileName] = useState("");
  // console.log("inputFile: ", inputFile);

  const [inputMappingFile, setInputMappingFile] = useState("");
  const [inputMappingFileName, setInputMappingFileName] = useState("");
  // console.log("inputMappingFile: ", inputMappingFile);
  const [query, setQuery] = useState("");
  // console.log("query: ", query);

  const [filesData, setFilesData] = useState(null);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);


  // console.log("router id: ", id);

  const [tabs, setTabs] = useState([]);
  // console.log("tab: ", tabs);

  const [tabId, setTabId] = useState("");
  // console.log("tabId: ", tabId);

  const [activeTab, setActiveTab] = useState("");

  const [output, setOutput] = useState("");


  // console.log("activeTab: ", activeTab);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get("tabnames/");
        const data = await response.data; // Use await to get the data
        // console.log("data tab: ", data.data[0].tab_id);
        setTabs(data.data);
        setActiveTab(data.data[0].tab_id);
        setTabId(data.data[0].tab_id);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [credits, setCredits] = useState("");
  console.log("credits: ", credits);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("credits/");
        const data = await response.data; // Use await to get the data
        // console.log("data tab: ", data.data[0].tab_id);
        setCredits(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [output]);

  const [chat, setChat] = useState([]);
  // console.log("chat: ", chat);

  const [queryAsked, setQueryAsked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (tabId !== "") {
        setIsLoading(true);
        try {
          const response = await Axios.post("tab/", { tab_id: tabId });
          const data = await response.data; // Use await to get the data
          // console.log("data: ", data);
          setChat(data.data.chats);
          setIsLoading(false);
          setQueryAsked(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [tabId, queryAsked, activeTab]);

  const [outputs, setOutputs] = useState([]);
  // console.log("outputs: ", outputs);
  // const [output, setOutput] = useState("");

  const [feedbackPayload, setFeedbackPayload] = useState({
    user_query: "",
    user_expectations: "",
    thumbs_up: "",
    session_id: "",
  });

  // console.log("feedbackPayload: ", feedbackPayload);

  const [feedbackValue, setFeedbackValue] = useState("");
  console.log("feedbackValue: ", feedbackValue);

  useEffect(() => {
    if (output) {
      setOutputs((prev) => [...prev, output]);
    }
  }, [output]);

  const fetchData = async () => {
    const formData = new FormData();

    if (query) {
      formData.append("question", query);
      formData.append("tab_id", tabId);
      formData.append(
        "session_id",
        JSON.parse(localStorage.getItem("session_id"))
      );

      try {
        setIsLoading(true);
        const response = await Axios.post("gpt/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await response.data;
        setOutput(data.data);
        setIsLoading(false);
        setQueryAsked(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  const fileUpload = async () => {
    const formData = new FormData();

    if (inputFile && inputMappingFile) {
      formData.append("files", inputFile);
      formData.append("mapping_file", inputMappingFile);

      try {
        setIsLoading(true);
        const response = await Axios.post("fileupload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await response.data;
        setFilesData(data.data);
        localStorage.setItem(
          "session_id",
          JSON.stringify(data.data.session_id)
        );
        setFeedbackPayload((prevPayload) => ({
          ...prevPayload,
          session_id: data.data.session_id,
        }));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setFeedbackPayload((prevPayload) => ({
      ...prevPayload,
      user_expectations: feedbackValue,
      session_id: filesData?.session_id,
    }));
  }, [feedbackValue, filesData]);

  const submitFeedback = async () => {
    if (JSON.stringify(feedbackPayload) !== "{}" && feedbackValue) {
      try {
        setIsLoading(true);
        const response = await Axios.post("feedback/", {
          user_query: feedbackPayload.user_query,
          user_expectation: feedbackValue,
          thumbs_up: feedbackPayload.thumbs_up,
          session_id: filesData?.session_id,
          tab_id: tabId,
          timestamp: feedbackPayload.timestamp,
        });
        const data = await response.data;
        console.log("data: ", data);
        setIsLoading(false);
        setIsPopUpOpen(false);
        setFeedbackValue("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  const [popupId, setPopupId] = useState(null);

  // console.log("popupId: ", popupId);

  // const InputPopUp = () => {
  //   return (
  //     <Stack
  //       sx={{ height: "100%", paddingBottom: "1rem", border: "none" }}
  //       justifyContent={"center"}
  //       alignItems={"center"}
  //     >
  //       <Box
  //         sx={{
  //           height: "100%",
  //           display: "flex",
  //           width: "80%",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Input
  //           value={feedbackValue}
  //           onChange={(e) => {
  //             setFeedbackValue(e.target.value);
  //           }}
  //           placeholder="Write your feedback..."
  //         />
  //       </Box>
  //       <Button
  //         onClick={() => {
  //           submitFeedback();
  //         }}
  //         sx={{
  //           width: 100,
  //           backgroundColor: "#1c2427",
  //           color: "#d6ff41",
  //           border: "1px solid #d6ff41",
  //           borderRadius: "5px",
  //           "&:hover": {
  //             backgroundColor: "#d6ff41",
  //             color: "black",
  //           },
  //         }}
  //       >
  //         <Typography
  //           variant="h6"
  //           sx={{
  //             color: "inherit",
  //           }}
  //         >
  //           submit
  //         </Typography>
  //       </Button>
  //     </Stack>
  //   );
  // };

  const [logs, setLogs] = useState("");

  const Steps = () => {
    return (
      <Stack
        sx={{
          height: "100%",
          overflowY: "scroll",
          padding: "2rem 1rem 1rem 1rem",
          "&::-webkit-scrollbar": {
            width: "10px",
          },

          "&::-webkit-scrollbar-track": {
            background: "#1C2427",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "orange" }}
          dangerouslySetInnerHTML={{
            __html: logs,
          }}
        ></Typography>
      </Stack>
    );
  };

  const retunrChildren = () => {
    if (popupId === 1) {
      return (
        <InputPopUp
          feedbackValue={feedbackValue}
          submitFeedback={submitFeedback}
          setFeedbackValue={setFeedbackValue}
        />
      );
    } else if (popupId === 2) {
      return <Steps />;
    } else {
      return null;
    }
  };

  return (
    <Box height={"100%"}>
      {isLoading ? <Loader /> : null}
      <Stack direction={"row"} sx={{ border: "none", height: "100%" }}>
        <Grid container height={"100%"}>
          <Grid item xs={3} height={"100%"}>
            <Aside
              tabs={tabs}
              setTabId={setTabId}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              credits={credits}
            />
          </Grid>
          <Grid item xs={9} height={"100%"}>
            <Main
              setInputFile={setInputFile}
              setInputMappingFile={setInputMappingFile}
              query={query}
              setQuery={setQuery}
              fetchData={fetchData}
              outputs={chat}
              setInputFileName={setInputFileName}
              inputFileName={inputFileName}
              setInputMappingFileName={setInputMappingFileName}
              inputMappingFileName={inputMappingFileName}
              fileUpload={fileUpload}
              setOutputs={setOutputs}
              setIsPopUpOpen={setIsPopUpOpen}
              setFeedbackPayload={setFeedbackPayload}
              setPopupId={setPopupId}
              setLogs={setLogs}
              setQueryAsked={setQueryAsked}
              credits={credits}
            />
          </Grid>
        </Grid>
      </Stack>

      {isPopUpOpen ? (
        <PopUp
          height={popupId === 1 ? "35vh": "40vh"}
          width={popupId === 1 ? "30vw": null}
          onClose={setIsPopUpOpen}
          children={retunrChildren}
          setLogs={setLogs}
          setFeedbackValue={setFeedbackValue}
        />
      ) : null}
    </Box>
  );
};

export default Home;
