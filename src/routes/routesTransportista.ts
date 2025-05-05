import express from 'express';
import { getAllTransportistas } from '../controllers/controllerTransportista';

const router = express.Router();

router.get('/', getAllTransportistas);

export default router;