import express from "express";
import {
  getAllTiposCarga,
  getTipoCargaById,
  createTipoCarga,
  updateTipoCarga,
  deleteTipoCarga,
} from "../controllers/controllerTipoCarga";
import {
  createTipoCargaSchema,
  updateTipoCargaSchema,
  idTipoCargaParamSchema,
} from "../validations/tipoCarga.validation";
import { validate, validateParams } from "../middlewares/validate.middlewares";

const router = express.Router();

router.get("/", getAllTiposCarga);
/**
 * @swagger
 * /tipocargas:
 *   get:
 *     summary: Obtener todos los tipos de carga
 *     tags: [TiposCarga]
 *     responses:
 *       200:
 *         description: Lista de tipos de carga
 *
 */
router.get("/:id", validateParams(idTipoCargaParamSchema), getTipoCargaById);
/**
 * @swagger
 * /tipocargas/{id}:
 *   get:
 *     summary: Obtener un tipo de carga por ID
 *     tags: [TiposCarga]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de carga encontrado
 *
 *       404:
 *         description: Tipo de carga no encontrado
 */
router.post("/", validate(createTipoCargaSchema), createTipoCarga);
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
 *                 example: Carga refrigerada
 *     responses:
 *       201:
 *         description: Tipo de carga creado exitosamente
 *
 *       400:
 *         description: Datos inválidos
 */
router.put(
  "/:id",
  validateParams(idTipoCargaParamSchema),
  validate(updateTipoCargaSchema),
  updateTipoCarga
);
/**
 * @swagger
 * /tipocargas/{id}:
 *   put:
 *     summary: Actualizar un tipo de carga
 *     tags: [TiposCarga]
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
 *               - descripcion
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: Carga voluminosa
 *     responses:
 *       200:
 *         description: Tipo de carga actualizado
 *       404:
 *         description: Tipo de carga no encontrado
 */
router.delete("/:id", validateParams(idTipoCargaParamSchema), deleteTipoCarga);
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
 *     responses:
 *       200:
 *         description: Carga eliminada exitosamente
 *       404:
 *         description: Tipo de carga no encontrado
 *
 */

export default router;
