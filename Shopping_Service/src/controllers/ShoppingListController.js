'use strict';
/**
 * @swagger
 * tags:
 *   name: ShoppingList
 *   description: Gerir listas de compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       required:
 *         - title
 *         - homeId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da lista de compras
 *         title:
 *           type: string
 *           description: Título da lista de compras
 *         homeId:
 *           type: integer
 *           description: ID da casa associada à lista
 */

const express = require('express');
const Joi = require('joi');
const {
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
    getShoppingListById,
    getShoppingListsByHouseId,
} = require('../usecases/shoppingList');
const router = express.Router();

// Validações com Joi
const shoppingListSchema = Joi.object({
    title: Joi.string().required(),
    homeId: Joi.number().required(),
});

const updateShoppingListSchema = Joi.object({
    title: Joi.string().required(),
});

const shoppingListIdSchema = Joi.object({
    id: Joi.number().required(),
});

const shoppingListHouseIdSchema = Joi.object({
    homeId: Joi.number().required(),
});

/**
 * @swagger
 * /shopping-lists/home/{homeId}:
 *   get:
 *     summary: Retorna todas as listas de compras associadas a uma casa específica
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: homeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da casa
 *     responses:
 *       200:
 *         description: Listas de compras associadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingList'
 *       404:
 *         description: Casa não encontrada
 */
router.get('/home/:homeId', async (req, res, next) => {
    try {
        const { homeId } = await shoppingListHouseIdSchema.validateAsync(req.params);
        console.log(homeId);
        const list = await getShoppingListsByHouseId({ homeId });
        
        res.status(200).json({
            success: true,
            message: 'Shopping Lists fetched successfully',
            data: list,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /shopping-lists/{id}:
 *   get:
 *     summary: Retorna uma lista de compras pelo ID
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da lista de compras
 *     responses:
 *       200:
 *         description: Detalhes da lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       404:
 *         description: Lista de compras não encontrada
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingListIdSchema.validateAsync(req.params);
        console.log(id);
        const list = await getShoppingListById({ id });
        res.status(200).json({
            success: true,
            message: 'Shopping List fetched successfully',
            data: list,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /shopping-lists:
 *   post:
 *     summary: Cria uma nova lista de compras
 *     tags: [ShoppingList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       201:
 *         description: Lista de compras criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post('/', async (req, res, next) => {
    try {
        const { title, homeId } = await shoppingListSchema.validateAsync(req.body);
        const result = await createShoppingList({ title, homeId });
        res.status(201).json({
            success: true,
            message: 'Shopping List created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /shopping-lists/{id}:
 *   put:
 *     summary: Atualiza uma lista de compras pelo ID
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da lista de compras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Novo título da lista
 *     responses:
 *       200:
 *         description: Lista de compras atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       400:
 *         description: Dados inválidos fornecidos ou ID inválido
 *       404:
 *         description: Lista de compras não encontrada
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingListIdSchema.validateAsync(req.params);
        const { title } = await updateShoppingListSchema.validateAsync(req.body);
        const result = await updateShoppingList({ id, title });
        res.status(200).json({
            success: true,
            message: 'Shopping List updated successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /shopping-lists/{id}:
 *   delete:
 *     summary: Exclui uma lista de compras pelo ID
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da lista de compras
 *     responses:
 *       200:
 *         description: Lista de compras excluída com sucesso
 *       404:
 *         description: Lista de compras não encontrada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingListIdSchema.validateAsync(req.params);
        const result = await deleteShoppingList({ id });
        res.status(200).json({
            success: true,
            message: 'Shopping List deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
