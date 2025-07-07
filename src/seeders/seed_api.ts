// Este archivo seed_api.ts carga los mismos datos que seed.ts pero usando los endpoints HTTP de la API.
// Asegúrate de que el servidor esté corriendo antes de ejecutar este script.
// Requiere: axios (npm install axios)

const API_URL = "http://localhost:3000"; // Cambia el puerto si tu backend usa otro

// Utilidad para hacer requests HTTP sin axios
async function post(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json().catch(() => ({}));
}

async function seed() {
  // Zonas
  await post(`${API_URL}/zonas`, {
    nombre: "AMBA (Área Metropolitana de Buenos Aires)",
  });
  await post(`${API_URL}/zonas`, { nombre: "GBA (Gran Buenos Aires)" });
  await post(`${API_URL}/zonas`, {
    nombre: "CABA (Ciudad Autónoma de Buenos Aires)",
  });
  await post(`${API_URL}/zonas`, { nombre: "BsAs - Rosario" });
  await post(`${API_URL}/zonas`, { nombre: "BsAs - Mendoza" });
  await post(`${API_URL}/zonas`, { nombre: "BsAs - Córdoba" });

  // Vehiculos
  await post(`${API_URL}/vehiculos`, { tipo: "Camioneta", toneladas: 0.5 });
  await post(`${API_URL}/vehiculos`, { tipo: "Camion Chico", toneladas: 2 });
  await post(`${API_URL}/vehiculos`, { tipo: "Camión Mediano", toneladas: 5 });
  await post(`${API_URL}/vehiculos`, { tipo: "Camión Grande", toneladas: 12 });

  // Transportistas
  await post(`${API_URL}/transportistas`, {
    nombre: "Logística del Litoral SA",
    telefono: "11-1234-1234",
    email: "contacto@logisticalitoral.com.ar",
  });
  await post(`${API_URL}/transportistas`, {
    nombre: "Transportes Rápidos SRL",
    telefono: "11-0000-1234",
    email: "info@transportesrapidos.com.ar",
  });
  await post(`${API_URL}/transportistas`, {
    nombre: "Fletexpress SA",
    telefono: "11-1111-2222",
  });
  await post(`${API_URL}/transportistas`, {
    nombre: "Don Pedro SRL",
    telefono: "11-9876-6543",
    email: "donpedro.srl@gmail.com",
  });

  // Tipos de carga
  await post(`${API_URL}/tipocargas`, { descripcion: "Regular" });
  await post(`${API_URL}/tipocargas`, { descripcion: "Peligrosa" });
  await post(`${API_URL}/tipocargas`, { descripcion: "Frágil" });
  await post(`${API_URL}/tipocargas`, { descripcion: "Refrigerada" });
  await post(`${API_URL}/tipocargas`, { descripcion: "Sobredimensionada" });

  // Cargas
  await post(`${API_URL}/cargas`, {
    peso: 3000,
    volumen: 15,
    requisitos_especiales: "Ninguno",
    id_tipo_carga: 1,
  });
  await post(`${API_URL}/cargas`, {
    peso: 1000,
    volumen: 7,
    requisitos_especiales: "Manipulación delicada",
    id_tipo_carga: 3,
  });
  await post(`${API_URL}/cargas`, {
    peso: 500,
    volumen: 4,
    requisitos_especiales: "Ninguno",
    id_tipo_carga: 1,
  });
  await post(`${API_URL}/cargas`, {
    peso: 600,
    volumen: 10,
    requisitos_especiales: "Elementos inflamables, señalización y extintor",
    id_tipo_carga: 2,
  });
  await post(`${API_URL}/cargas`, {
    peso: 7100,
    volumen: 25,
    requisitos_especiales: "Refrigeración constante a 4°C",
    id_tipo_carga: 4,
  });
  await post(`${API_URL}/cargas`, {
    peso: 12700,
    volumen: 42,
    requisitos_especiales: "Grúa para carga y descarga",
    id_tipo_carga: 5,
  });

  // Adicionales
  await post(`${API_URL}/adicionales`, {
    tipo: "Ayudante",
    costo_default: 8500,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Carga peligrosa",
    costo_default: 18000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Horario nocturno",
    costo_default: 12000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Almuerzo",
    costo_default: 2000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Estadía",
    costo_default: 18000,
  });
  await post(`${API_URL}/adicionales`, { tipo: "Peajes", costo_default: 7500 });
  await post(`${API_URL}/adicionales`, {
    tipo: "Monitoreo satelital",
    costo_default: 5500,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Carga y descarga manual",
    costo_default: 9000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Seguro adicional",
    costo_default: 7000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Permiso municipal",
    costo_default: 3500,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Esperas prolongadas",
    costo_default: 6000,
  });
  await post(`${API_URL}/adicionales`, {
    tipo: "Embalaje especial",
    costo_default: 8000,
  });

  // Tarifas
  await post(`${API_URL}/tarifas`, {
    valor_base: 45000,
    fecha: "2025-07-05",
    id_vehiculo: 3,
    id_carga: 1,
    id_zona: 1,
    id_transportista: 1,
    adicionales: [
      { id_adicional: 1, costo_personalizado: 9000 }, // Ayudante
      { id_adicional: 2 }, // Carga peligrosa
      { id_adicional: 4 }, // Almuerzo
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 95000,
    fecha: "2024-06-01",
    id_vehiculo: 4,
    id_carga: 1,
    id_zona: 4,
    id_transportista: 2,
    adicionales: [
      { id_adicional: 3 }, // Horario nocturno
      { id_adicional: 5, costo_personalizado: 20000 }, // Estadía
      { id_adicional: 6 }, // Peajes
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 115000,
    fecha: "2025-01-05",
    id_vehiculo: 4,
    id_carga: 5,
    id_zona: 3,
    id_transportista: 3,
    adicionales: [
      { id_adicional: 7 }, // Monitoreo satelital
      { id_adicional: 8 }, // Carga y descarga manual
      { id_adicional: 9, costo_personalizado: 8000 }, // Seguro adicional
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 67000,
    fecha: "2024-09-15",
    id_vehiculo: 2,
    id_carga: 2,
    id_zona: 2,
    id_transportista: 4,
    adicionales: [
      { id_adicional: 1 }, // Ayudante
      { id_adicional: 10 }, // Permiso municipal
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 82000,
    fecha: "2024-11-20",
    id_vehiculo: 1,
    id_carga: 3,
    id_zona: 5,
    id_transportista: 1,
    adicionales: [
      { id_adicional: 2 }, // Carga peligrosa
      { id_adicional: 11 }, // Esperas prolongadas
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 123000,
    fecha: "2025-03-10",
    id_vehiculo: 3,
    id_carga: 6,
    id_zona: 6,
    id_transportista: 2,
    adicionales: [
      { id_adicional: 4 }, // Almuerzo
      { id_adicional: 12 }, // Embalaje especial
      { id_adicional: 9 }, // Seguro adicional
    ],
  });
  // Tarifas adicionales de ejemplo
  await post(`${API_URL}/tarifas`, {
    valor_base: 56000,
    fecha: "2024-08-12",
    id_vehiculo: 2,
    id_carga: 4,
    id_zona: 2,
    id_transportista: 3,
    adicionales: [
      { id_adicional: 3 }, // Horario nocturno
      { id_adicional: 8 }, // Carga y descarga manual
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 99000,
    fecha: "2024-10-22",
    id_vehiculo: 4,
    id_carga: 5,
    id_zona: 5,
    id_transportista: 4,
    adicionales: [
      { id_adicional: 5 }, // Estadía
      { id_adicional: 6 }, // Peajes
      { id_adicional: 12 }, // Embalaje especial
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 72000,
    fecha: "2025-02-14",
    id_vehiculo: 1,
    id_carga: 2,
    id_zona: 3,
    id_transportista: 2,
    adicionales: [
      { id_adicional: 7 }, // Monitoreo satelital
      { id_adicional: 10 }, // Permiso municipal
    ],
  });
  await post(`${API_URL}/tarifas`, {
    valor_base: 105000,
    fecha: "2025-04-01",
    id_vehiculo: 3,
    id_carga: 6,
    id_zona: 4,
    id_transportista: 1,
    adicionales: [
      { id_adicional: 11 }, // Esperas prolongadas
      { id_adicional: 12 }, // Embalaje especial
      { id_adicional: 1 }, // Ayudante
    ],
  });
}

seed()
  .then(() => {
    console.log("Datos cargados exitosamente a través de la API.");
  })
  .catch((err) => {
    console.error("Error al cargar datos:", err.message);
  });
