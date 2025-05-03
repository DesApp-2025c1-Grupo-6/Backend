import express from 'express';
import { getZonas } from '../controllers/controllerZona';

const router = express.Router();

router.get('/', getZonas);

export default router;