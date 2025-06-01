import { Router } from 'express';

import routerZonas from './routesZonas';
import routesCargas from './routesCarga';
import routesTipoCargas from './routesTipoCarga';
import routesTransportista from './routesTransportista';
import routesVehiculos from './routesVehiculo';
import routesAdicional from './routesAdicional';
import routesTarifa from './routesTarifa';

const router = Router();

router.use('/zonas', routerZonas); 
router.use('/cargas', routesCargas); 
router.use('/tipocargas', routesTipoCargas); 
router.use('/transportistas', routesTransportista);
router.use('/vehiculos', routesVehiculos);
router.use('/adicionales', routesAdicional);
router.use('/tarifas', routesTarifa);

export default router;