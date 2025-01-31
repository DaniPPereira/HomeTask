const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../framework/db/postgres/UserRepository'); // Importa o repositório do usuário

const SECRET_KEY = process.env.JWT_SECRET; // Chave secreta para o JWT

module.exports = async (userData) => {
    const { name, email, password } = userData;

    // Validação dos campos obrigatórios
    if (!name || !email || !password) {
        throw new Error('Missing required fields: name, email, password');
    }

    // Verifica se o email já está em uso
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar novo usuário
    const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        roles: ['user'] // Role padrão
    });

    // Gerar token JWT
    const token = jwt.sign(
        { 
            id: newUser.id, 
            email: newUser.email, 
            roles: newUser.roles 
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    // Retorna os dados do usuário (sem a senha) e o token
    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles,
        token
    };
};