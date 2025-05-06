import express from 'express';
import { getAllTiposCarga, getTipoCargaById, createTipoCarga, updateTipoCarga, deleteTipoCarga } from '../controllers/controllerTipoCarga';

const router = express.Router();

router.get('/', getAllTiposCarga);
router.get('/:id', getTipoCargaById);
router.post('/', createTipoCarga);
router.put('/:id', updateTipoCarga);
router.delete('/:id', deleteTipoCarga);

export default router;