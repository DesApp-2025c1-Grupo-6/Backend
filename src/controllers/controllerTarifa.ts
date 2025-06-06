import { Request, Response } from 'express';
import db from '../models';

export const getAllTarifas = async (_req: Request, res: Response) => {
  try {
    const tarifas = await db.Tarifa.findAll({
      include: [
        'vehiculo',
        {
          association: 'carga',
          include: ['tipoCarga']
        },
        'zona',
        'transportista',
        {
          association: 'adicionales',
          include: ['adicional']
        },
      ],
    });

    res.json(mapTarifas(tarifas));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tarifas' });
  }
};

export const getTarifaById = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [
        'vehiculo',
        'zona',
        'transportista',
        {
          association: 'carga',
          include: ['tipoCarga']
        },
        {
          association: 'adicionales',
          include: ['adicional']
        },
      ] 
    });

    if (tarifa) 
      res.status(200).json(mapTarifa(tarifa));
    else 
      res.status(404).json({ error: 'Tarifa no encontrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la tarifa' });
  }
};

export const createTarifa = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction(); 

  try {
    const { adicionales, ...tarifaData } = req.body;

    const nuevaTarifa = await db.Tarifa.create(tarifaData, { transaction: transaction });

    if (Array.isArray(adicionales) && adicionales.length > 0) { 
      
       const adicionalesData = adicionales.map((adicional: any) => ({
        id_tarifa: nuevaTarifa.id_tarifa,
        id_adicional: adicional.id_adicional,
        costo_personalizado: adicional.costo_personalizado || null
      }));
      
      await db.TarifaAdicional.bulkCreate(adicionalesData, { transaction:transaction });
    }
    await transaction.commit();
    
    const tarifa = await db.Tarifa.findByPk(nuevaTarifa.id_tarifa, {
      include: [
        'vehiculo',
        {
          association: 'carga',
          include: ['tipoCarga']
        },
        'zona',
        'transportista',
        {
          association: 'adicionales',
          include: ['adicional']
        }
      ]
    });

    res.status(201).json( mapTarifa(tarifa) );
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarifa' });
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

    await db.Tarifa.update(tarifaData, {
      where: { id_tarifa: id },
      transaction
    });

    if (adicionales !== undefined) {
      await db.TarifaAdicional.destroy({
        where: { id_tarifa: id },
        transaction
      });

      if (Array.isArray(adicionales) && adicionales.length > 0) {
        const adicionalesData = adicionales.map((adicional: any) => ({
          id_tarifa: parseInt(id),
          id_adicional: adicional.id_adicional,
          costo_personalizado: adicional.costo_personalizado || null
        }));
        
        await db.TarifaAdicional.bulkCreate(adicionalesData, { transaction });
      }
    }

    await transaction.commit();

    const tarifaActualizada = await db.Tarifa.findByPk(id, {
      include: [
        'vehiculo',
        {
          association: 'carga',
          include: ['tipoCarga']
        },
        'zona',
        'transportista',
        {
          association: 'adicionales',
          include: ['adicional']
        }
      ]
    });

    res.status(200).json( mapTarifa(tarifaActualizada) );

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarifa' });
  }
};

export const deleteTarifa = async (req: Request, res: Response): Promise<void> => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;

    const tarifaAEliminar = await db.Tarifa.findByPk(id, {
      include: [
        'vehiculo',
        {
          association: 'carga',
          include: ['tipoCarga']
        },
        'zona',
        'transportista',
        {
          association: 'adicionales',
          include: ['adicional']
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
      transaction
    });

    await db.Tarifa.destroy({
      where: { id_tarifa: id },
      transaction
    });

    await transaction.commit();

    res.status(200).json( mapTarifa(tarifaAEliminar) );

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la tarifa' });
  }
};


export const getVehiculoByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [ 'vehiculo' ] 
    }) as any;;

    if (tarifa.vehiculo) 
      res.status(200).json(tarifa.vehiculo);
    else 
      res.status(404).json({ error: 'Tarifa o vehículo no encontrados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el vehículo de la tarifa' });
  }
};

export const getCargaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [ 'carga', {
          association: 'carga',
          include: ['tipoCarga']
        } ] 
    }) as any;

    if (tarifa.carga) 
      res.status(200).json(tarifa.carga);
    else 
      res.status(404).json({ error: 'Tarifa o carga no encontradas' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la carga de la tarifa' });
  }
};

export const getTipoCargaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [ {
          association: 'carga',
          include: ['tipoCarga']
        } ] 
    }) as any;

    if (tarifa.carga.tipoCarga) 
      res.status(200).json(tarifa.carga.tipoCarga);
    else 
      res.status(404).json({ error: 'Tarifa o tipo de carga no encontrados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el tipo de carga de la tarifa' });
  }
};

export const getZonaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [ 'zona' ] 
    }) as any;;

    if (tarifa.zona) 
      res.status(200).json(tarifa.zona);
    else 
      res.status(404).json({ error: 'Tarifa o zona no encontradas' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la zona de la tarifa' });
  }
};

export const getTransportistaByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [ 'transportista' ] 
    }) as any;;

    if (tarifa.transportista) 
      res.status(200).json(tarifa.transportista);
    else 
      res.status(404).json({ error: 'Tarifa o transportista no encontrados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el transportista de la tarifa' });
  }
};

export const getAdicionalesByTarifa = async (req: Request, res: Response) => {
  try {
    const tarifa = await db.Tarifa.findByPk(req.params.id, { 
      include: [{
        association: 'adicionales',
        include: ['adicional']
      }] 
    }) as any;;

    const adicionales = tarifa.adicionales.map((ad: any) => ({
      id: ad.adicional.id_adicional || ad.adicional.id,
      tipo: ad.adicional.tipo,
      costo: ad.costo_personalizado ?? ad.adicional.costo_default
    }));

    if (tarifa.adicionales) 
      res.status(200).json(adicionales);
    else 
      res.status(404).json({ error: 'Tarifa o adicionales no encontrados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los adicionales de la tarifa' });
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
