import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import CustomInput from "../components/CustomInput";
import Axios from "../Axios";

import Loader from "../components/Loader";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setUserNameError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const userLogin = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.post("login/", {
        username: userName,
        password: password,
      });
      const data = await response.data; // Use await to get the data
      //   console.log("data: ", data);
      localStorage.setItem("token", data.data.token);
      setUserName("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    if (userName === "") {
      setUserNameError("Please enter username");
    } else if (password === "") {
      setPasswordError("Please enter password");
    } else if (userName && password) {
      //   console.log(userName, password);
      userLogin();
    }
  };

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ border: "none", height: "100%", backgroundColor: "black" }}
    >
      <Stack
        sx={{
          border: "none",
          backgroundColor: "#1c2427",
          borderRadius: "10px",
          padding: "2.5rem",
        }}
        gap={1}
      >
        <Stack gap={1}>
          <Typography variant="h6">Username</Typography>
          <CustomInput
            value={userName}
            placeholder="Username"
            onChange={handleUserName}
          />
          <Typography variant="h6" sx={{ color: "red", minHeight: "1.6rem" }}>
            {userNameError}
          </Typography>
        </Stack>

        <Stack gap={1}>
          <Typography variant="h6">Password</Typography>
          <CustomInput
            value={password}
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <Typography variant="h6" sx={{ color: "red", minHeight: "1.6rem" }}>
            {passwordError}
          </Typography>
        </Stack>
        <Button
          onClick={handleSubmit}
          sx={{
            border: "1px solid #d6ff41",
            color: "#d6ff41",
            width: 90,
            textTransform: "capitalize",
            padding: "0.1rem",
            margin: "auto",
            "&:hover": {
              backgroundColor: "#d6ff41",
              color: "black",
            },
          }}
        >
          <Typography variant="h6">login</Typography>
        </Button>
      </Stack>
      {isLoading ? <Loader /> : null}
    </Stack>
  );
};

export default Login;
