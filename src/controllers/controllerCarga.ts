import { Request, Response } from 'express';
import db from '../models';

export const getAllCargas = async (_: Request, res: Response) => {
  const cargas = await db.Carga.findAll({ include: ['tipoCarga'] });
  res.json(cargas);
};

export const createCarga = async (req: Request, res: Response) => {
  try {
    const nuevaCarga = await db.Carga.create(req.body);
    res.status(201).json(nuevaCarga);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la carga' });
  }
};