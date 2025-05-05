import { Request, Response } from 'express';
import db from '../models';

export const getAllTiposCarga = async (_: Request, res: Response) => {
  try {
    const tiposCarga = await db.TipoCarga.findAll({ include: ['cargas'] });
    res.json(tiposCarga);
  } catch (error) {
    console.error('Error al obtener tipos de carga:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTipoCargaById = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id, { include: ['cargas'] });
    if (tipoCarga) 
      res.status(200).json(tipoCarga);
    else 
      res.status(404).json({ error: 'Tipo de carga no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el tipo de carga' });
  }
};

export const createTipoCarga = async (req: Request, res: Response) => {
  try {
    const nuevoTipoCarga = await db.TipoCarga.create(req.body);
    res.status(201).json(nuevoTipoCarga);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el tipo de carga' });
  }
};

export const updateTipoCarga = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) {
      await tipoCarga.update(req.body);
      res.json(tipoCarga);
    } 
    else {
      res.status(404).json({ error: 'Tipo de carga no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el tipo de carga' });
  }
};

export const deleteTipoCarga = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) {
      await tipoCarga.destroy();
      res.status(200).json(tipoCarga);
    } 
    else {
      res.status(404).json({ error: 'Tipo de carga no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el tipo de carga' });
  }
};