import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import db from "../models";

import { existeValorUnico } from "../middlewares/validacionesUnicas"; // ajustá la ruta

export const generarReporteAdicionalesPDF = async (
  req: Request,
  res: Response
) => {
  try {
    // Obtener adicionales y sus tarifas asociadas
    const adicionales = await db.Adicional.findAll({
      attributes: [
        "id_adicional",
        "tipo",
        "costo_default",
        "deletedAt",
        [
          db.Sequelize.fn(
            "COUNT",
            db.Sequelize.col("TarifaAdicionals.id_tarifa")
          ),
          "cantidad_apariciones",
        ],
      ],
      include: [
        {
          model: db.TarifaAdicional,
          attributes: [],
        },
      ],
      group: ["Adicional.id_adicional"],
      paranoid: false,
    });

    // Iniciar PDF
    const pdf = new PDFDocument({ margin: 40, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte-adicionales.pdf"
    );
    pdf.pipe(res);

    // Encabezado
    pdf.fontSize(20).text("Reporte de Adicionales", { align: "center" });
    pdf.moveDown();
    pdf
      .fontSize(12)
      .text(`Fecha: ${new Date().toLocaleDateString()}`, { align: "right" });
    pdf.moveDown();
    pdf
      .fontSize(14)
      .text("Adicionales utilizados en tarifas", { underline: true });
    pdf.moveDown();
    pdf.moveDown();

    // Formato para moneda
    const formatoMoneda = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

    // Definir posiciones de columnas para mejor alineación
    const colTipo = 40;
    const colCosto = 240; // Aumentado para dar más espacio a la columna de Tipo
    const colUtilizado = 340;
    const colEstado = 460;

    // Función para agregar encabezado de tabla
    const agregarEncabezadoTabla = (yPos: number) => {
      pdf
        .font("Helvetica-Bold")
        .text("Tipo", colTipo, yPos, { width: colCosto - colTipo - 10 })
        .text("Costo", colCosto, yPos, {
          width: colUtilizado - colCosto - 10,
          align: "right",
        })
        .text("Utilizado en", colUtilizado, yPos, {
          width: colEstado - colUtilizado - 10,
          align: "right",
        })
        .text("Estado", colEstado, yPos, { align: "right" });
      pdf.font("Helvetica");
      return yPos + 20;
    };

    let posicionY = pdf.y;

    // Verificar si hay adicionales
    if (adicionales.length === 0) {
      pdf
        .font("Helvetica-Oblique")
        .fontSize(12)
        .text("No hay adicionales disponibles.", 50, posicionY);
      pdf.end();
      return;
    }

    // Ordenar descendente por la columna cantidad_apariciones
    adicionales.sort((a, b) => {
      const countA = Number(a.get("cantidad_apariciones"));
      const countB = Number(b.get("cantidad_apariciones"));
      if (countA > countB) return -1;
      if (countA < countB) return 1;
      return 0;
    });

    // Encabezado de tabla inicial
    posicionY = agregarEncabezadoTabla(posicionY);

    adicionales.forEach((adicional: any) => {
      const tipoAdicional = adicional.tipo;
      const costoAdicional = parseFloat(adicional.costo_default) || 0;
      const cantidadTarifas =
        Number(adicional.get("cantidad_apariciones")) || 0;

      if (posicionY > pdf.page.height - 50) {
        pdf.addPage();
        posicionY = 50;
        // Repetir encabezado de tabla en la nueva página
        posicionY = agregarEncabezadoTabla(posicionY);
      }

      const textoCantidadTarifas = `${cantidadTarifas} tarifa${
        cantidadTarifas === 1 ? "" : "s"
      }`;
      const estadoAdicional = adicional.deletedAt
        ? "Deshabilitado"
        : "Habilitado";

      pdf
        .text(tipoAdicional, colTipo, posicionY, {
          width: colCosto - colTipo - 10,
        })
        .text(formatoMoneda.format(costoAdicional), colCosto, posicionY, {
          width: colUtilizado - colCosto - 10,
          align: "right",
        })
        .text(textoCantidadTarifas, colUtilizado, posicionY, {
          width: colEstado - colUtilizado - 10,
          align: "right",
        })
        .text(estadoAdicional, colEstado, posicionY, { align: "right" });
      posicionY += 20;
    });

    pdf.end();
  } catch (error) {
    console.error("Error generando el PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error al generar el PDF" });
    }
  }
};

export const getAllAdicionales = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findAll();
    res.status(200).json(adicional);
  } catch (error) {
    console.error("Error al obtener los adicionales:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const getAdicionalById = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) res.status(200).json(adicional);
    else res.status(404).json({ error: "Adicional no encontrado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const createAdicional = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.body;

    // Buscar si existe un adicional eliminado (soft deleted) con los mismos atributos
    const adicionalEliminado = await db.Adicional.findOne({
      where: {
        tipo,
      },
      paranoid: false,
    });

    if (adicionalEliminado && adicionalEliminado.deletedAt) {
      // Si existe y está eliminado, lo restauramos
      await adicionalEliminado.restore();
      // Opcionalmente, actualizar otros campos si cambiaron
      await adicionalEliminado.update(req.body);
      res.status(200).json(adicionalEliminado);
      return;
    }

    // Verificar unicidad por tipo (no debe haber uno activo)
    const yaExiste = await existeValorUnico(db.Adicional, "tipo", tipo);
    if (yaExiste) {
      res.status(400).json({ error: "Ya existe un adicional con ese tipo" });
      return;
    }

    // Crear nuevo adicional
    const nuevoAdicional = await db.Adicional.create(req.body);
    res.status(201).json(nuevoAdicional);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const updateAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      const costoAnterior = adicional.costo_default;
      await adicional.update(req.body);

      if (
        req.body.costo_default !== undefined &&
        req.body.costo_default !== costoAnterior
      ) {
        await registrarCambioAdicional(
          adicional.id_adicional,
          costoAnterior,
          req.body.costo_default
        );
      }

      res.status(200).json(adicional);
    } else {
      res.status(404).json({ error: "Adicional no encontrado" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
  }
};

export const deleteAdicional = async (req: Request, res: Response) => {
  try {
    const adicional = await db.Adicional.findByPk(req.params.id);
    if (adicional) {
      await adicional.destroy();
      res.status(200).json(adicional);
    } else {
      res.status(404).json({ error: "Adicional no encontrado" });
    }
  } catch (error: any) {
    console.error("Error al eliminar adicional:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor. Detalle: " + error });
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
        as: "adicionales",
        where: {
          id_adicional: idAdicional,
          costo_personalizado: null,
        },
        include: [
          {
            model: db.Adicional,
            as: "adicional",
          },
        ],
      },
      { model: db.Vehiculo, as: "vehiculo" },
      { model: db.Zona, as: "zona" },
      { model: db.Transportista, as: "transportista" },
      {
        model: db.Carga,
        as: "carga",
        include: [{ model: db.TipoCarga, as: "tipoCarga" }],
      },
    ],
  });

  for (const tarifa of tarifasConAdicional) {
    const tarifaMapeada = mapTarifa(tarifa);

    const adicionalesAnterior = tarifaMapeada.adicionales.map((a: any) => ({
      id: a.id,
      tipo: a.tipo,
      costo: a.id === idAdicional ? costoAnteriorDefault.toString() : a.costo,
    }));

    const adicionalesNuevo = tarifaMapeada.adicionales.map((a: any) => ({
      id: a.id,
      tipo: a.tipo,
      costo: a.id === idAdicional ? nuevoCostoDefault.toString() : a.costo,
    }));

    const cambios = {
      adicionales: {
        anterior: adicionalesAnterior,
        nuevo: adicionalesNuevo,
      },
    };

    await db.HistoricoTarifa.create({
      idTarifa: tarifa.id_tarifa,
      fecha: new Date(),
      data: tarifaMapeada,
      cambios,
      accion: "MODIFICACION",
    });
  }
}

function mapTarifa(tarifa: any) {
  return {
    id: tarifa.id_tarifa,
    valor_base: tarifa.valor_base,
    fecha: tarifa.fecha
      ? new Date(tarifa.fecha).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
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
