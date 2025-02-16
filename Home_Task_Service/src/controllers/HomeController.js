'use strict';

const express = require('express');
const Joi = require('joi');
const {
    createHome,
    getAllHomes,
    getHomeById,
    updateHome,
    deleteHome,
} = require('../usecases/Home');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Home:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - zipCodeId
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da casa
 *           example: Casa Bonita
 *         address:
 *           type: string
 *           description: Endereço da casa
 *           example: Rua das Flores, 123
 *         zipCodeId:
 *           type: integer
 *           description: ID do código postal
 *           example: 12345
 *         userId:
 *           type: integer
 *           description: ID do usuário dono da casa
 *           example: 1
 *     HomeId:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da casa
 *           example: 1
 */
const homeSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    zipCodeId: Joi.number().required(),
    userId: Joi.number().required(),
});

const homeIdSchema = Joi.object({
    id: Joi.number().required(),
});



/**
 * @swagger
 * /homes:
 *   get:
 *     summary: Retorna todas as casas
 *     responses:
 *       200:
 *         description: Sucesso ao obter todas as casas
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
 *                   example: Homes fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Casa Bonita
 *                       address:
 *                         type: string
 *                         example: Rua das Flores, 123
 *                       zipCodeId:
 *                         type: integer
 *                         example: 12345
 *                       userId:
 *                         type: integer
 *                         example: 1
 */
router.get('/', async (req, res, next) => {
    try {
        const homes = await getAllHomes();
        res.status(200).json({
            success: true,
            message: 'Homes fetched successfully',
            data: homes,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /homes/{id}:
 *   get:
 *     summary: Retorna uma casa específica pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da casa
 *     responses:
 *       200:
 *         description: Sucesso ao obter a casa
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
 *                   example: Home fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Casa Bonita
 *                     address:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     zipCodeId:
 *                       type: integer
 *                       example: 12345
 *                     userId:
 *                       type: integer
 *                       example: 1
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await homeIdSchema.validateAsync(req.params);
        const home = await getHomeById(id );
        res.status(200).json({
            success: true,
            message: 'Home fetched successfully',
            data: home,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /homes:
 *   post:
 *     summary: Cria uma nova casa
 *     requestBody:
 *       description: Dados da nova casa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Casa Bonita
 *               address:
 *                 type: string
 *                 example: Rua das Flores, 123
 *               zipCodeId:
 *                 type: integer
 *                 example: 12345
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Casa criada com sucesso
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
 *                   example: Home created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Casa Bonita
 *                     address:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     zipCodeId:
 *                       type: integer
 *                       example: 12345
 *                     userId:
 *                       type: integer
 *                       example: 1
 */
router.post('/', async (req, res, next) => {
    try {
        const { name, address, zipCodeId, userId } = await homeSchema.validateAsync(req.body);
        const home = await createHome({ name, address, zipCodeId, userId });
        res.status(201).json({
            success: true,
            message: 'Home created successfully',
            data: home,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /homes/{id}:
 *   put:
 *     summary: Atualiza uma casa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da casa
 *     requestBody:
 *       description: Dados atualizados da casa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Casa Bonita
 *               address:
 *                 type: string
 *                 example: Rua das Flores, 123
 *               zipCodeId:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Casa atualizada com sucesso
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
 *                   example: Home updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Casa Bonita
 *                     address:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     zipCodeId:
 *                       type: integer
 *                       example: 12345
 *                     userId:
 *                       type: integer
 *                       example: 1
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await homeIdSchema.validateAsync(req.params);
        const { name, address, zipCodeId } = await homeSchema.validateAsync(req.body);
        const home = await updateHome({ id, name, address, zipCodeId });
        res.status(200).json({
            success: true,
            message: 'Home updated successfully',
            data: home,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /homes/{id}:
 *   delete:
 *     summary: Deleta uma casa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da casa
 *     responses:
 *       200:
 *         description: Casa deletada com sucesso
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
 *                   example: Home deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await homeIdSchema.validateAsync(req.params);
        const result = await deleteHome(id);
        res.status(200).json({
            success: true,
            message: 'Home deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
