import express from 'express';
import {
  getAllCargas,
  getCargaById,
  createCarga,
  updateCarga,
  deleteCarga,
  getTipoCargaByCargaId,
} from '../controllers/controllerCarga';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { cargaSchema } from '../validations/carga.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllCargas);
/**
 * @swagger
 * /cargas:
 *   get:
 *     summary: Obtener todas las cargas
 *     tags: [Cargas]
 *     responses:
 *       200:
 *         description: Lista de cargas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validateParams(idParamSchema), getCargaById);
/**
 * @swagger
 * /cargas/{id}:
 *   get:
 *     summary: Obtener una carga por ID
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carga
 *     responses:
 *       200:
 *         description: Carga encontrada
 *       404:
 *         description: Carga no encontrada
 *       400:
 *         description: ID inválido 
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id/tipo-carga', validateParams(idParamSchema), getTipoCargaByCargaId as express.RequestHandler);
/**
 * @swagger
 * /cargas/{id}/tipo-carga:
 *   get:
 *     summary: Obtener el tipo de carga asociado a una carga
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carga
 *     responses:
 *       200:
 *         description: Tipo de carga encontrado
 *       404:
 *         description: Carga no encontrada
 *       400:
 *         description: ID inválido 
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', validate(cargaSchema), createCarga);
/**
 * @swagger
 * /cargas:
 *   post:
 *     summary: Crear una nueva carga
 *     tags: [Cargas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - peso
 *               - volumen
 *               - requisitos_especiales
 *               - id_tipo_carga
 *             properties:
 *               peso:
 *                 type: number
 *                 example: 1200.5
 *               volumen:
 *                 type: number
 *                 example: 8.3
 *               requisitos_especiales:
 *                 type: string
 *                 example: "Requiere refrigeración"
 *               id_tipo_carga:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Carga creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(cargaSchema),
  updateCarga
);
/**
 * @swagger
 * /cargas/{id}:
 *   put:
 *     summary: Actualizar una carga existente
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - peso
 *               - volumen
 *               - requisitos_especiales
 *               - id_tipo_carga
 *             properties:
 *               peso:
 *                 type: number
 *                 example: 1200.5
 *               volumen:
 *                 type: number
 *                 example: 3.4
 *               requisitos_especiales:
 *                 type: string
 *                 example: "Manejo con cuidado extremo"
 *               id_tipo_carga:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Carga actualizada
 *       404:
 *         description: Carga no encontrada
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', validateParams(idParamSchema), deleteCarga);
/**
 * @swagger
 * /cargas/{id}:
 *   delete:
 *     summary: Eliminar una carga
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carga
 *     responses:
 *       200:
 *         description: Carga eliminada exitosamente
 *       404:
 *         description: Carga no encontrada
 *       400:
 *         description: ID inválido
 *       409:
 *         description: No se puede eliminar porque está asociado a una tarifa
 *       500:
 *         description: Error interno del servidor
 */

export default router;