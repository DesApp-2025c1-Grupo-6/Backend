import { Router } from 'express';
import { getAllTarifas, createTarifa } from '../controllers/controllerTarifa';

const router = Router();

router.get('/', getAllTarifas);
router.post('/', createTarifa);

export default router;