import { Router } from 'express';

import routerZonas from './routesZonas';
import routesCargas from './routesCarga';
import routesTipoCargas from './routesTipoCarga';
import routesTransportista from './routesTransportista';
import routesTipoVehiculo from './routesTipoVehiculo';
import routesAdicional from './routesAdicional';
import routesTarifa from './routesTarifa';
import routesTarifaAdicional from './routesTarifaAdicional';

const router = Router();

router.use('/zonas', routerZonas); 
router.use('/cargas', routesCargas); 
router.use('/tipocargas', routesTipoCargas); 
router.use('/transportistas', routesTransportista);
router.use('/tipovehiculos', routesTipoVehiculo);
router.use('/adicionales', routesAdicional);
router.use('/tarifas', routesTarifa);
router.use('/tarifaAdicional', routesTarifaAdicional);

export default router;