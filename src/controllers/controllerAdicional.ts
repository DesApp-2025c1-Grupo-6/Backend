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

    const formatoMoneda = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    // Encabezado tabla
    let y = doc.y;
    doc
      .font('Helvetica-Bold')
      .text('Tipo', 50, y)
      .text('Costo ($)', 200, y)
      .text('# Tarifas', 300, y)
      .text('Subtotal', 400, y);
    doc.font('Helvetica');
    y += 20;

    let totalGeneral = 0;

    adicionales.forEach((adic: any) => {
      const tipo = adic.tipo;
      const costo = parseFloat(adic.costo_default) || 0;
      const cantidad = adic.TarifaAdicionals?.length || 0;
      const subtotal = costo * cantidad;
      totalGeneral += subtotal;

      if (y > doc.page.height - 50) {
        doc.addPage();
        y = 50;
      }

      doc
        .text(tipo, 50, y)
        .text(costo.toFixed(2), 200, y)
        .text(`${cantidad}`, 300, y)
        .text(formatoMoneda.format(subtotal), 400, y);

      y += 20;
    });

    y += 20;
    doc.moveTo(50, y).lineTo(550, y).stroke();
    y += 10;

    doc
      .font('Helvetica-Bold')
      .text('TOTAL GENERAL:', 300, y)
      .text(formatoMoneda.format(totalGeneral), 400, y);

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
