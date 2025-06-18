import express from 'express';
import {
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from '../controllers/controllerVehiculo';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { vehiculoSchema } from '../validations/vehiculo.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllVehiculos);
/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: Obtener todos los tipos de vehículo
 *     tags: [Tipos de vehículo]
 *     responses:
 *       200:
 *         description: Lista de tipos de vehículo
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', validateParams(idParamSchema), getVehiculoById);
/**
 * @swagger
 * /vehiculos/{id}:
 *   get:
 *     summary: Obtener un tipo de vehículo por ID
 *     tags: [Tipos de vehículo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de vehículo
 *     responses:
 *       200:
 *         description: Tipo de vehículo encontrado
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', validate(vehiculoSchema), createVehiculo);
/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: Crear un nuevo tipo de vehículo
 *     tags: [Tipos de vehículo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - toneladas
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Camión"
 *               toneladas:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Tipo de vehículo creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(vehiculoSchema),
  updateVehiculo
);
/**
 * @swagger
 * /vehiculos/{id}:
 *   put:
 *     summary: Actualizar un tipo de vehículo existente
 *     tags: [Tipos de vehículo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - toneladas
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Camión"
 *               toneladas:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Tipo de vehículo actualizado
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', validateParams(idParamSchema), deleteVehiculo);
/**
 * @swagger
 * /vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un tipo de vehículo
 *     tags: [Tipos de vehículo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Tipo de vehículo eliminado exitosamente
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       400:
 *         description: ID inválido
 *       409:
 *         description: No se puede eliminar porque está asociado a una tarifa
 *       500:
 *         description: Error interno del servidor
 */

export default router;