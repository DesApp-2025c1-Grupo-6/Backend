import { Request, Response } from "express";
import db from "../models";
import { ForeignKeyConstraintError } from "sequelize";

export const getAllTiposCarga = async (_: Request, res: Response) => {
  try {
    const tiposCarga = await db.TipoCarga.findAll();
    res.status(200).json(tiposCarga);
  } catch (error) {
    console.error("Error al obtener los tipos de carga:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTipoCargaById = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) 
      res.status(200).json(tipoCarga);
    else 
      res.status(404).json({ error: "Tipo de carga no encontrado" });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createTipoCarga = async (req: Request, res: Response) => {
  try {
    const nuevoTipoCarga = await db.TipoCarga.create(req.body);
    res.status(201).json(nuevoTipoCarga);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateTipoCarga = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) {
      await tipoCarga.update(req.body);
      res.status(200).json(tipoCarga);
    } 
    else {
      res.status(404).json({ error: "Tipo de carga no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
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
      res.status(404).json({ error: "Tipo de carga no encontrado" });
    }
  } catch (error: any) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ error: "No se puede eliminar porque está asociado a una carga" });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
