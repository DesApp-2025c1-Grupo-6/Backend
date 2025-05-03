import { Request, Response } from 'express';
import db from '../models';

export const getZonas = async (req: Request, res: Response) => {
  try {
    const zonas = await db.Zona.findAll();
    res.json(zonas);
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};