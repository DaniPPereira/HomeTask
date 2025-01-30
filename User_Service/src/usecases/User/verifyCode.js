const userRepository = require('../../framework/db/postgres/UserRepository');

module.exports = async (email, code) => {
    // Busca o usuário pelo e-mail
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User with the provided email does not exist');
    }

    // Verifica se o código corresponde
    if (user.verificationcode !== code) {
        throw new Error('Invalid verification code');
    }

    // Verifica se o código expirou
    const currentTime = new Date();
    if (user.codeexpiry < currentTime) {
        throw new Error('Verification code has expired');
    }

    // Limpa os campos de código após validação bem-sucedida
    await userRepository.update(user.id, {
        verificationcode: null,
        codeexpiry: null,
    });

    // Código é válido
    return {
        message: 'Verification code is valid',
    };
};
