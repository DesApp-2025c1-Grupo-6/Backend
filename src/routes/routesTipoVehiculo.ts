import express from 'express';
import { 
  getAllTiposVehiculo,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo
} from '../controllers/controllerTipoVehiculo';

const router = express.Router();

// Todos
router.get('/', getAllTiposVehiculo);

// Uno por ID
router.get('/:id', getTipoVehiculoById);

// Crear
router.post('/', createTipoVehiculo);

// Actualizar
router.put('/:id', updateTipoVehiculo);

// Eliminar
router.delete('/:id', deleteTipoVehiculo);

export default router;