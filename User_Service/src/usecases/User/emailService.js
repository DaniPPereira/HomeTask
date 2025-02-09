const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Usar App Password aqui
    },
});

async function sendEmail({ to, subject, text, html }) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail enviado com sucesso para ${to}`);
    } catch (error) {
        console.error(`Erro ao enviar e-mail para ${to}:`, error);
        throw new Error('Erro ao enviar e-mail.');
    }
}

module.exports = sendEmail;
