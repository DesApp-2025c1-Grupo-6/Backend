import express from 'express';
import { getAllCargas, getCargaById, createCarga, updateCarga, deleteCarga, getTipoCargaByCargaId } from '../controllers/controllerCarga';

const router = express.Router();

router.get('/', getAllCargas);
router.get('/:id', getCargaById);
router.get('/:id/tipo-carga', getTipoCargaByCargaId as express.RequestHandler);
router.post('/', createCarga);
router.put('/:id', updateCarga);
router.delete('/:id', deleteCarga);

export default router;