import express from 'express';
import { getAdicional } from '../controllers/controllerAdicional';

const router = express.Router();

router.get('/', getAdicional);

export default router;