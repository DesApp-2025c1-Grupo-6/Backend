import express from 'express';
import { 
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo
} from '../controllers/controllerVehiculo';

const router = express.Router();

router.get('/', getAllVehiculos);

router.get('/:id', getVehiculoById);

router.post('/', createVehiculo);

router.put('/:id', updateVehiculo);

router.delete('/:id', deleteVehiculo);

export default router;