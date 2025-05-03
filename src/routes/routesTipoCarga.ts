import { Router } from 'express';
import { getAllTiposCarga } from '../controllers/controllerTipoCarga';

const router = Router();

router.get('/', getAllTiposCarga);

export default router;