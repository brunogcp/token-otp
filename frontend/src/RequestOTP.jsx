import React, { useState } from 'react';

function RequestOTP({ setOtpRequested }) {
  const [email, setEmail] = useState('');

  const handleRequestOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.text();
      alert(data); // Mostra feedback ao usuário
      if (response.status === 200) {
        setOtpRequested(true);
      }
    } catch (error) {
      alert('Erro ao solicitar OTP 😢');
      console.error('Error:', error);
      setOtpRequested(false)
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Digite seu e-mail 📧"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRequestOtp}>Enviar OTP 🚀</button>
    </div>
  );
}

export default RequestOTP;