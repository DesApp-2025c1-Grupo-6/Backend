import { Request, Response } from 'express';
import db from '../models';

export const getAllTiposVehiculo = async (req: Request, res: Response) => {
  try {
    const tipoVehiculo = await db.TipoVehiculo.findAll();
    res.json(tipoVehiculo);
  } catch (error) {
    console.error('Error al obtener los tipos de vehículos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};

export const getTipoVehiculoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(id);
    
    if (!tipoVehiculo) {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      return;
    }
    
    res.json(tipoVehiculo);
  } catch (error) {
    console.error('Error al obtener tipo de vehículo por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};

export const createTipoVehiculo = async (req: Request, res: Response) => {
  const { tipo, toneladas } = req.body;
  
  if (!tipo) {
    res.status(400).json({ error: 'El tipo de vehículo es requerido' });
    return;
  }
  
  try {
    const newTipoVehiculo = await db.TipoVehiculo.create({ 
      tipo,
      toneladas
    });
    res.status(201).json(newTipoVehiculo);
  } catch (error) {
    console.error('Error al crear tipo de vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};

export const updateTipoVehiculo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tipo, toneladas } = req.body;
  
  if (!tipo) {
    res.status(400).json({ error: 'El tipo de vehículo es requerido' });
    return;
  }
  
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(id);
    
    if (!tipoVehiculo) {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      return;
    }
    
    await tipoVehiculo.update({ 
      tipo,
      toneladas: toneladas !== undefined ? toneladas : tipoVehiculo.toneladas
    });
    res.json(tipoVehiculo);
  } catch (error) {
    console.error('Error al actualizar tipo de vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};

export const deleteTipoVehiculo = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const tipoVehiculo = await db.TipoVehiculo.findByPk(id);
    
    if (!tipoVehiculo) {
      res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      return;
    }
    
    const tarifaCount = await db.Tarifa.count({
      where: { id_tipoVehiculo: id }
    });
    
    if (tarifaCount > 0) {
      res.status(400).json({ 
        error: 'No se puede eliminar el tipo de vehículo porque está asociado a tarifas existentes' 
      });
      return;
    }
    
    await tipoVehiculo.destroy();
    res.json(tipoVehiculo);
  } catch (error) {
    console.error('Error al eliminar tipo de vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};