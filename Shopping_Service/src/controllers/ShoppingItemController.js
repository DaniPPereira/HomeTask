'use strict';
/**
 * @swagger
 * tags:
 *   name: ShoppingItem
 *   description: Gerir os itens de uma lista de compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingItem:
 *       type: object
 *       required:
 *         - description
 *         - quantity
 *         - shoppingListId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do item de compras
 *         description:
 *           type: string
 *           description: Descrição do item de compras
 *         quantity:
 *           type: number
 *           description: Quantidade do item
 *         state:
 *           type: string
 *           description: Estado do item (opcional)
 *         price:
 *           type: number
 *           description: Preço do item (opcional)
 *         shoppingListId:
 *           type: integer
 *           description: ID da lista de compras associada
 *         itemCategoryId:
 *           type: integer
 *           description: ID da categoria do item
 */

const express = require('express');
const Joi = require('joi');
const {
    createShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    getShoppingItemById,
    getItemsByShoppingListId,
} = require('../usecases/shoppingItem');
const router = express.Router();

// Validações com Joi
const shoppingItemSchema = Joi.object({
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    state: Joi.string().optional(),
    price: Joi.number().optional(),
    shoppingListId: Joi.number().required(),
    itemCategoryId: Joi.number().required(),
});

const updateShoppingItemSchema = Joi.object({
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    state: Joi.string().optional(),
    price: Joi.number().optional(),
    shoppingListId: Joi.number().required(),
    itemCategoryId: Joi.number().optional(),
});

const shoppingItemIdSchema = Joi.object({
    id: Joi.number().required(),
});

/**
 * @swagger
 * /shopping-items/list/{shoppingListId}:
 *   get:
 *     summary: Retorna todos os itens de compras de uma lista específica
 *     tags: [ShoppingItem]
 *     parameters:
 *       - in: path
 *         name: shoppingListId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da lista de compras
 *     responses:
 *       200:
 *         description: Lista de itens de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingItem'
 *       404:
 *         description: Lista de compras não encontrada
 */
router.get('/list/:shoppingListId', async (req, res, next) => {
    try {
        const { shoppingListId } = req.params;
        const items = await getItemsByShoppingListId({ shoppingListId });
        res.status(200).json({
            success: true,
            message: 'Shopping items fetched successfully',
            data: items,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /shopping-items/{id}:
 *   get:
 *     summary: Retorna um item de compras pelo ID
 *     tags: [ShoppingItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de compras
 *     responses:
 *       200:
 *         description: Detalhes do item de compras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingItem'
 *       404:
 *         description: Item de compras não encontrado
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingItemIdSchema.validateAsync(req.params);
        const item = await getShoppingItemById({ id });
        res.status(200).json({
            success: true,
            message: 'Shopping item fetched successfully',
            data: item,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /shopping-items:
 *   post:
 *     summary: Cria um novo item de compras
 *     tags: [ShoppingItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingItem'
 *     responses:
 *       201:
 *         description: Item de compras criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingItem'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post('/', async (req, res, next) => {
    try {
        const { description, quantity, shoppingListId, itemCategoryId, state, price } = await shoppingItemSchema.validateAsync(req.body);

        const item = await createShoppingItem({ description, quantity, shoppingListId, itemCategoryId, state, price });

        res.status(201).json({
            success: true,
            message: 'Shopping item created successfully',
            data: item,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /shopping-items/{id}:
 *   put:
 *     summary: Atualiza um item de compras pelo ID
 *     tags: [ShoppingItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de compras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingItem'
 *     responses:
 *       200:
 *         description: Item de compras atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingItem'
 *       400:
 *         description: Dados inválidos fornecidos ou ID inválido
 *       404:
 *         description: Item de compras não encontrado
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingItemIdSchema.validateAsync(req.params);
        const updates = await updateShoppingItemSchema.validateAsync(req.body);
        const item = await updateShoppingItem({ id, updates });
        res.status(200).json({
            success: true,
            message: 'Shopping item updated successfully',
            data: item,
        });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ success: false, message: err.details[0].message });
        }
        next(err);
    }
});

/**
 * @swagger
 * /shopping-items/{id}:
 *   delete:
 *     summary: Exclui um item de compras pelo ID
 *     tags: [ShoppingItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de compras
 *     responses:
 *       200:
 *         description: Item de compras excluído com sucesso
 *       404:
 *         description: Item de compras não encontrado
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await shoppingItemIdSchema.validateAsync(req.params);
        const result = await deleteShoppingItem({ id });
        res.status(200).json({
            success: true,
            message: 'Shopping item deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
