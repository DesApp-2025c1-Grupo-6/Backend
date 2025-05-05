import express from 'express';
import { getAllTiposVehiculo } from '../controllers/controllerTipoVehiculo';

const router = express.Router();

router.get('/', getAllTiposVehiculo);

export default router;