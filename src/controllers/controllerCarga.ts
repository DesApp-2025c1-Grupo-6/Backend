import { Request, Response } from 'express';
import db from '../models';

export const getAllCargas = async (_: Request, res: Response) => {
  try {
    const cargas = await db.Carga.findAll({ include: ['tipoCarga'] });
    res.json(cargas);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener la carga' });
  }
};