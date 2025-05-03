import { Request, Response } from 'express';
import db from '../models';

export const getTransportistas = async (req: Request, res: Response) => {
  try {
    const transportistas = await db.Transportista.findAll();
    res.json(transportistas);
  } catch (error) {
    console.error('Error al obtener transportistas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};