import { Request, Response } from 'express';
import db from '../models';

export const getAllTiposCarga = async (_: Request, res: Response) => {
  try {
    const tipos = await db.TipoCarga.findAll({ include: ['cargas'] });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de carga' });
  }
};