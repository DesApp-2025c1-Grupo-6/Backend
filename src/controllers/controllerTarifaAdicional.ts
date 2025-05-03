import { Request, Response } from 'express';
import db from '../models';

export const getAllTarifasAdicionales  = async (_: Request, res: Response) => {
  try {
    const tarifaAdicional = await db.TarifaAdicional.findAll({ include: ['tarifa', 'adicional'] });
    res.json(tarifaAdicional);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tarifas con adicionales' });
  }
};

export const createTarifaAdicional = async (req: Request, res: Response) => {
  try {
    const nuevaTarifaAdicional = await db.TarifaAdicional.create(req.body);
    res.status(201).json(nuevaTarifaAdicional);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la tarifa con el adicional' });
  }
};