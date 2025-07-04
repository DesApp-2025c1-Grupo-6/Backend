import { Request, Response } from 'express';
import db from '../models';

export const getAllTarifas = async (_req: Request, res: Response) => {
  try {
    const tarifas = await db.Tarifa.findAll({
      include: [
        {
          association: 'vehiculo',
          paranoid: false  // Incluir vehículos "eliminados"
        },
        {
          association: 'carga',
          include: [{
            association: 'tipoCarga',
            paranoid: false  // Incluir tipos de carga "eliminados"
          }]
        },
        {
          association: 'zona',
          paranoid: false  // Incluir zonas "eliminadas"
        },
        {
          association: 'transportista',
          paranoid: false  // Incluir transportistas "eliminados"
        },
        {
          association: 'adicionales',
          include: [{
            association: 'adicional',
            paranoid: false  // Incluir adicionales "eliminados"
          }]
        },
      ],
    });

    res.status(200).json(mapTarifas(tarifas));
  } catch (error) {
    console.error('Error al obtener las tarifas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTarifaById = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [
        {
          association: 'vehiculo',
          paranoid: false  // Incluir vehículos "eliminados"
        },
        {
          association: 'zona',
          paranoid: false  // Incluir zonas "eliminadas"
        },
        {
          association: 'transportista',
          paranoid: false  // Incluir transportistas "eliminados"
        },
        {
          association: 'carga',
          include: [{
            association: 'tipoCarga',
            paranoid: false  // Incluir tipos de carga "eliminados"
          }]
        },
        {
          association: 'adicionales',
          include: [{
            association: 'adicional',
            paranoid: false  // Incluir adicionales "eliminados"
          }]
        },
      ] 
    });

    if (tarifa) 
      res.status(200).json(mapTarifa(tarifa));
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createTarifa = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction(); 

  try {
    const { adicionales, ...tarifaData } = req.body;

    // Validar que los registros relacionados existan y estén activos
    const [vehiculo, carga, zona, transportista] = await Promise.all([
      db.Vehiculo.findByPk(tarifaData.id_vehiculo),
      db.Carga.findByPk(tarifaData.id_carga),
      db.Zona.findByPk(tarifaData.id_zona),
      db.Transportista.findByPk(tarifaData.id_transportista)
    ]);

    // Verificar que todos los registros existan y estén activos
    if (!vehiculo) {
      await transaction.rollback();
      res.status(400).json({ error: 'El vehículo especificado no existe o está eliminado' });
      return;
    }
    if (!carga) {
      await transaction.rollback();
      res.status(400).json({ error: 'La carga especificada no existe o está eliminada' });
      return;
    }
    if (!zona) {
      await transaction.rollback();
      res.status(400).json({ error: 'La zona especificada no existe o está eliminada' });
      return;
    }
    if (!transportista) {
      await transaction.rollback();
      res.status(400).json({ error: 'El transportista especificado no existe o está eliminado' });
      return;
    }

    const nuevaTarifa = await db.Tarifa.create(tarifaData, { transaction: transaction });

    if (Array.isArray(adicionales) && adicionales.length > 0) { 
      // Validar que todos los adicionales existan y estén activos
      const adicionalesIds = adicionales.map(a => a.id_adicional);
      const adicionalesActivos = await db.Adicional.findAll({
        where: { id_adicional: adicionalesIds }
      });

      if (adicionalesActivos.length !== adicionalesIds.length) {
        await transaction.rollback();
        res.status(400).json({ error: 'Uno o más adicionales especificados no existen o están eliminados' });
        return;
      }
      
       const adicionalesData = adicionales.map((adicional: any) => ({
        id_tarifa: nuevaTarifa.id_tarifa,
        id_adicional: adicional.id_adicional,
        costo_personalizado: adicional.costo_personalizado ?? null
      }));
      
      await db.TarifaAdicional.bulkCreate(adicionalesData, { transaction:transaction });
    }
    await transaction.commit();
    
    const tarifa = await db.Tarifa.findByPk(nuevaTarifa.id_tarifa, {
      include: [
        {
          association: 'vehiculo',
          paranoid: false  // Incluir vehículos "eliminados"
        },
        {
          association: 'carga',
          include: [{
            association: 'tipoCarga',
            paranoid: false  // Incluir tipos de carga "eliminados"
          }]
        },
        {
          association: 'zona',
          paranoid: false  // Incluir zonas "eliminadas"
        },
        {
          association: 'transportista',
          paranoid: false  // Incluir transportistas "eliminados"
        },
        {
          association: 'adicionales',
          include: [{
            association: 'adicional',
            paranoid: false  // Incluir adicionales "eliminados"
          }]
        }
      ]
    });

    res.status(201).json( mapTarifa(tarifa) );
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateTarifa = async (req: Request, res: Response): Promise<void> => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const { adicionales, ...tarifaData } = req.body;

    const tarifaExistente = await db.Tarifa.findByPk(id);
    if (!tarifaExistente) {
      await transaction.rollback();
      res.status(404).json({ error: 'Tarifa no encontrada' });
      return;
    }

    // Validar que los registros relacionados existan y estén activos (solo si se están actualizando)
    if (tarifaData.id_vehiculo || tarifaData.id_carga || tarifaData.id_zona || tarifaData.id_transportista) {
      const [vehiculo, carga, zona, transportista] = await Promise.all([
        tarifaData.id_vehiculo ? db.Vehiculo.findByPk(tarifaData.id_vehiculo) : Promise.resolve(true),
        tarifaData.id_carga ? db.Carga.findByPk(tarifaData.id_carga) : Promise.resolve(true),
        tarifaData.id_zona ? db.Zona.findByPk(tarifaData.id_zona) : Promise.resolve(true),
        tarifaData.id_transportista ? db.Transportista.findByPk(tarifaData.id_transportista) : Promise.resolve(true)
      ]);

      if (tarifaData.id_vehiculo && !vehiculo) {
        await transaction.rollback();
        res.status(400).json({ error: 'El vehículo especificado no existe o está eliminado' });
        return;
      }
      if (tarifaData.id_carga && !carga) {
        await transaction.rollback();
        res.status(400).json({ error: 'La carga especificada no existe o está eliminada' });
        return;
      }
      if (tarifaData.id_zona && !zona) {
        await transaction.rollback();
        res.status(400).json({ error: 'La zona especificada no existe o está eliminada' });
        return;
      }
      if (tarifaData.id_transportista && !transportista) {
        await transaction.rollback();
        res.status(400).json({ error: 'El transportista especificado no existe o está eliminado' });
        return;
      }
    }

    await db.Tarifa.update(tarifaData, {
      where: { id_tarifa: id },
      transaction
    });

    if (adicionales !== undefined) {
      // Validar adicionales si se están actualizando
      if (Array.isArray(adicionales) && adicionales.length > 0) {
        const adicionalesIds = adicionales.map(a => a.id_adicional);
        const adicionalesActivos = await db.Adicional.findAll({
          where: { id_adicional: adicionalesIds }
        });

        if (adicionalesActivos.length !== adicionalesIds.length) {
          await transaction.rollback();
          res.status(400).json({ error: 'Uno o más adicionales especificados no existen o están eliminados' });
          return;
        }
      }

      await db.TarifaAdicional.destroy({
        where: { id_tarifa: id },
        transaction,
        force: true  // Eliminación física para evitar conflictos con índice único
      });

      if (Array.isArray(adicionales) && adicionales.length > 0) {
        const adicionalesData = adicionales.map((adicional: any) => ({
          id_tarifa: parseInt(id),
          id_adicional: adicional.id_adicional,
          costo_personalizado: adicional.costo_personalizado ?? null
        }));
        
        await db.TarifaAdicional.bulkCreate(adicionalesData, { transaction });
      }
    }

    await transaction.commit();

    const tarifaActualizada = await db.Tarifa.findByPk(id, {
      include: [
        {
          association: 'vehiculo',
          paranoid: false  // Incluir vehículos "eliminados"
        },
        {
          association: 'carga',
          include: [{
            association: 'tipoCarga',
            paranoid: false  // Incluir tipos de carga "eliminados"
          }]
        },
        {
          association: 'zona',
          paranoid: false  // Incluir zonas "eliminadas"
        },
        {
          association: 'transportista',
          paranoid: false  // Incluir transportistas "eliminados"
        },
        {
          association: 'adicionales',
          include: [{
            association: 'adicional',
            paranoid: false  // Incluir adicionales "eliminados"
          }]
        }
      ]
    });

    res.status(200).json( mapTarifa(tarifaActualizada) );

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteTarifa = async (req: Request, res: Response): Promise<void> => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;

    const tarifaAEliminar = await db.Tarifa.findByPk(id, {
      include: [
        {
          association: 'vehiculo',
          paranoid: false  // Incluir vehículos "eliminados"
        },
        {
          association: 'carga',
          include: [{
            association: 'tipoCarga',
            paranoid: false  // Incluir tipos de carga "eliminados"
          }]
        },
        {
          association: 'zona',
          paranoid: false  // Incluir zonas "eliminadas"
        },
        {
          association: 'transportista',
          paranoid: false  // Incluir transportistas "eliminados"
        },
        {
          association: 'adicionales',
          include: [{
            association: 'adicional',
            paranoid: false  // Incluir adicionales "eliminados"
          }]
        }
      ]
    });

    if (!tarifaAEliminar) {
      await transaction.rollback();
      res.status(404).json({ error: 'Tarifa no encontrada' });
      return;
    }


    await db.TarifaAdicional.destroy({
      where: { id_tarifa: id },
      transaction,
      force: true  // Eliminación física para consistencia
    });

    await db.Tarifa.destroy({
      where: { id_tarifa: id },
      transaction
    });

    await transaction.commit();

    res.status(200).json( mapTarifa(tarifaAEliminar) );

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const getVehiculoByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{ 
        association: 'vehiculo',
        paranoid: false  // Incluir vehículos "eliminados"
      }] 
    }) as any;;

    if (tarifa) 
      res.status(200).json(tarifa.vehiculo);
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getCargaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{
        association: 'carga',
        include: [{
          association: 'tipoCarga',
          paranoid: false  // Incluir tipos de carga "eliminados"
        }]
      }] 
    }) as any;

    if (tarifa) 
      res.status(200).json(tarifa.carga);
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTipoCargaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{
        association: 'carga',
        include: [{
          association: 'tipoCarga',
          paranoid: false  // Incluir tipos de carga "eliminados"
        }]
      }] 
    }) as any;

    if (tarifa) 
      res.status(200).json(tarifa.carga.tipoCarga);
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getZonaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{ 
        association: 'zona',
        paranoid: false  // Incluir zonas "eliminadas"
      }] 
    }) as any;;

    if (tarifa)  
      res.status(200).json(tarifa.zona);
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTransportistaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{ 
        association: 'transportista',
        paranoid: false  // Incluir transportistas "eliminados"
      }] 
    }) as any;;

    if (tarifa) 
      res.status(200).json(tarifa.transportista);
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAdicionalesByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{
        association: 'adicionales',
        include: [{
          association: 'adicional',
          paranoid: false  // Incluir adicionales "eliminados"
        }]
      }] 
    }) as any;;

    if (!tarifa)  
      res.status(404).json({ error: 'Tarifa no encontrada' });

    const adicionales = tarifa.adicionales.map((ad: any) => ({
      id: ad.adicional.id_adicional || ad.adicional.id,
      tipo: ad.adicional.tipo,
      costo: ad.costo_personalizado ?? ad.adicional.costo_default
    }));

    if (tarifa.adicionales.length === 0)  
      res.status(200).json({ message: "La tarifa no tiene adicionales" });
    else  
      res.status(200).json(adicionales);      
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


/* ************************************************************************************** */

function mapTarifa(tarifa: any) {
  return {
    id: tarifa.id_tarifa,
    valor_base: tarifa.valor_base,
    fecha: tarifa.fecha ? new Date(tarifa.fecha).toISOString().slice(0, 10) : null,
    id_vehiculo: tarifa.id_vehiculo,
    id_carga: tarifa.id_carga,
    id_zona: tarifa.id_zona,
    id_transportista: tarifa.id_transportista,
    adicionales: (tarifa.adicionales ?? []).map((a: any) => ({
      id: a.adicional?.id_adicional,
      tipo: a.adicional?.tipo,
      costo: a.costo_personalizado ?? a.adicional?.costo_default
    })),
    vehiculo: tarifa.vehiculo?.tipo || null,
    zona: tarifa.zona?.nombre || null,
    transportista: tarifa.transportista?.nombre || null,
    carga: tarifa.carga?.tipoCarga?.descripcion || null
  };
}

function mapTarifas(tarifas: any[]) {
  return tarifas.map(mapTarifa);
}
