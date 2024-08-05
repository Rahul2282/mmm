import { Stack, Typography, Box } from "@mui/material";


const Aside = ({ tabs, setTabId, activeTab, setActiveTab, credits }) => {

  return (
    <Stack
      sx={{ height: "100%", padding: "1rem", borderRight: "3px solid #3e5056" }}
    >
      <Stack sx={{ height: "88%" }}>
        <Box component={"span"}>
          {/* <Typography
            component={"span"}
            variant="h5"
            sx={{
              backgroundColor: "#3e5056",
              padding: "0.5rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            New Chat
          </Typography> */}
        </Box>
        <Stack sx={{ marginTop: "1rem", padding: "1rem 0", gap: 1 }}>
          {tabs &&
            tabs.map((tab) => {
              return (
                <Typography
                  onClick={() => {
                    setTabId(tab.tab_id);
                    setActiveTab(tab.tab_id);
                  }}
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: activeTab === tab.tab_id ? "#3e5056" : "",
                    padding: "0.25rem 0.5rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#3e5056",
                    },
                  }}
                  variant="h6"
                  key={tab.tab_id}
                >
                  {tab.tabname}
                </Typography>
              );
            })}
        </Stack>
      </Stack>
      <Stack
        sx={{ height: "12%" }}
        direction={"row"}
        justifyContent={"end"}
        gap={2}
      >
        <Typography variant="h6">Credits:</Typography>
        <Stack direction={"row"} gap={1}>
          <Typography variant="h6" sx={{color: credits?.remaining_credits > 0 ? "rgb(3, 255, 3)" : "red"}}>{credits?.remaining_credits?.toFixed(2)}</Typography>
          <Typography variant="h6">{"/"}</Typography>
          <Typography variant="h6">{credits?.total_credits}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Aside;
