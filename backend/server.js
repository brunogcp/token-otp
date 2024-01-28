const express = require('express');
const nodemailer = require('nodemailer');
const { TOTP } = require('otpauth');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use seu serviço de e-mail
  auth: {
    user: 'seuemail@gmail.com', // Seu e-mail
    pass: 'suasenha' // Sua senha
  }
});

// Armazena os OTPs temporariamente
let otpStore = {};

// Endpoint para solicitar OTP
app.post('/request-otp', (req, res) => {
  const { email } = req.body;
  const otp = new TOTP({ secret: 'JBSWY3DPEHPK3PXP', digits: 6, period: 120 }).generate();

  // Armazena o OTP com base no e-mail do usuário
  otpStore[email] = otp;

  // Envia o OTP por e-mail
  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Seu Código OTP',
    text: `Seu código OTP é: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('Email enviado: ' + info.response);
      res.send('OTP enviado com sucesso! 📧');
    }
  });
});

// Endpoint para validar OTP
app.post('/validate-otp', (req, res) => {
  const { email, otp } = req.body;
  const validOtp = otpStore[email];

  if (otp === validOtp) {
    delete otpStore[email]; // Limpa o OTP após a validação
    res.send('OTP validado com sucesso! ✔️');
  } else {
    res.status(400).send('OTP inválido ❌');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});