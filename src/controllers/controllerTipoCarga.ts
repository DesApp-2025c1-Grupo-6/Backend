import { Request, Response } from 'express';
import db from '../models';

export const getAllTiposCarga = async (_: Request, res: Response) => {
  const tipos = await db.TipoCarga.findAll({ include: ['cargas'] });
  res.json(tipos);
};

export const createTipoCarga = async (req: Request, res: Response) => {
  try {
    const nuevoTipo = await db.TipoCarga.create(req.body);
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el tipo de carga' });
  }
};