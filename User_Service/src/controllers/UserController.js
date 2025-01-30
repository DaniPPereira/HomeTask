const express = require('express');
const Joi = require('joi');
const {
    registerUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser,
    forgotPassword,
    verifyCode
} = require('../usecases/User');
const router = express.Router();

// Validações com Joi
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roles: Joi.string().required(),
    token: Joi.string().optional(),
    profilepicture: Joi.string().optional(),
    verificationcode: Joi.string().length(6).optional(),
    codeexpiry: Joi.date().optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    roles: Joi.string().optional(),
    profilepicture: Joi.string().optional(),
    verificationcode: Joi.string().length(6).optional(),
    codeexpiry: Joi.date().optional(),
});

const userDeleteSchema = Joi.object({
    id: Joi.number().required(),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});


const verifyCodeSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
});


router.post('/', async (req, res, next) => {
    try {
        // Valida os dados do corpo da requisição
        const userData = await userSchema.validateAsync(req.body);

        // Chama o caso de uso para criar o usuário
        const result = await registerUser(userData);

        // Resposta de sucesso
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result,
        });
    } catch (err) {
        console.error("Error:", err); // Log de erro para depuração
        next(err); // Passa o erro para o middleware de tratamento
    }
});

router.post('/login', async (req, res, next) => {
    try {
        // Valida os dados do corpo da requisição
        const loginData = await loginSchema.validateAsync(req.body);

        // Chama o caso de uso de login
        const result = await loginUser(loginData);

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    } catch (err) {
        console.error("Error:", err); // Log de erro para depuração
        next(err); // Passa o erro para o middleware de tratamento
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        // Valida os dados do corpo da requisição
        const updateData = await updateUserSchema.validateAsync(req.body);

        // Chama o caso de uso para atualizar o usuário
        const result = await updateUser(req.params.id, updateData);

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    } catch (err) {
        console.error("Error:", err); // Log de erro para depuração
        next(err); // Passa o erro para o middleware de tratamento
    }
});

router.get('/', async (req, res, next) => {
    try {
        // Chama o caso de uso para listar os usuários
        const users = await getAllUsers();

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'Users listed successfully',
            data: users,
        });
    }
    catch (err) {
        console.error("Error:", err); 
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await userDeleteSchema.validateAsync(req.params);
        const users = await deleteUser({id});

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: users,
        });
    }
    catch (err) {
        console.error("Error:", err); 
        next(err);
    }
});

router.post('/forgot-password', async (req, res, next) => {
    try {
        // Valida os dados do corpo da requisição
        const { email } = await forgotPasswordSchema.validateAsync(req.body);

        // Chama o caso de uso para recuperação de senha
        const result = await forgotPassword(email);

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'Password reset process initiated',
            data: result,
        });
    } catch (err) {
        console.error("Error:", err); // Log de erro para depuração
        next(err); // Passa o erro para o middleware de tratamento
    }
});

router.post('/verify-code', async (req, res, next) => {
    try {
        // Valida os dados do corpo da requisição
        const { email, code } = await verifyCodeSchema.validateAsync(req.body);

        // Chama o caso de uso para verificar o código
        const result = await verifyCode(email, code);

        // Resposta de sucesso
        res.status(200).json({
            success: true,
            message: 'Verification code is valid',
            data: result,
        });
    } catch (err) {
        console.error("Error:", err); // Log de erro para depuração
        next(err); // Passa o erro para o middleware de tratamento
    }
});

module.exports = router;