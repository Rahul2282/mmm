import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";

const Menubar = () => {
  const location = useLocation();
  const Analyse = JSON.parse(localStorage.getItem("Analyse"));

  // Get the current tab index based on the location path
  const getCurrentTab = () => {
    const path = location.pathname.split("/")[1];
    const tabIndex = Analyse.Menubar.findIndex(item => item.key === path);
    return tabIndex === -1 ? false : tabIndex;
  };

  return (
    <AppBar position="static" color="default">
      <Tabs
        value={getCurrentTab()}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="menubar tabs"
      >
        {Analyse?.Menubar.map((item, index) => (
          <Tab
            key={item.key}
            label={item.value}
            component={Link}
            to={`/${item.key === "optimizer" ? "optimize" : item.key}`}
          />
        ))}
        <Tab
          label="Saved Results"
          component={Link}
          to="/savedresults"
        />
      </Tabs>
    </AppBar>
  );
};

export default Menubar;
