'use strict';
/**
 * @swagger
 * tags:
 *   name: ItemCategory
 *   description: Gerir as categorias de itens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCategory:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da categoria de item
 *         description:
 *           type: string
 *           description: Descrição da categoria de item
 */

const express = require('express');
const Joi = require('joi');
const {
    createItemCategory,
    updateItemCategory,
    deleteItemCategory,
    getItemCategoryById,
    getAllItemCategories,
} = require('../usecases/itemCategory');
const router = express.Router();

// Validações com Joi
const itemCategorySchema = Joi.object({
    description: Joi.string().required(),
});

const updateItemCategorySchema = Joi.object({
    description: Joi.string().required(),
});

const itemCategoryIdSchema = Joi.object({
    id: Joi.number().required(),
});


/**
 * @swagger
 * /item-categories:
 *   get:
 *     summary: Retorna todas as categorias de itens
 *     tags: [ItemCategory]
 *     responses:
 *       200:
 *         description: Lista de categorias de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemCategory'
 */
router.get('/', async (req, res, next) => {
    try {
        const categories = await getAllItemCategories();
        res.status(200).json({
            success: true,
            message: 'Item categories fetched successfully',
            data: categories,
        });
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /item-categories/{id}:
 *   get:
 *     summary: Retorna uma categoria de item pelo ID
 *     tags: [ItemCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria de item
 *     responses:
 *       200:
 *         description: Detalhes da categoria de item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCategory'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Categoria de item não encontrada
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = await itemCategoryIdSchema.validateAsync(req.params);
        const category = await getItemCategoryById({ id });
        res.status(200).json({
            success: true,
            message: 'Item category fetched successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /item-categories:
 *   post:
 *     summary: Cria uma nova categoria de item
 *     tags: [ItemCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCategory'
 *     responses:
 *       201:
 *         description: Categoria de item criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCategory'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post('/', async (req, res, next) => {
    try {
        const { description } = await itemCategorySchema.validateAsync(req.body);
        const category = await createItemCategory({ description });
        res.status(201).json({
            success: true,
            message: 'Item category created successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /item-categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria de item pelo ID
 *     tags: [ItemCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria de item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCategory'
 *     responses:
 *       200:
 *         description: Categoria de item atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCategory'
 *       400:
 *         description: Dados inválidos fornecidos ou ID inválido
 *       404:
 *         description: Categoria de item não encontrada
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = await itemCategoryIdSchema.validateAsync(req.params);
        const { description } = await updateItemCategorySchema.validateAsync(req.body);
        const category = await updateItemCategory({ id, description });
        res.status(200).json({
            success: true,
            message: 'Item category updated successfully',
            data: category,
        });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /item-categories/{id}:
 *   delete:
 *     summary: Exclui uma categoria de item pelo ID
 *     tags: [ItemCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria de item
 *     responses:
 *       200:
 *         description: Categoria de item excluída com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Categoria de item não encontrada
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await itemCategoryIdSchema.validateAsync(req.params);
        const result = await deleteItemCategory({ id });
        res.status(200).json({
            success: true,
            message: 'Item category deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
