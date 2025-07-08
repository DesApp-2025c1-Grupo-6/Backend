import { Router } from "express";
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
  getAdicionalesByTarifa,
  getHistoricoTarifa,
  getUltimoHistoricoTarifa,
  getUltimoHistoricoDeTodasLasTarifas,
  getHistoricoById,
  getDataDashboard,
} from "../controllers/controllerTarifa";
import { validate, validateParams } from "../middlewares/validate.middlewares";
import { tarifaSchema } from "../validations/tarifa.validation";
import { idParamSchema } from "../validations/comun.validation";

const router = Router();

router.get("/", getAllTarifas);
/**
 * @swagger
 * /tarifas:
 *   get:
 *     summary: Obtener todas las tarifas
 *     tags: [Tarifas]
 *     responses:
 *       200:
 *         description: Lista de tarifas
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", validateParams(idParamSchema), getTarifaById);
/**
 * @swagger
 * /tarifas/{id}:
 *   get:
 *     summary: Obtener una tarifa por ID
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Tarifa encontrada
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", validate(tarifaSchema), createTarifa);
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
 *             required:
 *               - valor_base
 *               - fecha
 *               - id_vehiculo
 *               - id_carga
 *               - id_zona
 *               - id_transportista
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
 *         description: Tarifa creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(tarifaSchema),
  updateTarifa
);
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
 *         description: ID de la tarifa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - valor_base
 *               - fecha
 *               - id_vehiculo
 *               - id_carga
 *               - id_zona
 *               - id_transportista
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
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:id", validateParams(idParamSchema), deleteTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Tarifa eliminada exitosamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */


router.get("/:id/vehiculo", validateParams(idParamSchema), getVehiculoByTarifa);
/**
 * @swagger
 * /tarifas/{id}/vehiculo:
 *   get:
 *     summary: Obtener el tipo de vehículo asociado a una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Tipo de vehículo recuperado correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/carga", validateParams(idParamSchema), getCargaByTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Carga recuperada correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/tipoCarga", validateParams(idParamSchema), getTipoCargaByTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Tipo de carga recuperado correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/zona", validateParams(idParamSchema), getZonaByTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Zona recuperada correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/transportista", validateParams(idParamSchema), getTransportistaByTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Transportista recuperado correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/adicionales", validateParams(idParamSchema), getAdicionalesByTarifa);
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
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Adicionales recuperados correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */


router.get("/:id/historico", getHistoricoTarifa);
/**
 * @swagger
 * /tarifas/{id}/historico:
 *   get:
 *     summary: Obtener el histórico completo de una tarifa
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Histórico recuperado correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id/historico/ultimo", getUltimoHistoricoTarifa); //---Este no se usa
/**
 * @swagger
 * /tarifas/{id}/historico/ultimo:
 *   get:
 *     summary: Obtener el último registro del histórico de una tarifa
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarifa
 *     responses:
 *       200:
 *         description: Histórico recuperado correctamente
 *       404:
 *         description: Tarifa no encontrada
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/historico/ultimos", getUltimoHistoricoDeTodasLasTarifas);
/**
 * @swagger
 * /tarifas/historico/ultimos:
 *   get:
 *     summary: Obtener el último registro del histórico de todas las tarifas
 *     tags: [Historico]
 *     responses:
 *       200:
 *         description: Históricos recuperados correctamente
 *       500:
 *         description: Error interno del servidor
 */

router.get("/historico/:id", getHistoricoById);
/**
 * @swagger
 * /tarifas/historico/{id}:
 *   get:
 *     summary: Obtener el histórico indicado
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del histórico
 *     responses:
 *       200:
 *         description: Histórico recuperado correctamente
 *       404:
 *         description: Histórico no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/dashboard/:id", getDataDashboard);
/**
 * @swagger
 * /tarifas/dashboard/{id}:
 *   get:
 *     summary: Obtener datos del dashboard de tarifas
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del dashboard
 *     responses:
 *       200:
 *         description: Datos del dashboard recuperados correctamente
 *       404:
 *         description: Dashboard no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

export default router;