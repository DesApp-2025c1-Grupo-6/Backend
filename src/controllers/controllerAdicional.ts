import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import db from '../models';

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
    // Traer adicionales y sus tarifas asociadas
    const adicionales = await db.Adicional.findAll({
      attributes: ['id_adicional', 'tipo', 'costo_default'],
      include: [
        {
          model: db.TarifaAdicional,
          attributes: ['id_tarifa'],
        },
      ],
    });

    // Iniciar PDF
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=reporte-adicionales.pdf'
    );
    doc.pipe(res);

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

    // Formato para moneda
    const formatoMoneda = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    // Encabezado de tabla
    let y = doc.y;
    doc
      .font('Helvetica-Bold')
      .text('Tipo', 50, y)
      .text('Costo ($)', 250, y)
      .text('Cant. de veces utilizado', 400, y, { width: 200 });
    doc.font('Helvetica');
    y += 20;

    // Recorrer adicionales
    adicionales.forEach((adic: any) => {
      const tipo = adic.tipo;
      const costo = parseFloat(adic.costo_default) || 0;
      const cantidad = adic.TarifaAdicionals?.length || 0;

      if (y > doc.page.height - 50) {
        doc.addPage();
        y = 50;
      }

      doc
        .text(tipo, 50, y)
        .text(formatoMoneda.format(costo), 250, y)
        .text(`${cantidad}`, 400, y);

      y += 20;
    });

    doc.end();
  } catch (error) {
    console.error('Error generando el PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error al generar el PDF' });
    }
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
    console.error('Error al eliminar adicional:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
