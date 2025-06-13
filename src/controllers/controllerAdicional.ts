import { Request, Response } from 'express';
import db from '../models';
import { ForeignKeyConstraintError } from "sequelize";

export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.status(200).json(adicional);
  } catch (error) {
    console.error('Error al obtener los adicionales:', error);
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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createAdicional = async (req: Request, res: Response) => {
  try {
    const nuevoAdicional = await db.Adicional.create(req.body);
    res.status(201).json(nuevoAdicional);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      await adicional.update(req.body);
      res.status(200).json(adicional);
    } 
    else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
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
  } catch (error: any) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ error: "No se puede eliminar porque está asociado a una tarifa" });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};