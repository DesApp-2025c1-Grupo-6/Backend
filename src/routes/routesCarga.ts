import { Router } from 'express';
import { getAllCargas } from '../controllers/controllerCarga';

const router = Router();

router.get('/', getAllCargas);

export default router;