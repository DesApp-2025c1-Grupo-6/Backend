import { Request, Response } from 'express';
import db from '../models';

// Obtener todos los transportistas
export const getAllTransportistas = async (req: Request, res: Response) => {
  try {
    const transportistas = await db.Transportista.findAll();
    res.json(transportistas);
  } catch (error) {
    console.error('Error al obtener transportistas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un transportista por ID
export const getTransportistaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const transportista = await db.Transportista.findByPk(id);
    
    if (!transportista) {
      return res.status(404).json({ error: 'Transportista no encontrado' });
    }
    
    res.json(transportista);
  } catch (error) {
    console.error('Error al obtener transportista por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo transportista
export const createTransportista = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del transportista es requerido' });
  }
  
  try {
    const newTransportista = await db.Transportista.create({ nombre });
    res.status(201).json(newTransportista);
  } catch (error) {
    console.error('Error al crear transportista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un transportista existente
export const updateTransportista = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del transportista es requerido' });
  }
  
  try {
    const transportista = await db.Transportista.findByPk(id);
    
    if (!transportista) {
      return res.status(404).json({ error: 'Transportista no encontrado' });
    }
    
    await transportista.update({ nombre });
    res.json(transportista);
  } catch (error) {
    console.error('Error al actualizar transportista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un transportista
export const deleteTransportista = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const transportista = await db.Transportista.findByPk(id);
    
    if (!transportista) {
      return res.status(404).json({ error: 'Transportista no encontrado' });
    }
    
    // Verificar si este transportista está referenciado por alguna tarifa
    const tarifaCount = await db.Tarifa.count({
      where: { id_transportista: id }
    });
    
    if (tarifaCount > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar el transportista porque está asociado a tarifas existentes' 
      });
    }
    
    await transportista.destroy();
    res.json({ message: 'Transportista eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar transportista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};