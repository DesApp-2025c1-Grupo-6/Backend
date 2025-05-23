import { Request, Response } from 'express';
import db from '../models';

export const getAllTiposVehiculo = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findAll();
    res.status(200).json(tipoVehiculo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de vehículos' });
  }
};

export const getTipoVehiculoById = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(req.params.id);
    if (tipoVehiculo) {
      res.status(200).json(tipoVehiculo);
    }
    else {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de vehículo por ID' });
  }
};

export const createTipoVehiculo = async (req: Request, res: Response) => {
  try {
    const newTipoVehiculo = await db.TipoVehiculo.create(req.body);
    res.status(201).json(newTipoVehiculo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de vehículo' });
  }
};

export const updateTipoVehiculo = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(req.params.id);
    if (tipoVehiculo) {
      await tipoVehiculo.update(req.body);
      res.status(200).json(tipoVehiculo);
    }
    else {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tipo de vehículo' });
  }
};

export const deleteTipoVehiculo = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(req.params.id);
    if (tipoVehiculo) {
      await tipoVehiculo.destroy();
      res.status(200).json(tipoVehiculo);
    }
    else {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tipo de vehículo' });
  }
};