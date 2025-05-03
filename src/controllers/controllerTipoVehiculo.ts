import { Request, Response } from 'express';
import db from '../models';

export const getTipoVehiculo = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findAll();
    res.json(tipoVehiculo);
  } catch (error) {
    console.error('Error al obtener los tipos de vehículos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};