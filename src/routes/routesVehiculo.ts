import express from 'express';
import {
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from '../controllers/controllerVehiculo';
import { validateParams } from '../middlewares/validate.middlewares';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllVehiculos);

router.get('/:id', validateParams(idParamSchema), getVehiculoById);
/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: Obtener todos los vehículos
 *     tags: [Vehículos]
 *     responses:
 *       200:
 *         description: Lista de vehículos
 */

router.get('/:id', validateParams(idParamSchema), getVehiculoById);
/**
 * @swagger
 * /vehiculos/{id}:
 *   get:
 *     summary: Obtener un vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *       404:
 *         description: Vehículo no encontrado
 */

router.post('/', validate(vehiculoSchema), createVehiculo);

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(vehiculoSchema),
  updateVehiculo
);

router.delete('/:id', validateParams(idParamSchema), deleteVehiculo);
router.post('/', createVehiculo);
/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "Camión"
 *               toneladas:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Vehículo creado
 *       500:
 *         description: Error al crear el vehículo
 */

router.put('/:id', validateParams(idParamSchema), updateVehiculo);
/**
 * @swagger
 * /vehiculos/{id}:
 *   put:
 *     summary: Actualizar un vehículo existente
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               toneladas:
 *                 type: integer
 *           example:
 *             tipo: "Camioneta"
 *             toneladas: 5
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *       404:
 *         description: Vehículo no encontrado
 */

router.delete('/:id', validateParams(idParamSchema), deleteVehiculo);
/**
 * @swagger
 * /vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 *       404:
 *         description: Vehículo no encontrado
 */

export default router;
