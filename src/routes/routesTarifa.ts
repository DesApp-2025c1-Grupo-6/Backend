import { Router } from 'express';
import {
  getAllTarifas,
  getTarifaById,
  createTarifa,
  updateTarifa,
  deleteTarifa,
  getVehiculoByTarifa,
  getCargaByTarifa,
  getTipoCargaByTarifa,
  getZonaByTarifa,
  getTransportistaByTarifa,
  getAdicionalesByTarifa,
} from '../controllers/controllerTarifa';
import { validate, validateParams } from '../middlewares/validate.middlewares';
import { tarifaSchema } from '../validations/tarifa.validation';
import { idParamSchema } from '../validations/comun.validation';

const router = Router();

router.get('/', getAllTarifas);
router.get('/:id', validateParams(idParamSchema), getTarifaById);
router.post('/', validate(tarifaSchema), createTarifa);
router.put(
  '/:id',
  validateParams(idParamSchema),
  validate(tarifaSchema),
  updateTarifa
);
router.delete('/:id', validateParams(idParamSchema), deleteTarifa);

router.get('/:id/vehiculo', validateParams(idParamSchema), getVehiculoByTarifa);
router.get('/:id/carga', validateParams(idParamSchema), getCargaByTarifa);
router.get(
  '/:id/tipoCarga',
  validateParams(idParamSchema),
  getTipoCargaByTarifa
);
router.get('/:id/zona', validateParams(idParamSchema), getZonaByTarifa);
router.get(
  '/:id/transportista',
  validateParams(idParamSchema),
  getTransportistaByTarifa
);
router.get(
  '/:id/adicionales',
  validateParams(idParamSchema),
  getAdicionalesByTarifa
);

export default router;
