const userRepository = require('../../framework/db/postgres/UserRepository');
const sendEmail = require('./emailService');

const verifyCode = async (email, code) => {
    try {
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

        // Envia e-mail de confirmação
        await sendEmail({
            to: email,
            subject: 'Email Verified Successfully',
            text: 'Your email has been successfully verified.',
            html: `
                <h1>Email Verified!</h1>
                <p>Your email has been successfully verified.</p>
                <p>You can now use all features of our application.</p>
            `
        });

        // Código é válido
        return {
            success: true,
            message: 'Email verified successfully',
            data: {
                email: user.email,
                isVerified: true
            }
        };
    } catch (error) {
        throw new Error(error.message || 'Error verifying code');
    }
};

module.exports = { verifyCode };
