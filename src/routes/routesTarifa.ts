import { Router } from 'express';
import { 
    getAllTarifas, 
    getTarifaById, 
    createTarifa, 
    updateTarifa, 
    deleteTarifa,
    getVehiculoByTarifa,
    getCargaByTarifa,
    getTipoCargaByTarifa,
    getZonaByTarifa,
    getTransportistaByTarifa,
    getAdicionalesByTarifa 
} from '../controllers/controllerTarifa';


const router = Router();

router.get('/', getAllTarifas);
/**
 * @swagger
 * /tarifas:
 *   get:
 *     summary: Obtener todas las tarifas
 *     tags: [Tarifas]
 *     responses:
 *       200:
 *         description: Lista de tarifas
 */

router.get("/:id", getTarifaById);
/**
 * @swagger
 * /tarifas/{id}:
 *   get:
 *     summary: Obtener una tarifa por ID
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarifa encontrada
 *       404:
 *         description: Tarifa no encontrada
 */

router.post('/', createTarifa);
/**
 * @swagger
 * /tarifas:
 *   post:
 *     summary: Crear una nueva tarifa
 *     tags: [Tarifas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor_base:
 *                 type: number
 *               fecha:
 *                 type: date
 *               id_vehiculo:
 *                 type: integer
 *               id_carga:
 *                 type: integer
 *               id_zona:
 *                 type: integer
 *               id_transportista:
 *                 type: integer
 *               adicionales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_adicional:
 *                       type: integer
 *                     costo_personalizado:
 *                       type: number
 *           example:
 *             valor_base: 1000
 *             fecha: "2025-01-01"
 *             id_vehiculo: 1
 *             id_carga: 1
 *             id_zona: 1
 *             id_transportista: 1
 *             adicionales: 
 *               - id_adicional: 1
 *                 costo_personalizado: 200
 *               - id_adicional: 2
 *     responses:
 *       201:
 *         description: Tarifa creada
 *       400:
 *         description: Datos inválidos o faltantes
 */

router.put("/:id", updateTarifa);
/**
 * @swagger
 * /tarifas/{id}:
 *   put:
 *     summary: Actualizar una tarifa existente
 *     tags: [Tarifas]
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
 *             properties:
 *               valor_base:
 *                 type: number
 *               fecha:
 *                 type: string
 *                 format: date
 *               id_vehiculo:
 *                 type: integer
 *               id_carga:
 *                 type: integer
 *               id_zona:
 *                 type: integer
 *               id_transportista:
 *                 type: integer
 *               adicionales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_adicional:
 *                       type: integer
 *                     costo_personalizado:
 *                       type: number
 *           example:
 *             valor_base: 1000
 *             fecha: "2025-01-01"
 *             id_vehiculo: 1
 *             id_carga: 1
 *             id_zona: 1
 *             id_transportista: 1
 *             adicionales: 
 *               - id_adicional: 1
 *                 costo_personalizado: 200
 *               - id_adicional: 2 
 *     responses:
 *       200:
 *         description: Tarifa actualizada
 *       404:
 *         description: Tarifa no encontrada
 */

router.delete("/:id", deleteTarifa);
/**
 * @swagger
 * /tarifas/{id}:
 *   delete:
 *     summary: Eliminar una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarifa eliminada exitosamente
 *       404:
 *         description: Tarifa no encontrada
 */


router.get("/:id/vehiculo", getVehiculoByTarifa);
/**
 * @swagger
 * /tarifas/{id}/vehiculo:
 *   get:
 *     summary: Obtener el vehículo asociado a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del vehículo asociado a la tarifa
 *       404:
 *         description: Vehículo no encontrado en la tarifa
 */

router.get("/:id/carga", getCargaByTarifa);
/**
 * @swagger
 * /tarifas/{id}/carga:
 *   get:
 *     summary: Obtener la carga asociada a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la carga asociada a la tarifa
 *       404:
 *         description: Carga no encontrada en la tarifa
 */

router.get("/:id/tipoCarga", getTipoCargaByTarifa);
/**
 * @swagger
 * /tarifas/{id}/tipoCarga:
 *   get:
 *     summary: Obtener el tipo de carga asociado a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del tipo de carga asociado a la tarifa
 *       404:
 *         description: Tipo de carga no encontrado en la tarifa
 */

router.get("/:id/zona", getZonaByTarifa);
/**
 * @swagger
 * /tarifas/{id}/zona:
 *   get:
 *     summary: Obtener la zona asociada a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la zona asociada a la tarifa
 *       404:
 *         description: Zona no encontrada en la tarifa
 */

router.get("/:id/transportista", getTransportistaByTarifa);
/**
 * @swagger
 * /tarifas/{id}/transportista:
 *   get:
 *     summary: Obtener el transportista asociado a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del transportista asociado a la tarifa
 *       404:
 *         description: Transportista no encontrado en la tarifa
 */

router.get("/:id/adicionales", getAdicionalesByTarifa);
/**
 * @swagger
 * /tarifas/{id}/adicionales:
 *   get:
 *     summary: Obtener los adicionales asociados a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de los adicionales asociados a la tarifa
 *       404:
 *         description: No se encontraron adicionales en la tarifa
 */


export default router;