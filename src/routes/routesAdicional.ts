import express from 'express';
import {
  getAllAdicionales,
  getAdicionalById,
  createAdicional,
  updateAdicional,
  deleteAdicional,
} from '../controllers/controllerAdicional';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { adicionalSchema } from '../validations/adicional.validation';
import { idParamSchema } from '../validations/comun.validation';

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
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validateParams(idParamSchema), getAdicionalById);
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
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', validate(adicionalSchema), createAdicional);
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
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(adicionalSchema), 
  updateAdicional
);
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
 *         description: ID del adicional
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
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', validateParams(idParamSchema), deleteAdicional);
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
 *         description: ID del adicional
 *     responses:
 *       200:
 *         description: Adicional eliminado exitosamente
 *       404:
 *         description: Adicional no encontrado
 *       400:
 *         description: ID inválido
 *       409:
 *         description: No se puede eliminar porque está asociado a una tarifa
 *       500:
 *         description: Error interno del servidor
 */

export default router;