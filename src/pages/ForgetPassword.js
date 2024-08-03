import React, { useState } from 'react';
import '../assets/ManualCSS/login.css'
import axios from "../Axios";
import Loader from "../Components/Loader";
import BaseUrl from "../BaseURL";
import LogoMark from "../images/logo.png";
import LavenderLogo from "../images/logo-c1.png";
import SapphireLogo from "../images/logo-c3.png";
import TealLogo from "../images/logo-c5.png";
import CyanLogo from "../images/logo-c7.png";
import GoldenrodLogo from "../images/logo-b4.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoader(true);
    axios.post("api/forget_password/", {
      email: email

    })
      .then((response) => {
        if (response.data.error === 1) {
          setLoader(false);
        } else {
          setMessage('Password reset link has been sent to your email address.');
          setLoader(false);
        }
      }).catch(() => {
        setLoader(false);
        setMessage('Some error occur');

      });
    setEmail('');

    // For demonstration purposes, we'll just display a success message

  };

  return (
    <>

      {loader ? <Loader /> : null}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',alignItems:'center',height:'100%' }}>
        <div className="wrapper-page my-5"  >
          <div className="container-fluid p-0 m-0 max-w-90">
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

                        <h6> <label htmlFor="email" >Enter Your Email Address</label></h6>
                        <input
                         className="form-control "
                          type="email"
                          id="email"
                          name="email"
                          placeholder='example@gmail.com'
                          autoComplete='off'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                       
                      </div>
                      
                    </div>


                   
                    <div className="form-group mb-1 text-center row mt-3 pt-1">
                      <div className="col-12 " >
                        <button className="btn btn-info" type="submit">Send Reset Link</button>
                      </div>

                    </div>

                  </form>
                  {message && <p className="message" style={{ padding: '7px' }}>{message}</p>}
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
      <div className="forgot-password-container ">

       
       
      </div>
    </>
  );
};

export default ForgotPassword;
