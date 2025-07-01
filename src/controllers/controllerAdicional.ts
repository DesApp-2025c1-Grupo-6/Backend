import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import db from '../models';
import { ForeignKeyConstraintError } from 'sequelize';

export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.status(200).json(adicional);
  } catch (error) {
    console.error('Error al obtener los adicionales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const generarReporteAdicionalesPDF = async (
  req: Request,
  res: Response
) => {
  try {
    // Trae todos los adicionales con su tipo y costo base
    const adicionales = await db.Adicional.findAll();

    // Ranking de adicionales según la cantidad de tarifas en que se usan
    const rankingAdicionales = await db.Adicional.findAll({
      attributes: [
        'id_adicional',
        'tipo',
        [
          db.sequelize.fn(
            'COUNT',
            db.sequelize.col('TarifaAdicionals.id_tarifa')
          ),
          'cantidad_tarifas',
        ],
      ],
      include: [
        {
          model: db.TarifaAdicional,
          attributes: [],
        },
      ],
      group: ['Adicional.id_adicional'],
      order: [[db.sequelize.literal('cantidad_tarifas'), 'DESC']],
    });

    // Inicia PDF
    const doc = new PDFDocument({ margin: 40, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=reporte-adicionales.pdf'
    );

    doc.pipe(res);

    // Título
    doc.fontSize(20).text('Reporte de Adicionales', { align: 'center' });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
    doc.moveDown();

    // Sección 1: Detalle de adicionales
    doc.fontSize(14).text('Detalle de adicionales:', { underline: true });
    doc.moveDown();

    const formatoMoneda = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    // Cabecera tabla
    const startY = doc.y;
    doc
      .font('Helvetica-Bold')
      .text('Tipo', 50, startY)
      .text('Costo ($)', 400, startY);
    doc.font('Helvetica');

    let total = 0;
    let y = startY + 20;

    adicionales.forEach(({ tipo, costo_default }: any) => {
      const costo = Number(costo_default) || 0; // convertir a número y si da NaN poner 0
      doc.text(tipo, 50, y);
      doc.text(`$${costo.toFixed(2)}`, 400, y);
      y += 20;
      total += costo;

      // Salto de página si es necesario
      if (y > doc.page.height - 50) {
        doc.addPage();
        y = 50;
      }
    });

    doc.moveDown().moveDown();
    doc
      .font('Helvetica-Bold')
      .text(`Total: ${formatoMoneda.format(total)}`, { align: 'right' });

    // Sección 2: Ranking de uso
    doc.addPage();
    doc
      .moveDown()
      .fontSize(14)
      .text('Cantidad de adicionales utilizados por tarifa', {
        underline: true,
      });
    doc.moveDown();

    y = doc.y;
    doc
      .font('Helvetica-Bold')
      .text('Tipo', 50, y)
      .text('Usado en tarifas', 300, y);
    doc.font('Helvetica');
    y += 20;

    rankingAdicionales.forEach((adic: any) => {
      doc.text(adic.tipo, 50, y);
      doc.text(`${adic.get('cantidad_tarifas')} tarifa(s)`, 300, y);
      y += 20;

      if (y > doc.page.height - 50) {
        doc.addPage();
        y = 50;
      }
    });

    doc.end();
  } catch (error) {
    console.error('Error generando el PDF:', error);
    res.status(500).json({ error: 'Error al generar el PDF' });
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
      await adicional.update(req.body);
      res.status(200).json(adicional);
    } else {
      res.status(404).json({ error: 'Adicional no encontrado' });
    }
  } catch (error) {
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
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({
        error: 'No se puede eliminar porque está asociado a una tarifa',
      });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
