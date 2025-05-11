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
 *
 *     responses:
 *       201:
 *         description: Carga creada
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
 *
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
 *       204:
 *         description: Eliminado exitosamente
 *       404:
 *         description: Carga no encontrada
 */

export default router;
