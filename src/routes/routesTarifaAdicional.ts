import { Router } from 'express';
import { getAllTarifasAdicionales, createTarifaAdicional } from '../controllers/controllerTarifaAdicional';

const router = Router();

router.get('/', getAllTarifasAdicionales);
router.post('/', createTarifaAdicional);

export default router;