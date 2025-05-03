import express from 'express';
import { getTipoVehiculo } from '../controllers/controllerTipoVehiculo';

const router = express.Router();

router.get('/', getTipoVehiculo);

export default router;