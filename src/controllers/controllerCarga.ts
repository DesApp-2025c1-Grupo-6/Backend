import { Request, Response } from 'express';
import db from '../models';

export const getAllCargas = async (_: Request, res: Response) => {
  try {
    const cargas = await db.Carga.findAll({ include: ['tipoCarga'] });
    res.json(cargas);
  } catch (error) {
    console.error('Error al obtener cargas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getCargaById = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id, { include: ['tipoCarga'] });
    if (carga) 
      res.status(200).json(carga);
    else 
      res.status(404).json({ error: 'Carga no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la carga' });
  }
};

export const createCarga = async (req: Request, res: Response) => {
  try {
    const nuevaCarga = await db.Carga.create(req.body);
    res.status(201).json(nuevaCarga);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la carga' });
  }
};

export const updateCarga = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id);
    if (carga) {
      await carga.update(req.body);
      res.json(carga);
    } 
    else {
      res.status(404).json({ error: 'Carga no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la carga' });
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
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la carga' });
  }
};

export const getTipoCargaByCargaId = async (req: Request, res: Response) => {
  try {
    const carga = await db.Carga.findByPk(req.params.id, { include: ['tipoCarga'] });
    if (!carga) {
      return res.status(404).json({ error: 'Carga no encontrada' });
    }
    if (!carga.id_tipo_carga) {
      return res.status(404).json({ error: 'Tipo de carga no encontrado para esta carga' });
    }
    res.status(200).json(carga.get('tipoCarga'));
  } catch (error) {
    console.error('Error al obtener el tipo de carga:', error);
    res.status(500).json({ error: 'Error al obtener el tipo de carga de esta carga' });
  }
};