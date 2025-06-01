import { Request, Response } from 'express';
import db from '../models';

export const getAllVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findAll();
    res.status(200).json(vehiculo);
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getVehiculoById = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) {
      res.status(200).json(vehiculo);
    }
    else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vehículo' });
  }
};

export const createVehiculo = async (req: Request, res: Response) => {
  try {
    const nuevoVehiculo = await db.Vehiculo.create(req.body);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vehículo' });
  }
};

export const updateVehiculo = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) {
      await vehiculo.update(req.body);
      res.status(200).json(vehiculo);
    }
    else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  try {
    const vehiculo = await db.Vehiculo.findByPk(req.params.id);
    if (vehiculo) {
      await vehiculo.destroy();
      res.status(200).json(vehiculo);
    }
    else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};