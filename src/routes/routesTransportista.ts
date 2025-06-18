import express from 'express';
import {
  getAllTransportistas,
  getTransportistaById,
  createTransportista,
  updateTransportista,
  deleteTransportista,
} from '../controllers/controllerTransportista';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { transportistaSchema } from '../validations/transportista.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllTransportistas);
/**
 * @swagger
 * /transportistas:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Transportistas]
 *     responses:
 *       200:
 *         description: Lista de transportistas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validateParams(idParamSchema), getTransportistaById);
/**
 * @swagger
 * /transportistas/{id}:
 *   get:
 *     summary: Obtener un transportista por ID
 *     tags: [Transportistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del transportista
 *     responses:
 *       200:
 *         description: Transportista encontrado
 *       404:
 *         description: Transportista no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', validate(transportistaSchema), createTransportista);
/**
 * @swagger
 * /transportistas:
 *   post:
 *     summary: Crear un nuevo transportista
 *     tags: [Transportistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Transportes Express"
 *               telefono:
 *                 type: string
 *                 example: "11-1234-5678"
 *               email:
 *                 type: string
 *                 example: "transportesexpress@gmail.com"
 *     responses:
 *       201:
 *         description: Transportista creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(transportistaSchema),
  updateTransportista
);
/**
 * @swagger
 * /transportistas/{id}:
 *   put:
 *     summary: Actualizar un transportista existente
 *     tags: [Transportistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del transportista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Transportes Express"
 *               telefono:
 *                 type: string
 *                 example: "11-1234-5678"
 *               email:
 *                 type: string
 *                 example: "transportesexpress@gmail.com"
 *     responses:
 *       200:
 *         description: Transportista actualizado
 *       404:
 *         description: Transportista no encontrado
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', validateParams(idParamSchema), deleteTransportista);
/**
 * @swagger
 * /transportistas/{id}:
 *   delete:
 *     summary: Eliminar un transportista
 *     tags: [Transportistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del transportista
 *     responses:
 *       200:
 *         description: Transportista eliminado exitosamente
 *       404:
 *         description: Transportista no encontrado
 *       400:
 *         description: ID inválido
 *       409:
 *         description: No se puede eliminar porque está asociado a una tarifa
 *       500:
 *         description: Error interno del servidor
 */

export default router;