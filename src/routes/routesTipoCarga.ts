import { Router } from 'express';
import { getAllTiposCarga, createTipoCarga } from '../controllers/controllerTipoCarga';

const router = Router();

router.get('/', getAllTiposCarga);
router.post('/', createTipoCarga);

export default router;