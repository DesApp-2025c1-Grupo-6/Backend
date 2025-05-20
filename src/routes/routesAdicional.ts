import express from 'express';
import { getAllAdicionales, getAdicionalById, createAdicional, updateAdicional, deleteAdicional } from '../controllers/controllerAdicional';

const router = express.Router();

router.get('/', getAllAdicionales);
router.get("/:id", getAdicionalById);
router.post("/", createAdicional);
router.put("/:id", updateAdicional);
router.delete("/:id", deleteAdicional);

export default router;