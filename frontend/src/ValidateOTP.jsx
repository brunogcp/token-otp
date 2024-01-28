import React, { useState } from 'react';

function ValidateOTP({ setOtpRequested }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleValidateOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.text();
      alert(data); // Mostra feedback ao usuário
      if (data.includes('sucesso')) {
        setOtpRequested(false); // Reseta o estado para permitir novo pedido de OTP
      }
    } catch (error) {
      alert('Erro ao validar OTP 😢');
      console.error('Error:', error);
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
      <input
        type="text"
        placeholder="Digite o OTP 🔑"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleValidateOtp}>Validar OTP ✔️</button>
    </div>
  );
}

export default ValidateOTP;