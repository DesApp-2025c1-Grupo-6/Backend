import { Router } from 'express';
import { getAllCargas, createCarga } from '../controllers/controllerCarga';

const router = Router();

router.get('/', getAllCargas);
router.post('/', createCarga);

export default router;