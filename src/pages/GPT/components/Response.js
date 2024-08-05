import { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

import Plot from "./Plot";

function base64ToBlob(base64, mime) {
  const byteChars = atob(base64);
  const byteNumbers = Array.from(byteChars, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}

// React component to display the image
// React component to display the image
const Base64Image = ({ base64, mime }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (base64 && mime) {
      const blob = base64ToBlob(base64, mime);
      const url = URL.createObjectURL(blob);
      setImageSrc(url);

      // Clean up the object URL when the component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [base64, mime]);

  return (
    <div>
      {imageSrc ? (
        <img width={"70%"} src={imageSrc} alt="plotted_data" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Response = ({
  outputs,
  setIsPopUpOpen,
  setFeedbackPayload,
  setPopupId,
  setLogs,
}) => {
  // console.log("output: ", output);
  const mimeType = "image/png";

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [outputs]);

  return (
    <Stack
      ref={scrollRef}
      sx={{
        overflowY: "scroll",
        height: "85%",
        // flex: 1,
        border: "none",
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
      {outputs?.length > 0 &&
        outputs.map((output) => {
          return (
            <Stack gap={1} sx={{ padding: "1rem" }}>
              {output?.error === 1 ? (
                <>
                  <Typography sx={{ fontSize: "1rem", color: "red" }}>
                    {output?.error_msg}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "white", fontWeight: 700 }}
                  >
                    {"You"}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "white" }}>
                    {output?.question}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "white", fontWeight: 700 }}
                  >
                    {"Skewb-GPT"}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "white" }}>
                    {output?.answer.text}
                  </Typography>
                  <Stack direction={"row"} gap={2}>
                    <ThumbUpIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setFeedbackPayload((prevPayload) => ({
                          ...prevPayload,
                          user_query: output.question,
                          thumbs_up: 1,
                          timestamp: output.timestamp,
                        }));
                        setPopupId(1);
                      }}
                      fontSize="small"
                      sx={{ cursor: "pointer", fontSize: "18px" }}
                    />
                    <ThumbDownIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setFeedbackPayload((prevPayload) => ({
                          ...prevPayload,
                          user_query: output.question,
                          thumbs_up: 0,
                          timestamp: output.timestamp,
                        }));
                        setPopupId(1);
                      }}
                      fontSize="small"
                      sx={{ cursor: "pointer", fontSize: "18px" }}
                    />
                    <EmojiObjectsIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setPopupId(2);
                        setLogs(output?.answer.gpt_log);
                      }}
                      sx={{
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#d6ff41",
                      }}
                    />
                  </Stack>
                </>
              ) : (
                <Stack gap={1}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "white", fontWeight: 700 }}
                  >
                    {"You"}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "white" }}>
                    {output?.question}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "white", fontWeight: 700 }}
                  >
                    {"Skewb-GPT"}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "white" }}>
                    {output?.answer.text}
                  </Typography>
                  {output?.answer.isImage === true ? (
                    // <Base64Image
                    //   base64={output?.answer.image}
                    //   mime={mimeType}
                    // />
                    <Plot data={output?.answer.graph} />
                  ) : null}
                  <Stack direction={"row"} gap={2}>
                    <ThumbUpIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setFeedbackPayload((prevPayload) => ({
                          ...prevPayload,
                          user_query: output.question,
                          thumbs_up: 1,
                          timestamp: output.timestamp,
                        }));
                        setPopupId(1);
                      }}
                      sx={{ cursor: "pointer", fontSize: "18px" }}
                    />
                    <ThumbDownIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setFeedbackPayload((prevPayload) => ({
                          ...prevPayload,
                          user_query: output.question,
                          thumbs_up: 0,
                          timestamp: output.timestamp,
                        }));
                        setPopupId(1);
                      }}
                      sx={{ cursor: "pointer", fontSize: "18px" }}
                    />
                    <EmojiObjectsIcon
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setPopupId(2);
                        setLogs(output?.answer.gpt_log);
                      }}
                      sx={{
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#d6ff41",
                      }}
                    />
                  </Stack>
                </Stack>
              )}
            </Stack>
          );
        })}
    </Stack>
  );
};

export default Response;
