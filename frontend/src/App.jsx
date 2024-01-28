import React, { useState } from 'react';
import RequestOTP from './RequestOTP';
import ValidateOTP from './ValidateOTP';
import './App.css'

function App() {
  const [otpRequested, setOtpRequested] = useState(false);

  return (
    <div className="App">
      {!otpRequested ? (
        <RequestOTP setOtpRequested={setOtpRequested} />
      ) : (
        <ValidateOTP setOtpRequested={setOtpRequested} />
      )}
    </div>
  );
}

export default App;