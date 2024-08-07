import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../Axios";
import Loader from "../Components/Loader";
import BaseUrl from "../BaseURL";
import bcrypt from 'bcryptjs';
import LogoMark from "../images/logo.png";
import LavenderLogo from "../images/logo-c1.png";
import SapphireLogo from "../images/logo-c3.png";
import TealLogo from "../images/logo-c5.png";
import CyanLogo from "../images/logo-c7.png";
import GoldenrodLogo from "../images/logo-b4.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../assets/ManualCSS/login.css'
import { jwtDecode } from "jwt-decode";
import LoginByGoogle from "../Components/LoginByGoogle";


const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    Username: "",
    Password: "",
    TermsAndConditions: true,
  });
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [termsAndConditionsErr, setTermsAndConditionsErr] = useState();


  const handleValidation = () => {
    setUsernameError("");
    setPasswordError("");
    let flag = true;
    if (users.Username === "") {
      setUsernameError("Please enter username");
      flag = false;
    }
    if (users.Password === "") {
      setPasswordError("Please enter password");
      flag = false;
    }
    if (users.TermsAndConditions === false) {
      setTermsAndConditionsErr("Accept terms and conditions");
      flag = false;
    }
    return flag;
  };

  // useEffect(()=>{
  //   if(localStorage.getItem('TokenSkewb'))
  //   {
  //       navigate('/portfolio');
  //   }
  // },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError('');
    setTermsAndConditionsErr('');
    setPasswordError('');
    const flag = handleValidation();
    
    if (flag) {
      setLoader(true);
      axios.post("login/", {
        username: users.Username,
        password: users.Password,
      })
        .then((response) => {
          console.log("response ",response);
          if (response.data.error === 1) {
            setTermsAndConditionsErr(response.data.erroMsg);
            setLoader(false);
          } else {
            localStorage.setItem("TokenSkewb", response.data.data.token);
            localStorage.setItem("NameSkewb", response.data.data.Name);
            localStorage.setItem("is_superuser", response.data.data.is_superuser);
            if (localStorage.getItem('CurrentTheme') === null) {
              localStorage.setItem('CurrentTheme', "Dark")
            }

            navigate("/portfolio");
            setLoader(false);
          }
        }).catch(() => {
          setLoader(false);
          toast.error("Error Occurs")
          
          // setTermsAndConditionsErr("Error");
        });
    }
  };



  return (
    <>
      {loader ? <Loader /> : null}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wrapper-page my-5"  >
          <div className="container-fluid p-0 m-0 max-w-100">
            <div className="card" style={{ borderRadius: '7px' }}>
              <div className="card-body card-gradient" style={{ borderRadius: '7px' }}>
                <div className="text-center mt-3">
                  <div className="mb-2">
                    <img
                      src={
                        localStorage.getItem("CurrentTheme") !== null && localStorage.getItem("CurrentTheme") !== "null"
                          ? localStorage.getItem("CurrentTheme") === "Dark"
                            ? `${BaseUrl}/logo/logo-light.png?v=${new Date().getTime()}`
                            : `${BaseUrl}/logo/logo-dark.png`
                          : `${BaseUrl}/logo/logo-light.png`
                      }
                      alt="logo"
                      width="auto"
                      maxwidth="100%"
                      height='100px'
                      display='block'
                      margin='0 auto'
                    />
                  </div>
                </div>
                <div className="p-3">
                  <form className="form-horizontal mt-2" onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <div className="col-12">

                        <label className="login-lable" htmlFor="username" style={{ color: 'white', fontSize: 'small', fontWeight: 'normal' }}>Username</label>

                        <input
                          className="form-control "
                          type="text"
                          placeholder="Username"
                          name="username"
                          autoComplete="off"
                          onChange={(e) => setUsers({ ...users, Username: e.target.value })}

                          value={users.Username}
                          style={{ padding: '7px', color: 'white' }}
                        />
                      </div>
                      <p className="error">{usernameError}</p>
                    </div>

                    <div className="form-group">
                      <div className="col-12">
                        {/* <h3>
                          
                        </h3> */}
                        <label className="login-lable" style={{ color: 'white', fontSize: 'small', fontWeight: 'normal' }}>Password</label>
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          name="password"

                          autoComplete="off"
                          onChange={(e) => setUsers({ ...users, Password: e.target.value })}
                          value={users.Password}
                          style={{ padding: '7px' }}

                        />
                      </div>
                      <p className="error">{passwordError}</p>
                      <a href="/forget-password" className="forgot-password">Forgot password?</a>


                    </div>

                    {/* <div className="form-group mb-1 row">
                      <div className="col-12">
                        <div className="custom-control custom-checkbox d-flex justify-content-center">
                          <input
                            type="checkbox"
                            className="custom-control-input login-checkbox"
                            name="check"
                            checked={users.TermsAndConditions}
                            onChange={(e) => setUsers({ ...users, TermsAndConditions: e.target.checked })}
                            style={{cursor:"pointer"}}
                          />
                          <label className="form-label ms-1 login-link">
                            I agree to Terms &amp; Conditions
                          </label>
                        </div>
                        <p className="error" style={{ textAlign: "center" }}>
                          {termsAndConditionsErr}
                        </p>
                      </div>
                    </div> */}
                    <p className="error" style={{ textAlign: "center" }}>
                      {termsAndConditionsErr}
                    </p>
                    <div className="form-group mb-1 text-center row  pt-1">
                      <div className="col-12 " >
                        <button className="btn btn-info" type="submit">Login</button>
                      </div>
                      <div className="form-group text-center row mt-2">
                        <div className="col-12">
                          <span className="or-text">OR</span>
                          {/* <hr style={{color:'white',width:'15rem',margin:'auto',marginTop:'5px'}}/> */}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LoginByGoogle />
                    </div>
                  </form>
                </div>
                <div className="text-center">
                  <p className="mb-1 login-footer">
                    Powered by&nbsp;
                    <img
                      src={
                        localStorage.getItem("CurrentTheme") === "Dark"
                          ? LogoMark
                          : localStorage.getItem("ColorCode") === "Lavender"
                            ? LavenderLogo
                            : localStorage.getItem("ColorCode") === "Sapphire"
                              ? SapphireLogo
                              : localStorage.getItem("ColorCode") === "Teal"
                                ? TealLogo
                                : localStorage.getItem("ColorCode") === "Cyan"
                                  ? CyanLogo
                                  : localStorage.getItem("ColorCode") === "Goldenrod"
                                    ? GoldenrodLogo
                                    : LogoMark
                      }
                      alt="logo"
                      style={{ width: "25%" }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
