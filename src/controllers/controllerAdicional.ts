import { Request, Response } from 'express';
import db from '../models';

export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.json(adicional);
  } catch (error) {
    console.error('Error al obtener adicionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAdicionalById = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) 
      res.status(200).json(adicional);
    else 
      res.status(404).json({ error: 'Adicional no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el adicional' });
  }
};

export const createAdicional = async (req: Request, res: Response) => {
  try {
    const nuevoAdicional = await db.Adicional.create(req.body);
    res.status(201).json(nuevoAdicional);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el adicional' });
  }
};

export const updateAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      await adicional.update(req.body);
      res.json(adicional);
    } 
    else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el adicional' });
  }
};

export const deleteAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      await adicional.destroy();
      res.status(200).json(adicional);
    } 
    else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el adicional' });
  }
};