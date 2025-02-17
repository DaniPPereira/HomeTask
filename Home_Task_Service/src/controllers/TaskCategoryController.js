'use strict';

const express = require('express');
const Joi = require('joi');
const {
    createTaskCategory,
    updateTaskCategory,
    deleteTaskCategory,
    getTaskCategoryById,
    getAllTaskCategories,
} = require('../usecases/TaskCategory');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskCategory:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         description:
 *           type: string
 *           description: Descrição da categoria de tarefa
 *           example: "Urgente"
 *     TaskCategoryId:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da categoria de tarefa
 *           example: 1
 */
const taskCategorySchema = Joi.object({
    description: Joi.string().required(),
});

const updateTaskCategorySchema = Joi.object({
    description: Joi.string().required(),
});

const taskCategoryIdSchema = Joi.object({
    id: Joi.number().required(),
});


/**
 * @swagger
 * /task-categories:
 *   get:
 *     summary: Retorna todas as categorias de tarefas
 *     description: Este endpoint retorna uma lista de todas as categorias de tarefas registradas no sistema.
 *     responses:
 *       200:
 *         description: Sucesso ao obter todas as categorias de tarefas
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
 *                   example: Task categories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskCategory'
 */
router.get('/', async (req, res, next) => {
    try {
        const categories = await getAllTaskCategories();
        res.status(200).json({
            success: true,
            message: 'Task categories fetched successfully',
            data: categories,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /task-categories/{id}:
 *   get:
 *     summary: Retorna uma categoria de tarefa pelo ID
 *     description: Este endpoint retorna uma categoria de tarefa específica com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria de tarefa
 *     responses:
 *       200:
 *         description: Sucesso ao obter a categoria de tarefa
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
 *                   example: Task category fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/TaskCategory'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await taskCategoryIdSchema.validateAsync(req.params);
        const category = await getTaskCategoryById({ id });
        res.status(200).json({
            success: true,
            message: 'Task category fetched successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /task-categories:
 *   post:
 *     summary: Cria uma nova categoria de tarefa
 *     description: Este endpoint cria uma nova categoria de tarefa no sistema.
 *     requestBody:
 *       description: Dados da categoria de tarefa a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCategory'
 *     responses:
 *       201:
 *         description: Categoria de tarefa criada com sucesso
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
 *                   example: Task category created successfully
 *                 data:
 *                   $ref: '#/components/schemas/TaskCategory'
 */
router.post('/', async (req, res, next) => {
    try {
        const { description } = await taskCategorySchema.validateAsync(req.body);
        const category = await createTaskCategory({ description });
        res.status(201).json({
            success: true,
            message: 'Task category created successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /task-categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria de tarefa existente
 *     description: Este endpoint permite atualizar os detalhes de uma categoria de tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria de tarefa a ser atualizada
 *     requestBody:
 *       description: Dados atualizados da categoria de tarefa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCategory'
 *     responses:
 *       200:
 *         description: Categoria de tarefa atualizada com sucesso
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
 *                   example: Task category updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/TaskCategory'
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await taskCategoryIdSchema.validateAsync(req.params);
        const { description } = await updateTaskCategorySchema.validateAsync(req.body);
        const category = await updateTaskCategory({ id, description });
        res.status(200).json({
            success: true,
            message: 'Task category updated successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /task-categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria de tarefa
 *     description: Este endpoint remove uma categoria de tarefa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria de tarefa a ser excluída
 *     responses:
 *       200:
 *         description: Categoria de tarefa deletada com sucesso
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
 *                   example: Task category deleted successfully
 *                 data:
 *                   type: object
 *                   description: Confirmação da exclusão
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await taskCategoryIdSchema.validateAsync(req.params);
        const result = await deleteTaskCategory({ id });
        res.status(200).json({
            success: true,
            message: 'Task category deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
