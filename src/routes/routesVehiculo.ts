import express from 'express';
import {
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from '../controllers/controllerVehiculo';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { vehiculoSchema } from '../validations/Vehiculo.validation';
import { idParamSchema } from '../validations/comun.validation';
const router = express.Router();

router.get('/', getAllVehiculos);

router.get('/:id', validateParams(idParamSchema), getVehiculoById);

router.post('/', validate(vehiculoSchema), createVehiculo);

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(vehiculoSchema),
  updateVehiculo
);

router.delete('/:id', validateParams(idParamSchema), deleteVehiculo);

export default router;
