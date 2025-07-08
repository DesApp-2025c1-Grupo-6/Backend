import { Request, Response } from "express";
import db from "../models";

export const getAllTiposCarga = async (_: Request, res: Response) => {
  try {
    const tiposCarga = await db.TipoCarga.findAll();
    res.status(200).json(tiposCarga);
  } catch (error) {
    console.error("Error al obtener los tipos de carga:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTipoCargaById = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) res.status(200).json(tipoCarga);
    else res.status(404).json({ error: "Tipo de carga no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createTipoCarga = async (req: Request, res: Response) => {
  try {
    // Verificar si existe un tipo de carga eliminado con la misma descripcion
    const whereTipoCarga = { descripcion: req.body.descripcion };
    const tipoEliminado = await db.TipoCarga.findOne({
      where: whereTipoCarga,
      paranoid: false,
    });
    if (tipoEliminado && tipoEliminado.deletedAt) {
      await tipoEliminado.restore();
      await tipoEliminado.update(req.body);
      res.status(200).json(tipoEliminado);
      return;
    }

    // Verificar si ya existe uno activo
    const tipoExistente = await db.TipoCarga.findOne({ where: whereTipoCarga });
    if (tipoExistente) {
      res
        .status(400)
        .json({ error: "Ya existe un tipo de carga con esa descripción" });
      return;
    }

    const nuevoTipoCarga = await db.TipoCarga.create(req.body);
    res.status(201).json(nuevoTipoCarga);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateTipoCarga = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) {
      await tipoCarga.update(req.body);
      res.status(200).json(tipoCarga);
    } else {
      res.status(404).json({ error: "Tipo de carga no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteTipoCarga = async (req: Request, res: Response) => {
  try {
    const tipoCarga = await db.TipoCarga.findByPk(req.params.id);
    if (tipoCarga) {
      await tipoCarga.destroy();
      res.status(200).json(tipoCarga);
    } else {
      res.status(404).json({ error: "Tipo de carga no encontrado" });
    }
  } catch (error: any) {
    console.error("Error al eliminar tipo de carga:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
