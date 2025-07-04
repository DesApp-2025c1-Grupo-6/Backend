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
  const adicionales = await db.Adicional.findAll(); // trae tipo y costo_default

  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=reporte-adicionales.pdf'
  );

  doc.pipe(res);

  doc.fontSize(20).text('Reporte de Adicionales', { align: 'center' });
  doc.moveDown();
  doc
    .fontSize(12)
    .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
  doc.moveDown();
  doc.fontSize(14).text('Detalle de adicionales:', { underline: true });
  doc.moveDown();

  const startY = doc.y;
  doc
    .font('Helvetica-Bold')
    .text('Tipo', 50, startY)
    .text('Costo ($)', 400, startY);
  doc.font('Helvetica');

  let total = 0;
  let y = startY + 20;

  adicionales.forEach(({ tipo, costo_default }: any) => {
    doc.text(tipo, 50, y);
    doc.text(`$${costo_default.toFixed(2)}`, 400, y);
    y += 20;
    total += costo_default;
  });

  doc.moveDown().moveDown();
  doc
    .font('Helvetica-Bold')
    .text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  doc.end();
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
