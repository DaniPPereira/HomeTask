const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../framework/db/postgres/UserRepository'); // Importa o repositório do usuário

const SECRET_KEY = process.env.JWT_SECRET; // Chave secreta para o JWT

module.exports = async (loginData) => {
    const { email, password } = loginData;

    // Verifica se os campos obrigatórios foram fornecidos
    if (!email || !password) {
        throw new Error('Missing required fields: email, password');
    }

    // Busca o usuário pelo email
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('Invalid credentials: user not found');
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials: incorrect password');
    }

    // Gera um token JWT
    const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email, roles: existingUser.roles },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        roles: existingUser.roles,
        token,
    };
};