import express from 'express';
import {
  getAllTiposCarga,
  getTipoCargaById,
  createTipoCarga,
  updateTipoCarga,
  deleteTipoCarga,
} from '../controllers/controllerTipoCarga';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { tipoCargaSchema } from '../validations/tipoCarga.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllTiposCarga);
/**
 * @swagger
 * /tipocargas:
 *   get:
 *     summary: Obtener todos los tipos de carga
 *     tags: [TiposCarga]
 *     responses:
 *       200:
 *         description: Lista de tipos de carga
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validateParams(idParamSchema), getTipoCargaById);
/**
 * @swagger
 * /tipocargas/{id}:
 *   get:
 *     summary: Obtener un tipo de carga por ID
 *     tags: [TiposCarga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de carga
 *     responses:
 *       200:
 *         description: Tipo de carga encontrado
 *       404:
 *         description: Tipo de carga no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', validate(tipoCargaSchema), createTipoCarga);
/**
 * @swagger
 * /tipocargas:
 *   post:
 *     summary: Crear un nuevo tipo de carga
 *     tags: [TiposCarga]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descripcion
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Carga refrigerada"
 *     responses:
 *       201:
 *         description: Tipo de carga creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(tipoCargaSchema),
  updateTipoCarga
);
/**
 * @swagger
 * /tipocargas/{id}:
 *   put:
 *     summary: Actualizar un tipo de carga existente
 *     tags: [TiposCarga]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de carga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descripcion
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Carga refrigerada"
 *     responses:
 *       200:
 *         description: Tipo de carga actualizado
 *       404:
 *         description: Tipo de carga no encontrado
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', validateParams(idParamSchema), deleteTipoCarga);
/**
 * @swagger
 * /tipocargas/{id}:
 *   delete:
 *     summary: Eliminar un tipo de carga
 *     tags: [TiposCarga]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de carga
 *     responses:
 *       200:
 *         description: Tipo de carga eliminado exitosamente
 *       404:
 *         description: Tipo de carga no encontrado
 *       400:
 *         description: ID inválido
 *       409:
 *         description: No se puede eliminar porque está asociado a una carga
 *       500:
 *         description: Error interno del servidor
 */

export default router;