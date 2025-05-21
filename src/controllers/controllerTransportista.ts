import { Request, Response } from 'express';
import db from '../models';

export const getAllTransportistas = async (req: Request, res: Response) => {
  try {
    const transportistas = await db.Transportista.findAll();
    res.status(200).json(transportistas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transportistas' });
  }
};

export const getTransportistaById = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) 
      res.status(200).json(transportista);
    else 
      res.status(404).json({ error: 'Transportista no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el transportista' });
  }
};

export const createTransportista = async (req: Request, res: Response) => {
  try {
    const newTransportista = await db.Transportista.create(req.body);
    res.status(201).json(newTransportista);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear transportista' });
  }
};

export const updateTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      await transportista.update(req.body);
      res.json(transportista);
    }
    else {
      res.status(404).json({ error: 'Transportista no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar transportista' });
  }
};

// Eliminar un transportista
export const deleteTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      await transportista.destroy();
      res.status(200).json(transportista);
    }
    else{
      res.status(404).json({ error: 'Transportista no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar transportista' });
  }
};