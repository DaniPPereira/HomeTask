'use strict';

const express = require('express');
const Joi = require('joi');
const {
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getAllTasks,
    getTasksByHome,
    getTasksByUser,
} = require('../usecases/Task');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - data
 *         - state
 *         - homeId
 *         - userId
 *         - taskCategoryId
 *       properties:
 *         title:
 *           type: string
 *           description: Título da tarefa
 *           example: "Limpar a cozinha"
 *         description:
 *           type: string
 *           description: Descrição detalhada da tarefa
 *           example: "Limpeza profunda da cozinha"
 *         data:
 *           type: string
 *           format: date
 *           description: Data de conclusão da tarefa
 *           example: "2024-12-15"
 *         state:
 *           type: string
 *           description: Estado atual da tarefa
 *           example: "Pendente"
 *         photo:
 *           type: string
 *           description: Foto da tarefa (opcional)
 *           example: "http://exemplo.com/foto.jpg"
 *         homeId:
 *           type: integer
 *           description: ID da casa onde a tarefa deve ser realizada
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID do usuário responsável pela tarefa
 *           example: 2
 *         taskCategoryId:
 *           type: integer
 *           description: ID da categoria de tarefa
 *           example: 3
 *     TaskId:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da tarefa
 *           example: 1
 *     TaskHomeId:
 *       type: object
 *       required:
 *         - homeId
 *       properties:
 *         homeId:
 *           type: integer
 *           description: ID da casa
 *           example: 1
 *     TaskUserId:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID do usuário
 *           example: 2
 */
const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    data: Joi.date().required(),
    state: Joi.string().required(),
    photo: Joi.string().optional(),
    homeId: Joi.number().required(),
    userId: Joi.number().required(),
    taskCategoryId: Joi.number().required(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    data: Joi.date().required(),
    state: Joi.string().required(),
    photo: Joi.string().optional(),
    homeId: Joi.number().required(),
    userId: Joi.number().required(),
    taskCategoryId: Joi.number().required(),
});

const taskIdSchema = Joi.object({
    id: Joi.number().required(),
});

const taskHomeIdSchema = Joi.object({
    homeId: Joi.number().required(),
});

const taskUserIdSchema = Joi.object({
    userId: Joi.number().required(),
});

const taskParticipantsIdSchema = Joi.object({
    userId: Joi.number().required(),
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     description: Este endpoint retorna uma lista de todas as tarefas registradas no sistema.
 *     responses:
 *       200:
 *         description: Sucesso ao obter todas as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tasks fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica pelo ID
 *     description: Este endpoint retorna uma tarefa específica com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Sucesso ao obter a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await taskIdSchema.validateAsync(req.params);
        const task = await getTaskById({ id });
        res.status(200).json({
            success: true,
            message: 'Task fetched successfully',
            data: task,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Este endpoint cria uma nova tarefa no sistema.
 *     requestBody:
 *       description: Dados da tarefa a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.post('/', async (req, res, next) => {
    try {
        const { title, description, data, state, photo, homeId, userId, taskCategoryId } = await taskSchema.validateAsync(req.body);
        const task = await createTask({ title, description, data, state, photo, homeId, userId, taskCategoryId });
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Este endpoint permite atualizar os detalhes de uma tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser atualizada
 *     requestBody:
 *       description: Dados atualizados da tarefa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await taskIdSchema.validateAsync(req.params);
        const { title, description, data, state, photo, homeId, userId, taskCategoryId } = await updateTaskSchema.validateAsync(req.body);
        const task = await updateTask({ id, title, description, data, state, photo, homeId, userId, taskCategoryId });
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     description: Este endpoint remove uma tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser excluída
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 data:
 *                   type: object
 *                   description: Confirmação da exclusão
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await taskIdSchema.validateAsync(req.params);
        const result = await deleteTask({ id });
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /tasks/home/{homeId}:
 *   get:
 *     summary: Retorna tarefas de uma casa específica
 *     description: Este endpoint retorna todas as tarefas associadas a uma casa específica.
 *     parameters:
 *       - in: path
 *         name: homeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da casa
 *     responses:
 *       200:
 *         description: Sucesso ao obter tarefas para a casa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tasks fetched successfully for home
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get('/home/:homeId', async (req, res, next) => {
    try {
        const { homeId } = await taskHomeIdSchema.validateAsync(req.params);
        const tasks = await getTasksByHome({ homeId });
        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully for home',
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     summary: Retorna tarefas de um usuário específico
 *     description: Este endpoint retorna todas as tarefas associadas a um usuário específico.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso ao obter tarefas para o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tasks fetched successfully for user
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = await taskUserIdSchema.validateAsync(req.params);
        const tasks = await getTasksByUser({ userId });
        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully for user',
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
