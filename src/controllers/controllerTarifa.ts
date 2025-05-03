import { Request, Response } from 'express';
import db from '../models';

export const getAllTarifas  = async (_: Request, res: Response) => {
  try {
    const tarifas = await db.Tarifa.findAll({ include: ['tipoVehiculo', 'carga', 'zona', 'transportista'] });
    res.json(tarifas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tarifas' });
  }
};

export const createTarifa = async (req: Request, res: Response) => {
  try {
    const nuevaTarifa = await db.Tarifa.create(req.body);
    res.status(201).json(nuevaTarifa);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la tarifa' });
  }
};