'use strict';

const express = require('express');
const Joi = require('joi');
const {
    createResident,
    getAllResidents,
    deleteResident,
} = require('../usecases/Residents');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Resident:
 *       type: object
 *       required:
 *         - homeId
 *         - userId
 *       properties:
 *         homeId:
 *           type: integer
 *           description: ID da casa onde o residente mora
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID do usuário residente
 *           example: 2
 *     ResidentId:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID do usuário residente
 *           example: 2
 *     HomeId:
 *       type: object
 *       required:
 *         - homeId
 *       properties:
 *         homeId:
 *           type: integer
 *           description: ID da casa onde o residente mora
 *           example: 1
 */
const residentSchema = Joi.object({
    homeId: Joi.number().required(),
    userId: Joi.number().required(),
});

const residentIdSchema = Joi.object({
    userId: Joi.number().required()
});

const homeIdSchema = Joi.object({
    homeId: Joi.number().required(),
});


/**
 * @swagger
 * /residents:
 *   get:
 *     summary: Retorna todos os residentes
 *     description: Este endpoint retorna uma lista de todos os residentes cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Sucesso ao obter todos os residentes
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
 *                   example: Residents fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resident'
 */
router.get('/', async (req, res, next) => {
    try {
        const residents = await getAllResidents();
        res.status(200).json({
            success: true,
            message: 'Residents fetched successfully',
            data: residents,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /residents:
 *   post:
 *     summary: Cria um novo residente
 *     description: Este endpoint cria um novo residente e o associa a uma casa específica.
 *     requestBody:
 *       description: Dados do residente a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resident'
 *     responses:
 *       201:
 *         description: Residente criado com sucesso
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
 *                   example: Resident created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Resident'
 */
router.post('/', async (req, res, next) => {
    try {
        const { userId, homeId} = await residentSchema.validateAsync(req.body);
        const resident = await createResident({ userId, homeId });
        res.status(201).json({
            success: true,
            message: 'Resident created successfully',
            data: resident,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /residents/{homeId}/{userId}:
 *   delete:
 *     summary: Deleta um residente de uma casa
 *     description: Este endpoint remove um residente de uma casa com base nos IDs do residente e da casa.
 *     parameters:
 *       - in: path
 *         name: homeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da casa
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário (residente) a ser removido
 *     responses:
 *       200:
 *         description: Residente removido com sucesso
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
 *                   example: Resident deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     homeId:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 2
 */
router.delete('/:homeId/:userId', async (req, res, next) => {
    try {
        const { homeId, userId } = await residentSchema.validateAsync(req.params);
        const result = await deleteResident( homeId, userId);
        res.status(200).json({
            success: true,
            message: 'Resident deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
