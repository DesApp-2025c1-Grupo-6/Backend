import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import db from '../models';

import { existeValorUnico } from '../middlewares/validacionesUnicas'; // ajustá la ruta


export const generarReporteAdicionalesPDF = async (
  req: Request,
  res: Response
) => {
  try {
    // Traer adicionales y sus tarifas asociadas
    const adicionales = await db.Adicional.findAll({
      attributes: ['id_adicional', 'tipo', 'costo_default', 'deletedAt'],
      include: [
        {
          model: db.TarifaAdicional,
          attributes: ['id_tarifa'],
        },
      ],
      paranoid: false,
    });

    // Iniciar PDF
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=reporte-adicionales.pdf'
    );
    doc.pipe(res);

 
    //*****************************************************************************
    
    // Encabezado
    doc.fontSize(20).text('Reporte de Adicionales', { align: 'center' });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.moveDown();
    doc
      .fontSize(14)
      .text('Adicionales utilizados en tarifas', { underline: true });
    doc.moveDown();
    doc.moveDown();

    // Formato para moneda
    const formatoMoneda = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    // Función para agregar encabezado de tabla
    const agregarEncabezadoTabla = (yPosition: number) => {
      doc
        .font('Helvetica-Bold')
        .text('Tipo', 40, yPosition)
        .text('Costo', 180, yPosition)
        .text('Utilizado en', 325, yPosition)
        .text('Estado', 505, yPosition);
      doc.font('Helvetica');
      return yPosition + 20;
    };


    let y = doc.y;
    
    if (adicionales.length === 0) {
      doc
        .font('Helvetica-Oblique')
        .fontSize(12)
        .text('No hay adicionales disponibles.', 50, y);
    } 
    else {
      // Encabezado de tabla inicial
      y = agregarEncabezadoTabla(y);

      adicionales.forEach((adic: any) => {
        const tipo = adic.tipo;
        const costo = parseFloat(adic.costo_default) || 0;
        const cantidad = adic.TarifaAdicionals?.length || 0;
        
        if (y > doc.page.height - 50) {
          doc.addPage();
          y = 50;
          // Repetir encabezado de tabla en la nueva página
          y = agregarEncabezadoTabla(y);         
        }
        

        const textoCantidad = `${cantidad} tarifa${cantidad === 1 ? '' : 's'}`;
        const estado = adic.deletedAt ? 'Deshabilitado' : 'Habilitado';
        const anchoPagina = doc.page.width;
        const margenDerecho = 40;
        const tamañoFuente = 12;
        const anchoTexto = doc.widthOfString(estado);
        const xEstado = anchoPagina - margenDerecho - anchoTexto;

        doc
          .text(tipo, 40, y)
          .text(formatoMoneda.format(costo), 165, y)
          .text(textoCantidad, 340, y)
          .text(estado, xEstado, y);
        y += 20;
      });
    }

    doc.end();
  } catch (error) {
    console.error('Error generando el PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error al generar el PDF' });
    }
  }
};



export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.status(200).json(adicional);
  } catch (error) {
    console.error('Error al obtener los adicionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAdicionalById = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) res.status(200).json(adicional);
    else res.status(404).json({ error: 'Adicional no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createAdicional = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.body;

    const yaExiste = await existeValorUnico(db.Adicional, 'tipo', tipo);
    if (yaExiste) {
      res.status(400).json({ error: 'Ya existe un adicional con ese tipo' });
      return;
    }

    const nuevoAdicional = await db.Adicional.create(req.body);
    res.status(201).json(nuevoAdicional);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      const costoAnterior = adicional.costo_default;
      await adicional.update(req.body);
      
      if (req.body.costo_default !== undefined && req.body.costo_default !== costoAnterior) {
        await registrarCambioAdicional(adicional.id_adicional, costoAnterior, req.body.costo_default);
      }
      
      res.status(200).json(adicional);
    } else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      await adicional.destroy();
      res.status(200).json(adicional);
    } else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error: any) {
    console.error('Error al eliminar adicional:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


/* ************************************************************************************** */
/* ************************************************************************************** */
export async function registrarCambioAdicional(
  idAdicional: number,
  costoAnteriorDefault: number,
  nuevoCostoDefault: number
) {
  const tarifasConAdicional = await db.Tarifa.findAll({
    include: [
      {
        model: db.TarifaAdicional,
        as: 'adicionales',
        where: {
          id_adicional: idAdicional,
          costo_personalizado: null
        },
        include: [
          {
            model: db.Adicional,
            as: 'adicional'
          }
        ]
      },
      { model: db.Vehiculo, as: 'vehiculo' },
      { model: db.Zona, as: 'zona' },
      { model: db.Transportista, as: 'transportista' },
      {
        model: db.Carga,
        as: 'carga',
        include: [{ model: db.TipoCarga, as: 'tipoCarga' }]
      }
    ]
  });

  for (const tarifa of tarifasConAdicional) {
    const tarifaMapeada = mapTarifa(tarifa);

    const adicionalesAnterior = tarifaMapeada.adicionales.map((a: any) => ({
      id: a.id,
      tipo: a.tipo,
      costo: a.id === idAdicional ? costoAnteriorDefault.toString() : a.costo
    }));

    const adicionalesNuevo = tarifaMapeada.adicionales.map((a: any) => ({
      id: a.id,
      tipo: a.tipo,
      costo: a.id === idAdicional ? nuevoCostoDefault.toString() : a.costo
    }));

    const cambios = {
      adicionales: {
        anterior: adicionalesAnterior,
        nuevo: adicionalesNuevo
      }
    };


    await db.HistoricoTarifa.create({
      idTarifa: tarifa.id_tarifa,
      fecha: new Date(),
      data: tarifaMapeada,
      cambios,
      accion: 'MODIFICACION'
    });
  }
}

function mapTarifa(tarifa: any) {
  return {
    id: tarifa.id_tarifa,
    valor_base: tarifa.valor_base,
    fecha: tarifa.fecha
      ? new Date(tarifa.fecha).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      : null,
    id_vehiculo: tarifa.id_vehiculo,
    id_carga: tarifa.id_carga,
    id_zona: tarifa.id_zona,
    id_transportista: tarifa.id_transportista,
    adicionales: (tarifa.adicionales ?? []).map((a: any) => ({
      id: a.adicional?.id_adicional,
      tipo: a.adicional?.tipo,
      costo: a.costo_personalizado ?? a.adicional?.costo_default,
    })),
    vehiculo: tarifa.vehiculo?.tipo || null,
    zona: tarifa.zona?.nombre || null,
    transportista: tarifa.transportista?.nombre || null,
    carga: tarifa.carga?.tipoCarga?.descripcion || null,
  };
}