import express from 'express';
import { 
  getAllTiposVehiculo,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo
} from '../controllers/controllerTipoVehiculo';

const router = express.Router();

router.get('/', getAllTiposVehiculo);

router.get('/:id', getTipoVehiculoById);

router.post('/', createTipoVehiculo);

router.put('/:id', updateTipoVehiculo);

router.delete('/:id', deleteTipoVehiculo);

export default router;