<div align="center">
  <h3 align="center">Cryptography</h3>
  <div>
  <a href="https://bgcp.vercel.app/article/02d45cf2-e54e-4f08-a675-059291afa994">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução ao Token OTP (One-Time Password)

Neste tutorial, vamos mergulhar nos conceitos fundamentais do One-Time Password (OTP), um método de autenticação que gera uma senha única para cada operação ou sessão de login. Amplamente utilizado em aplicações para melhorar a segurança, o OTP ajuda a proteger contra ataques de replay e phishing, garantindo que, mesmo que uma senha seja interceptada, ela não possa ser usada novamente.

### 🌟 Principais Características:

- **🔒 Segurança Aprimorada**: Ao gerar senhas que são válidas por um curto período de tempo ou por uma única sessão de login, o OTP minimiza o risco de acesso não autorizado.
- **👤 Autenticação de Dois Fatores (2FA)**: Frequentemente utilizado como uma segunda camada de segurança, adicionando uma verificação extra além do usuário e senha.
- **🔄 Geração Dinâmica de Senhas**: Utiliza algoritmos específicos para gerar senhas que não podem ser previstas.

## 🛠️ Instalação

### Windows, Linux (Ubuntu/Debian), e macOS:

Para seguir este tutorial, você precisará ter o Node.js e o NPM (Node Package Manager) instalados. Usaremos a biblioteca `otpauth`, que já vem embutida no Node.js, sem necessidade de instalação adicional.

```bash
npm install otpauth
```
## 📊 Uso Básico

Após a instalação, você pode começar a usar a biblioteca para criar tokens OTP. Vamos detalhar como gerar um TOTP (Time-Based One-Time Password), que é o tipo mais comum de OTP utilizado para 2FA.

1. **Criar um TOTP**:

Crie um arquivo, por exemplo, `generateTOTP.js`, e adicione o seguinte código para gerar um TOTP:

```js
const {TOTP} = require('otpauth');

function generateTOTP(secret) {
  let totp = new TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: secret
  });

  // Gera o token
  let token = totp.generate();

  return token;
}

// Exemplo de uso com uma "secret" codificada em Base32
let secret = 'JBSWY3DPEHPK3PXP';
console.log(generateTOTP(secret));
```

Neste exemplo, a `secret` deve ser uma string codificada em Base32. Cada vez que você executa este script, ele gera um novo token TOTP baseado na hora atual. O período padrão é de 30 segundos, o que significa que cada token é válido por 30 segundos.

2. **Validar um TOTP**:

Para validar um token gerado pelo usuário, você pode usar o seguinte método:

```js
function verifyTOTP(token, secret) {
  let totp = new TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: secret
  });

  // Verifica o token
  let isValid = totp.validate({token: token});

  // `isValid` será null se o token for inválido, ou a diferença de tempo se for válido
  return isValid !== null;
}

// Exemplo de validação
let token = '123456'; // Substitua '123456' pelo token que deseja validar
let secret = 'JBSWY3DPEHPK3PXP';
console.log(verifyTOTP(token, secret)); // Retorna true se válido, false se inválido
```

### 📝 Notas:

- A `secret` é a chave compartilhada entre o servidor e o cliente e deve ser protegida. Em um cenário real, você geraria uma `secret` para cada usuário e a armazenaria de maneira segura.
- A validade do token depende do tempo (`period`), então assegure-se de que o relógio do servidor esteja sincronizado com uma fonte de tempo confiável.
- O `otpauth` suporta diferentes algoritmos e números de dígitos, permitindo uma configuração flexível conforme suas necessidades de segurança.
## 📈 Caso de Uso: Autenticação com Token OTP

### Teoria:

💡 O OTP é uma excelente escolha para fortalecer a segurança da autenticação, pois garante que cada tentativa de login seja única. Isso é especialmente útil em aplicações que requerem altos níveis de segurança ou estão sujeitas a ataques cibernéticos frequentes.

### Motivo para Utilizar:

🚀 Implementar OTP como parte da autenticação de dois fatores (2FA) proporciona uma camada adicional de segurança, protegendo contra diversas formas de ataques online.

### 👨‍💻 Implementação Prática:

Vamos detalhar a implementação prática de um sistema de autenticação utilizando OTP (One-Time Password) com Node.js no backend e React no frontend, incluindo o envio de OTP por e-mail e a validação deste OTP. Incluiremos os códigos necessários para ambas as partes e adicionaremos emojis para tornar a experiência mais amigável.

### 🚀 Backend: Envio e Validação de OTP com Node.js

Primeiramente, você precisará configurar o servidor Node.js para lidar com o envio de OTPs e sua validação.
<div style="page-break-after: always;"></div>


#### 🛠️ Configuração do Servidor Node.js para Envio de OTP

1. **Instale as Dependências Necessárias**:

Para este projeto, você precisará do `express` para criar o servidor, `nodemailer` para enviar e-mails, e `otpauth` para gerar o OTP. Execute o seguinte comando no terminal:

```bash
npm install express nodemailer otpauth cors
```

2. **Criação do Servidor** (`server.js`):

Aqui está um exemplo de como configurar o servidor para gerar e enviar um OTP, além de validar o OTP recebido.

```js
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
```

### 🌟 Frontend: Solicitação e Validação de OTP com React

Agora, vamos criar a interface do usuário com React para solicitar o OTP e validar a entrada do usuário.

#### 📦 Instalação das Dependências

Certifique-se de ter o `create-react-app` instalado e crie um novo projeto React. No diretório do projeto, execute:

```bash
npm create vite@latest frontend
cd frontend
npm i
npm run dev
```

#### 🖥️ Componente de Solicitação de OTP (`RequestOTP.js`)

Crie um componente `RequestOTP.jsx` para solicitar o e-mail do usuário e enviar o OTP.

```jsx
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
```

#### 🖥️ Componente de Validação de OTP (`ValidateOTP.js`)

Crie um componente `ValidateOTP.jsx` para que o usuário insira o OTP recebido e valide-o.

```jsx
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
```

#### 📋 Integração dos Componentes no App

No seu `App.js`, integre os componentes `RequestOTP` e `ValidateOTP` para alternar entre a solicitação e a validação do OTP.

```jsx
import React, { useState } from 'react';
import RequestOTP from './RequestOTP';
import ValidateOTP from './ValidateOTP';
import './App.css'

function App() {
  const [otpRequested, setOtpRequested] = useState(false

);

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
```

### 🔍 Testes

#### 1. Simulação de Autenticação com OTP:

- Teste o processo de solicitação de OTP, garantindo que o e-mail com o OTP seja enviado corretamente.
- Verifique a funcionalidade de validação de OTP, assegurando que o sistema autentique o usuário apenas com um OTP válido.

## 🏆 Conclusão

A implementação de OTP como método de autenticação oferece uma camada robusta de segurança, protegendo os usuários contra uma série de vulnerabilidades e ataques online. Ao combinar OTP com outras práticas de segurança, como senhas fortes e autenticação de dois fatores, você pode criar sistemas altamente seguros que protegem tanto os dados do usuário quanto a integridade da sua aplicação.