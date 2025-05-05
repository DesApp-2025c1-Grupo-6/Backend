import express from 'express';
import { getAllAdicionales } from '../controllers/controllerAdicional';

const router = express.Router();

router.get('/', getAllAdicionales);

export default router;