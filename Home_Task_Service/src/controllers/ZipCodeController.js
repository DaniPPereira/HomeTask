'use strict';
/**
 * @swagger
 * components:
 *   schemas:
 *     ZipCode:
 *       type: object
 *       required:
 *         - id
 *         - code
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do código postal
 *           example: 1
 *         code:
 *           type: string
 *           description: Código do código postal
 *           example: "12345-678"
 */

const express = require('express');
const { getZipCodes } = require('../usecases/Zipcode');
const router = express.Router();


/**
 * @swagger
 * /zipCodes:
 *   get:
 *     summary: Retorna todos os códigos postais
 *     description: Este endpoint retorna todos os códigos postais cadastrados na base de dados.
 *     responses:
 *       200:
 *         description: Sucesso ao obter todos os códigos postais
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
 *                   example: Zip codes fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ZipCode'
 */
router.get('/', async (req, res, next) => {
    try {
        const zipCodes = await getZipCodes();
        res.status(200).json({
            success: true,
            message: 'Zip codes fetched successfully',
            data: zipCodes,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
