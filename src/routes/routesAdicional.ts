import express from 'express';
import { getAllAdicionales, getAdicionalById, createAdicional, updateAdicional, deleteAdicional } from '../controllers/controllerAdicional';

const router = express.Router();

router.get('/', getAllAdicionales);
/**
 * @swagger
 * /adicionales:
 *   get:
 *     summary: Obtener todos los adicionales
 *     tags: [Adicionales]
 *     responses:
 *       200:
 *         description: Lista de adicionales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */

router.get("/:id", getAdicionalById);
/**
 * @swagger
 * /adicionales/{id}:
 *   get:
 *     summary: Obtener un adicional por ID
 *     tags: [Adicionales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del adicional
 *     responses:
 *       200:
 *         description: Adicional encontrado
 *       404:
 *         description: Adicional no encontrado
 */

router.post("/", createAdicional);
/**
 * @swagger
 * /adicionales:
 *   post:
 *     summary: Crear un nuevo adicional
 *     tags: [Adicionales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - costo_default
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Ayudante"
 *               costo_default:
 *                 type: number
 *                 example: 8000
 *     responses:
 *       201:
 *         description: Adicional creado exitosamente
 *       400:
 *         description: Error al crear el adicional
 */

router.put("/:id", updateAdicional);
/**
 * @swagger
 * /adicionales/{id}:
 *   put:
 *     summary: Actualizar un adicional existente
 *     tags: [Adicionales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - costo_default
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Ayudante"
 *               costo_default:
 *                 type: number
 *                 example: 7000
 *     responses:
 *       200:
 *         description: Adicional actualizado
 *       404:
 *         description: Adicional no encontrado
 */

router.delete("/:id", deleteAdicional);
/**
 * @swagger
 * /adicionales/{id}:
 *   delete:
 *     summary: Eliminar un adicional
 *     tags: [Adicionales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adicional eliminado exitosamente
 *       404:
 *         description: Adicional no encontrado
 */

export default router;