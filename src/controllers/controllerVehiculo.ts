import { Request, Response } from "express";
import db from "../models";

export const getAllVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findAll();
    res.status(200).json(vehiculo);
  } catch (error) {
    console.error("Error al obtener los tipos de vehículo:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const getVehiculoById = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) res.status(200).json(vehiculo);
    else res.status(404).json({ error: "Tipo de vehículo no encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const createVehiculo = async (req: Request, res: Response) => {
  try {
    // Verificar si existe un vehículo eliminado con los mismos atributos
    const whereVehiculo = {
      tipo: req.body.tipo,
      toneladas: req.body.toneladas,
    };
    const vehiculoEliminado = await db.Vehiculo.findOne({
      where: whereVehiculo,
      paranoid: false,
    });
    if (vehiculoEliminado && vehiculoEliminado.deletedAt) {
      await vehiculoEliminado.restore();
      await vehiculoEliminado.update(req.body);
      res.status(200).json(vehiculoEliminado);
      return;
    }

    // Verificar si ya existe uno activo
    const vehiculoExistente = await db.Vehiculo.findOne({
      where: whereVehiculo,
    });
    if (vehiculoExistente) {
      res.status(400).json({ error: "Ya existe un tipo de vehículo con esos datos" });
      return;
    }

    const nuevoVehiculo = await db.Vehiculo.create(req.body);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const updateVehiculo = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) {
      await vehiculo.update(req.body);
      res.status(200).json(vehiculo);
    } else {
      res.status(404).json({ error: "Tipo de vehículo no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) {
      await vehiculo.destroy();
      res.status(200).json(vehiculo);
    } else {
      res.status(404).json({ error: "Tipo de vehículo no encontrado" });
    }
  } catch (error: any) {
    console.error("Error al eliminar vehículo:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};
