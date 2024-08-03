import React, { useState, useEffect } from 'react'
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "../Axios";
import googleLogo from '../images/google-logo.png'
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import '../assets/ManualCSS/login.css'
import { Tooltip } from '@mui/material';

const LoginByGoogle = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const sendData = (email) => {

        axios.post("google_signin/", {
            email: email,
        })
            .then((response) => {
                if (response.data.error === 1) {
                    //  setTermsAndConditionsErr(response.data.erroMsg);
                    toast(response.data.erroMsg);
                    //  setLoader(false);
                } else {
                    console.log("problem");
                    localStorage.setItem("TokenSkewb", response.data.data.token);
                    localStorage.setItem("NameSkewb", response.data.data.Name);
                    localStorage.setItem("is_superuser", response.data.data.is_superuser);
                    if (localStorage.getItem('CurrentTheme') === null) {
                        localStorage.setItem('CurrentTheme', "Dark")
                    }

                    navigate("/portfolio");
                    //  setLoader(false);
                }
            }).catch((err) => {
                console.log(err);
                toast(err);
                //   setLoader(false);
            });
    }
    const handleGoogleLogin = useGoogleLogin({


        onSuccess: (response) => {


            console.log('-----GoogleResponse-----');
            console.log("Login ", response);
            console.log('Login Success:', response.access_token);
            setUser(response)
            const decoded = jwtDecode(response.access_token);
            console.log("decoded ", decoded);


        },
        onError: (error) => console.log("Login Failed:", error)

        // Handle login success
    });

    useEffect(() => {
        if (user.length>0) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {


                    console.log('---- UserProfile-------');
                    console.log(res.data);
                    sendData(res.data.email)

                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <div className="shadow-2xl">
            <div
                className='google_button'
                type="button"
               
                style={{
                    backgroundColor: '#1c2427',
                    color: 'black',
                    
                    outline: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // border: 'solid #d6ff41 1px',
                    // width: 'wrap-content',
                    // fontWeight: '700',
                    // fontSize: 'var(--regular-font-size)',
                    // lineHeight: 'var(--regular-line-height)',


                }}

                onClick={handleGoogleLogin}
            >
                <div  title="Sign in With Google">
                <img  src={googleLogo} style={{ width: '30px', height: '30px',cursor: 'pointer',  }} />
                </div>

                

            </div>
        </div>
    );
};

export default LoginByGoogle;