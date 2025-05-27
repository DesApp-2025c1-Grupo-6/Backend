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
    getAdicionalesByTarifa 
} from '../controllers/controllerTarifa';


const router = Router();

router.get('/', getAllTarifas);
router.get("/:id", getTarifaById);
router.post('/', createTarifa);
router.put("/:id", updateTarifa);
router.delete("/:id", deleteTarifa);

router.get("/:id/vehiculo", getVehiculoByTarifa);
router.get("/:id/carga", getCargaByTarifa);
router.get("/:id/tipoCarga", getTipoCargaByTarifa);
router.get("/:id/zona", getZonaByTarifa);
router.get("/:id/transportista", getTransportistaByTarifa);
router.get("/:id/adicionales", getAdicionalesByTarifa);

export default router;