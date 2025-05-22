import express from "express";
import {
  getAllCargas,
  getCargaById,
  createCarga,
  updateCarga,
  deleteCarga,
  getTipoCargaByCargaId,
} from "../controllers/controllerCarga";

const router = express.Router();

router.get("/", getAllCargas);
/**
 * @swagger
 * /cargas:
 *   get:
 *     summary: Obtener todas las cargas
 *     tags: [Cargas]
 *     responses:
 *       200:
 *         description: Lista de cargas
 */
router.get("/:id", getCargaById);
/**
 * @swagger
 * /cargas/{id}:
 *   get:
 *     summary: Obtener una carga por ID
 *     tags: [Cargas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carga encontrada
 *       404:
 *         description: Carga no encontrada
 */
router.get("/:id/tipo-carga", getTipoCargaByCargaId as express.RequestHandler);
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
 *     responses:
 *       200:
 *         description: Tipo de carga encontrado
 *       404:
 *         description: No se encontró un tipo de carga
 *
 */
router.post("/", createCarga);
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
 *         description: Carga creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_carga:
 *                   type: integer
 *                   example: 15
 *                 peso:
 *                   type: number
 *                   example: 1200.5
 *                 volumen:
 *                   type: number
 *                   example: 8.3
 *                 requisitos_especiales:
 *                   type: string
 *                   example: "Requiere refrigeración"
 *                 id_tipo_carga:
 *                   type: integer
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-14T13:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-14T13:30:00.000Z"
 *       400:
 *         description: Datos inválidos o faltantes
 */

router.put("/:id", updateCarga);
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peso:
 *                 type: number
 *               volumen:
 *                 type: number
 *               requisitos_especiales:
 *                 type: string
 *               id_tipo_carga:
 *                 type: integer
 *           example:
 *             peso: 1200.5
 *             volumen: 3.4
 *             requisitos_especiales: Manejo con cuidado extremo
 *             id_tipo_carga: 2
 *     responses:
 *       200:
 *         description: Carga actualizada
 *       404:
 *         description: Carga no encontrada
 */

router.delete("/:id", deleteCarga);
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
 *     responses:
 *       200:
 *         description: Carga eliminada exitosamente
 *       404:
 *         description: Carga no encontrada
 */

export default router;
