import { Request, Response } from 'express';
import db from '../models';

export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.json(adicional);
  } catch (error) {
    console.error('Error al obtener adicionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};