import db from '../models';

async function seed() {
  await db.sequelize.sync({ force: true }); 

  await db.Zona.bulkCreate([
    { nombre: 'AMBA (Área Metropolitana de Buenos Aires)' },
    { nombre: 'GBA (Gran Buenos Aires)' },
    { nombre: 'CABA (Ciudad Autónoma de Buenos Aires)' },
    { nombre: 'BsAs - Rosario' },
    { nombre: 'BsAs - Mendoza' },
    { nombre: 'BsAs - Córdoba' }
  ]);

  await db.Vehiculo.bulkCreate([
    { tipo: 'Camioneta', toneladas: 0.5 },
    { tipo: 'Camion Chico', toneladas: 2 },
    { tipo: 'Camión Mediano', toneladas: 5 },
    { tipo: 'Camión Grande', toneladas: 12 }
  ]);

  await db.Transportista.bulkCreate([
    { nombre: 'Logística del Litoral SA' },
    { nombre: 'Transportes Rápidos SRL' },
    { nombre: 'Fletexpress SA' },
    { nombre: 'Don Pedro SRL' }
  ]);

  await db.TipoCarga.bulkCreate([
    { descripcion: 'Regular' },
    { descripcion: 'Peligrosa' },
    { descripcion: 'Frágil' },
    { descripcion: 'Refrigerada' },
    { descripcion: 'Sobredimensionada' },
  ]);

  await db.Carga.bulkCreate([
    { peso: 3000, volumen: 15, requisitos_especiales: "Ninguno", id_tipo_carga: 1 },
    { peso: 1000, volumen: 7, requisitos_especiales: "Manipulación delicada", id_tipo_carga: 3 },
    { peso: 500, volumen: 4, requisitos_especiales: "Ninguno", id_tipo_carga: 1 },
    { peso: 600, volumen: 10, requisitos_especiales: "Elementos inflamables, señalización y extintor", id_tipo_carga: 2 },
    { peso: 7100, volumen: 25, requisitos_especiales: "Refrigeración constante a 4°C", id_tipo_carga: 4 },
    { peso: 12700, volumen: 42, requisitos_especiales: "Grúa para carga y descarga", id_tipo_carga: 5 }
  ]);

  await db.Adicional.bulkCreate([
    { tipo: 'Ayudante', costo_default: 8500 },
    { tipo: 'Carga peligrosa', costo_default: 18000 },
    { tipo: 'Horario nocturno', costo_default: 12000 },
    { tipo: 'Almuerzo', costo_default: 2000 },
    { tipo: 'Estadía', costo_default: 18000 },
    { tipo: 'Peajes', costo_default: 7500 },
    { tipo: 'Monitoreo satelital', costo_default: 5500 }
  ]);

  await db.Tarifa.bulkCreate([
    {
      valor_base: 45000,
      fecha: new Date(),
      id_vehiculo: 3,
      id_carga: 1,
      id_zona: 1,
      id_transportista: 1
    },
    {
      valor_base: 95000,
      fecha: new Date('2024-06-01'),
      id_vehiculo: 4,
      id_carga: 1,
      id_zona: 4,
      id_transportista: 2
    },
    {
      valor_base: 115000,
      fecha: new Date('2025-01-05'),
      id_vehiculo: 4,
      id_carga: 5,
      id_zona: 3,
      id_transportista: 3
    }
  ]);

  const adicionales = await db.Adicional.findAll();

  function getCostoDefault(adicionalID: number): number | null {
    const adicional = adicionales.find(a => a.id_adicional === adicionalID);
    return adicional ? adicional.costo_default : null;
  }

  await db.TarifaAdicional.bulkCreate([
    { id_tarifa: 1, id_adicional: 1, costo_personalizado: 9500 },
    { id_tarifa: 1, id_adicional: 5, costo_personalizado: getCostoDefault(5) },
    { id_tarifa: 1, id_adicional: 6, costo_personalizado: getCostoDefault(6) },
    { id_tarifa: 2, id_adicional: 1, costo_personalizado: getCostoDefault(1) },
    { id_tarifa: 2, id_adicional: 2, costo_personalizado: getCostoDefault(2) },
    { id_tarifa: 2, id_adicional: 3, costo_personalizado: getCostoDefault(3) },
    { id_tarifa: 3, id_adicional: 4, costo_personalizado: getCostoDefault(4) },
    { id_tarifa: 3, id_adicional: 6, costo_personalizado: 16000 }
  ]);

  console.log('Datos cargados correctamente.');
  await db.sequelize.close();
}

seed().catch(console.error); 
