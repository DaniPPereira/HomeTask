'use strict';

const express = require('express');
const Joi = require('joi');
const {
    createTaskParticipant,
    deleteTaskParticipant,
    getTaskParticipantsByTaskId,
    getTaskParticipantsByUserId,
} = require('../usecases/TaskParticipants');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskParticipant:
 *       type: object
 *       required:
 *         - taskId
 *         - userId
 *       properties:
 *         taskId:
 *           type: integer
 *           description: ID da tarefa
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID do usuário
 *           example: 2
 *     TaskParticipantId:
 *       type: object
 *       required:
 *         - taskId
 *         - userId
 *       properties:
 *         taskId:
 *           type: integer
 *           description: ID da tarefa
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID do participante
 *           example: 2
 *     TaskParticipantByTaskId:
 *       type: object
 *       required:
 *         - taskId
 *       properties:
 *         taskId:
 *           type: integer
 *           description: ID da tarefa
 *           example: 1
 *     TaskParticipantByUserId:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID do participante
 *           example: 2
 */
const taskParticipantSchema = Joi.object({
    taskId: Joi.number().required(),
    userId: Joi.number().required(),
});

const taskParticipantIdSchema = Joi.object({
    taskId: Joi.number().required(),
    userId: Joi.number().required(),
});

const taskParticipantIdUserchema = Joi.object({
    userId: Joi.number().required(),
});

const taskParticipantIdTaskchema = Joi.object({
    taskId: Joi.number().required(),
});


/**
 * @swagger
 * /taskParticipants/task/{taskId}:
 *   get:
 *     summary: Retorna participantes de uma tarefa específica
 *     description: Este endpoint retorna todos os participantes de uma tarefa com base no ID da tarefa fornecido.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Sucesso ao obter participantes da tarefa
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
 *                   example: Task participants fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskParticipant'
 */
router.get('/task/:taskId', async (req, res, next) => {
    try {
        const { taskId } = await taskParticipantIdTaskchema.validateAsync(req.params);
        const participants = await getTaskParticipantsByTaskId({ taskId });
        res.status(200).json({
            success: true,
            message: 'Task participants fetched successfully',
            data: participants,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /taskParticipants/user/{userId}:
 *   get:
 *     summary: Retorna tarefas de um participante específico
 *     description: Este endpoint retorna todas as tarefas em que um usuário específico está participando.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Sucesso ao obter tarefas para o participante
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
 *                   example: Tasks for participant fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskParticipant'
 */
router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = await taskParticipantIdUserchema.validateAsync(req.params);
        const participants = await getTaskParticipantsByUserId({ userId });
        res.status(200).json({
            success: true,
            message: 'Tasks for participant fetched successfully',
            data: participants,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /taskParticipants:
 *   post:
 *     summary: Adiciona um participante a uma tarefa
 *     description: Este endpoint adiciona um usuário como participante de uma tarefa.
 *     requestBody:
 *       description: Dados para adicionar um participante à tarefa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskParticipant'
 *     responses:
 *       201:
 *         description: Participante adicionado com sucesso
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
 *                   example: Task participant added successfully
 *                 data:
 *                   $ref: '#/components/schemas/TaskParticipant'
 */
router.post('/', async (req, res, next) => {
    try {
        const { taskId, userId } = await taskParticipantSchema.validateAsync(req.body);
        const participant = await createTaskParticipant({ taskId, userId });
        res.status(201).json({
            success: true,
            message: 'Task participant added successfully',
            data: participant,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /taskParticipants/{taskId}/{userId}:
 *   delete:
 *     summary: Remove um participante de uma tarefa
 *     description: Este endpoint remove um participante de uma tarefa com base nos IDs da tarefa e do usuário.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante removido com sucesso
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
 *                   example: Task participant removed successfully
 *                 data:
 *                   type: object
 *                   description: Confirmação da remoção do participante
 */
router.delete('/:taskId/:userId', async (req, res, next) => {
    try {
        const { taskId, userId } = await taskParticipantIdSchema.validateAsync(req.params);
        const result = await deleteTaskParticipant({ taskId, userId });
        res.status(200).json({
            success: true,
            message: 'Task participant removed successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
