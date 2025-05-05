import express from 'express';
import { getZonas, getZonaById, createZona, updateZona, deleteZona } from '../controllers/controllerZona';

const router = express.Router();

router.get('/', getZonas);
router.get('/:id', getZonaById);
router.post('/', createZona);
router.put('/:id', updateZona);
router.delete('/:id', deleteZona);

export default router;