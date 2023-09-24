import React from 'react'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  return (
    <div>
        <GoogleOAuthProvider clientId="938830330020-v0d0eg5bkjvan6kdbg14iur4u3l40tv5.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        </GoogleOAuthProvider>;
    </div>
  )
}

export default Login