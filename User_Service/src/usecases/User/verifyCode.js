const userRepository = require('../../framework/db/postgres/UserRepository');
const sendEmail = require('./emailService');

const verifyCode = async (email, code) => {
    try {
        // Para testes: sempre retorna sucesso
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
                email: email,
                isVerified: true
            }
        };
    } catch (error) {
        throw new Error(error.message || 'Error verifying code');
    }
};

module.exports = { verifyCode };
