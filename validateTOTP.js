const {TOTP} = require('otpauth');

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
let token = '487204'; // Substitua '123456' pelo token que deseja validar
let secret = 'JBSWY3DPEHPK3PXP';
console.log(verifyTOTP(token, secret)); // Retorna true se válido, false se inválido
