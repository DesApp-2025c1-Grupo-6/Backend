// src/routes/pdf.ts
import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

type Adicional = {
  adicional: string;
  costo: number;
};
export const generarReporteAdicionales = (req: Request, res: Response) => {
  const adicionales: Adicional[] = req.body; // [{ adicional: string, costo: number }]

  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=reporte-adicionales.pdf'
  );

  doc.pipe(res);

  // Título del reporte
  doc.fontSize(20).text('Reporte de Adicionales', { align: 'center' });
  doc.moveDown();
  doc
    .fontSize(12)
    .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });

  doc.moveDown();
  doc
    .fontSize(14)
    .text('Detalle de adicionales seleccionados:', { underline: true });
  doc.moveDown();

  // Encabezado de tabla
  const startY = doc.y;
  doc.font('Helvetica-Bold');
  doc.text('Adicional', 50, startY);
  doc.text('Costo ($)', 400, startY);
  doc.moveDown();
  doc.font('Helvetica');

  let total = 0;
  let y = startY + 20;

  adicionales.forEach(({ adicional, costo }) => {
    doc.text(adicional, 50, y);
    doc.text(`$${costo.toFixed(2)}`, 400, y);
    y += 20;
    total += costo;
  });

  doc.moveDown().moveDown();
  doc
    .font('Helvetica-Bold')
    .text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  doc.end();
};
