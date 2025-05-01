import express from 'express';
import { getTransportistas } from '../controllers/controllerTransportista';

const router = express.Router();

router.get('/', getTransportistas);

export default router;