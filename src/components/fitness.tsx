import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Fitness = () => {

let stepCount = 0;


    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://v1.nocodeapi.com/aaaaampere/fit/ggVBILvurRXhDwAS/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today'
        );

          stepCount=(response.data.steps_count);
        console.log(response.data);
        console.log(response.data.steps_count);
      } catch (error) {

        console.log(error);
      }
    };

    fetchData(); 

  const steps = stepCount + 2658;
  const offset = 439.6 * ((10000 - steps) / 10000);
  const percent = (steps / 10000) * 100;



  return (
    <div>
      <GoogleOAuthProvider clientId="938830330020-v0d0eg5bkjvan6kdbg14iur4u3l40tv5.apps.googleusercontent.com">
        {/* Pass the handleGoogleLoginSuccess function as the onSuccess handler */}
        <GoogleLogin onSuccess={fetchData} />
      </GoogleOAuthProvider>
      <h1>You've walked {steps} steps today!</h1>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          stroke="#ffb6c1"
          strokeWidth="12px"
        ></circle>
        <circle
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          stroke="#8B0000"
          strokeLinecap="round"
          strokeWidth="12px"
          strokeDasharray="439.6px"
          strokeDashoffset={offset}
        ></circle>
      </svg>
      <h2>That's {percent}% of your goal of 10000 steps</h2>
    </div>
  );
};

export default Fitness;
