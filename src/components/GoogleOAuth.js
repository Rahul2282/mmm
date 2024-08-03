import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import '../assets/ManualCSS/login.css';
import GoogleButton from 'react-google-button'

// const clientId = process.env.CLIENT_ID;
const clientId = "1078207315954-hl8piofuu1gup8cf6evulsqqrk52pbp7.apps.googleusercontent.com";

const GoogleOAuth = ({ onSuccess, onError }) => (
  <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin
    clientId="your-google-app-client-id.apps.googleusercontent.com"
    render={renderProps => (
      <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
    )}
    onSuccess={onSuccess}
    onFailure={onError}
    cookiePolicy={'single_host_origin'}
  />,
  </GoogleOAuthProvider>
);

export default GoogleOAuth;
