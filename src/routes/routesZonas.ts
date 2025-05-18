import express from "express";
import {
  getAllZonas,
  getZonaById,
  createZona,
  updateZona,
  deleteZona,
} from "../controllers/controllerZona";

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */
router.get("/:id", getZonaById);
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
router.post("/", createZona);
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_zona:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: "Zona Norte"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-14T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-14T12:34:56.789Z"
 *       400:
 *         description: Datos inválidos o faltantes
 */

router.put("/:id", updateZona);
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_zona:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id_zona: 4
 *               nombre: Zona Central
 *               createdAt: "2025-05-10T12:00:00.000Z"
 *               updatedAt: "2025-05-18T15:42:00.000Z"
 *       404:
 *         description: Zona no encontrada
 */

router.delete("/:id", deleteZona);
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
