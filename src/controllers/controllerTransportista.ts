import { Request, Response } from 'express';
import db from '../models';

export const getAllTransportistas = async (req: Request, res: Response) => {
  try {
    const transportistas = await db.Transportista.findAll();
    res.status(200).json(transportistas);
  } catch (error) {
    console.error('Error al obtener los transportistas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createTransportista = async (req: Request, res: Response) => {
  try {
    const nuevoTransportista = await db.Transportista.create(req.body);
    res.status(201).json(nuevoTransportista);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      await transportista.update(req.body);
      res.status(200).json(transportista);
    }
    else {
      res.status(404).json({ error: 'Transportista no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      await transportista.destroy();
      res.status(200).json(transportista);
    }
    else {
      res.status(404).json({ error: 'Transportista no encontrado' });
    }
  } catch (error: any) {
    console.error('Error al eliminar transportista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};