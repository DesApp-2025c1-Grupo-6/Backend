import { Request, Response } from 'express';
import db from '../models';

export const getAllCargas = async (_: Request, res: Response) => {
  try {
    const cargas = await db.Carga.findAll({ 
      include: [{
        association: 'tipoCarga',
        paranoid: false  // Incluir tipos de carga "eliminados"
      }]
    });
    res.status(200).json(cargas);
  } catch (error) {
    console.error('Error al obtener las cargas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getCargaById = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id, { 
      include: [{
        association: 'tipoCarga',
        paranoid: false  // Incluir tipos de carga "eliminados"
      }]
    });
    if (carga) 
      res.status(200).json(carga);
    else 
      res.status(404).json({ error: 'Carga no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createCarga = async (req: Request, res: Response) => {
  try {
    const nuevaCarga = await db.Carga.create(req.body);
    res.status(201).json(nuevaCarga);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateCarga = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id);
    if (carga) {
      await carga.update(req.body);
      res.status(200).json(carga);
    } 
    else {
      res.status(404).json({ error: 'Carga no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteCarga = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id);
    if (carga) {
      await carga.destroy();
      res.status(200).json(carga);
    } 
    else {
      res.status(404).json({ error: 'Carga no encontrada' });
    }
  } catch (error: any) {
    console.error('Error al eliminar carga:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTipoCargaByCargaId = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id, { 
      include: [{
        association: 'tipoCarga',
        paranoid: false  // Incluir tipos de carga "eliminados"
      }]
    });
    if (!carga) {
      return res.status(404).json({ error: 'Carga no encontrada' });
    }
    res.status(200).json(carga.get('tipoCarga'));
  } catch (error) {
    console.error('Error al obtener el tipo de carga:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};