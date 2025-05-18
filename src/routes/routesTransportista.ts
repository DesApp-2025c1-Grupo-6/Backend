import express from 'express';
import { 
  getAllTransportistas, 
  getTransportistaById, 
  createTransportista,
  updateTransportista,
  deleteTransportista 
} from '../controllers/controllerTransportista';

const router = express.Router();

// Todos
router.get('/', getAllTransportistas);

// Uno por ID
router.get('/:id', getTransportistaById);

// Crear
router.post('/', createTransportista);

// Actualizar
router.put('/:id', updateTransportista);

// Eliminar
router.delete('/:id', deleteTransportista);

export default router;