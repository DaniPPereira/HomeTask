const crypto = require('crypto');
const userRepository = require('../../framework/db/postgres/UserRepository');
const sendEmail = require('../User/emailService');

module.exports = async (email) => {
    // Verifica se o e-mail existe
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User with the provided email does not exist');
    }

    // Gera um código de verificação aleatório (6 dígitos)
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Define o tempo de expiração (30 minutos a partir de agora)
    const codeExpiry = new Date(Date.now() + 30 * 60 * 1000);

    
    // Atualiza o usuário com o código de verificação e expiração
    await userRepository.update(user.id, {
        verificationcode: verificationCode,
        codeexpiry: codeExpiry,
    });

    // Envia o e-mail com o código de verificação
    //await sendEmail({
        //to: email,
        //subject: 'Password Reset Request',
       // text: `Your password reset code is: ${verificationCode}. It is valid for 30 minutes.`
    //});

    return {
        verificationCode: verificationCode,
        message: 'Password reset code sent successfully',
    };
};
