import express from 'express';
import {
  getAllTiposVehiculo,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo,
} from '../controllers/controllerTipoVehiculo';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { tipoVehiculoSchema } from '../validations/tipoVehiculo.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = express.Router();

router.get('/', getAllTiposVehiculo);

router.get('/:id', validateParams(idParamSchema), getTipoVehiculoById);

router.post('/', validate(tipoVehiculoSchema), createTipoVehiculo);

router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(tipoVehiculoSchema),
  updateTipoVehiculo
);

router.delete('/:id', validateParams(idParamSchema), deleteTipoVehiculo);

export default router;
