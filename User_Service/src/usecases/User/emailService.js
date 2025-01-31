// const nodemailer = require('nodemailer');

// // Configuração do transporte de e-mail
// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST || 'smtp.gmail.com', // Altere conforme necessário
//     port: process.env.EMAIL_PORT || 587, // Porta do SMTP
//     secure: false, // Use `true` para porta 465, `false` para outras
//     auth: {
//         user: process.env.EMAIL_USER || 'seu-email@gmail.com', // Endereço de e-mail
//         pass: process.env.EMAIL_PASSWORD || 'sua-senha', // Senha ou App Password
//     },
// });

// async function sendEmail({ to, subject, text, html }) {
//     const mailOptions = {
//         from: process.env.EMAIL_FROM || 'seu-email@gmail.com', // Endereço de envio
//         to,
//         subject,
//         text,
//         html,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`E-mail enviado com sucesso para ${to}`);
//     } catch (error) {
//         console.error(`Erro ao enviar e-mail para ${to}:`, error);
//         throw new Error('Erro ao enviar e-mail.');
//     }
// }

// module.exports = sendEmail;
