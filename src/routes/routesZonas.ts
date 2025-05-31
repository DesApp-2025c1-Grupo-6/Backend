import express from "express";
import {
  getAllZonas,
  getZonaById,
  createZona,
  updateZona,
  deleteZona,
} from "../controllers/controllerZona";
import { validate, validateParams } from "../middlewares/validate.middlewares";
import { zonaSchema } from "../validations/zona.validation";
import { idParamSchema } from "../validations/comun.validation";

const router = express.Router();

router.get("/", getAllZonas);
/**
 * @swagger
 * /zonas:
 *   get:
 *     summary: Obtener todas las zonas
 *     tags: [Zonas]
 *     responses:
 *       200:
 *         description: Lista de zonas
 *
 *
 */
router.get("/:id", validateParams(idParamSchema), getZonaById);
/**
 * @swagger
 * /zonas/{id}:
 *   get:
 *     summary: Obtener una zona por ID
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona encontrada
 *
 *       404:
 *         description: Zona no encontrada
 */
router.post("/", validate(zonaSchema), createZona);
/**
 * @swagger
 * /zonas:
 *   post:
 *     summary: Crear una nueva zona
 *     tags: [Zonas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Zona Norte"
 *     responses:
 *       201:
 *         description: Zona creada
 *
 *       400:
 *         description: Datos inválidos o faltantes
 */

router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(zonaSchema),
  updateZona
);
/**
 * @swagger
 * /zonas/{id}:
 *   put:
 *     summary: Actualizar una zona existente
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *           example:
 *             nombre: Zona Central
 *     responses:
 *       200:
 *         description: Zona actualizada
 *
 *       404:
 *         description: Zona no encontrada
 */

router.delete("/:id", validateParams(idParamSchema), deleteZona);
/**
 * @swagger
 * /zonas/{id}:
 *   delete:
 *     summary: Eliminar una zona
 *     tags: [Zonas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       404:
 *         description: Zona no encontrada
 */

export default router;
