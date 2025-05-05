import { Request, Response } from 'express';
import db from '../models';

export const getAllZonas = async (req: Request, res: Response) => {
  try {
    const zonas = await db.Zona.findAll();
    res.json(zonas);
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getZonaById = async (req: Request, res: Response) => {
  try {
    const zona = await db.Zona.findByPk(req.params.id);
    if (zona) 
      res.status(200).json(zona);
    else 
      res.status(404).json({ error: 'Zona no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la zona' });
  }
};

export const createZona = async (req: Request, res: Response) => {
  try {
    const nuevaZona = await db.Zona.create(req.body);
    res.status(201).json(nuevaZona);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la zona' });
  }
};

export const updateZona = async (req: Request, res: Response) => {
  try {
    const zona = await db.Zona.findByPk(req.params.id);
    if (zona) {
      await zona.update(req.body);
      res.json(zona);
    } 
    else {
      res.status(404).json({ error: 'Zona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la zona' });
  }
};

export const deleteZona = async (req: Request, res: Response) => {
  try {
    const zona = await db.Zona.findByPk(req.params.id);
    if (zona) {
      await zona.destroy();
      res.status(200).json(zona);
    } 
    else {
      res.status(404).json({ error: 'Zona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la zona' });
  }
};