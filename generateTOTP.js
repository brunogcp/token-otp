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