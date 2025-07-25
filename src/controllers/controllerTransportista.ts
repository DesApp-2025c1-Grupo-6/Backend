import { Request, Response } from "express";
import db from "../models";
import { ForeignKeyConstraintError } from "sequelize";

export const getAllTransportistas = async (req: Request, res: Response) => {
  try {
    const transportistas = await db.Transportista.findAll();
    res.status(200).json(transportistas);
  } catch (error) {
    console.error("Error al obtener los transportistas:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const getTransportistaById = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) res.status(200).json(transportista);
    else res.status(404).json({ error: "Transportista no encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const createTransportista = async (req: Request, res: Response) => {
  try {
    // Verificar si existe un transportista eliminado con los mismos atributos
    const whereTransportista = {
      nombre: req.body.nombre,
    };
    const transportistaEliminado = await db.Transportista.findOne({
      where: whereTransportista,
      paranoid: false,
    });
    if (transportistaEliminado && transportistaEliminado.deletedAt) {
      await transportistaEliminado.restore();
      await transportistaEliminado.update(req.body);
      res.status(200).json(transportistaEliminado);
      return;
    }

    // Verificar si ya existe uno activo
    const transportistaExistente = await db.Transportista.findOne({
      where: whereTransportista,
    });
    if (transportistaExistente) {
      res
        .status(400)
        .json({ error: "Ya existe un transportista con esos datos" });
      return;
    }

    const nuevoTransportista = await db.Transportista.create(req.body);
    res.status(201).json(nuevoTransportista);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const updateTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      // Si el email viene como string vacío, convertirlo a null para "limpiar" el campo
      const updateData = { ...req.body };
      if (updateData.email === "") {
        updateData.email = null;
      }

      await transportista.update(updateData);
      res.status(200).json(transportista);
    } else {
      res.status(404).json({ error: "Transportista no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar transportista:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const deleteTransportista = async (req: Request, res: Response) => {
  try {
    const transportista = await db.Transportista.findByPk(req.params.id);
    if (transportista) {
      await transportista.destroy();
      res.status(200).json(transportista);
    } else {
      res.status(404).json({ error: "Transportista no encontrado" });
    }
  } catch (error: any) {
    console.error("Error al eliminar transportista:", error);
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({
        error: "No se puede eliminar porque está asociado a una tarifa",
      });
    } else {
      res
        .status(500)
        .json({ error: "Error interno del servidor. Detalle: " + error });
    }
  }
};
