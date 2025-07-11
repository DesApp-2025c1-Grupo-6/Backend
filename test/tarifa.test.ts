import request from 'supertest';
import app from '../src/app';
import { casosDeErrorID } from './data/id.data';
import { datos } from './data/tarifa.data';
import { Tarifa } from '../src/models/tarifa';
import { Vehiculo } from '../src/models/vehiculo';
import { Carga } from '../src/models/carga';
import { Zona } from '../src/models/zona';
import { Transportista } from '../src/models/transportista';
import { TipoCarga } from '../src/models/tipocarga';
import db from '../src/models';

// Funciones auxiliares para crear registros relacionados
async function crearTipoCarga() {
  const response = await request(app)
    .post('/tipocargas')
    .send({ descripcion: 'Tipo de Carga de prueba' });
  return response.body.id;
}
async function crearCarga(idTipoCarga: number) {
  const response = await request(app)
    .post('/cargas')
    .send({
      peso: 500,
      volumen: 25,
      requisitos_especiales: 'Ninguno',
      id_tipo_carga: idTipoCarga
    });
  return response.body.id;
}

async function crearVehiculo() {
  const response = await request(app)
    .post('/vehiculos')
    .send({ tipo: 'Camión de prueba', toneladas: 20 });
  return response.body.id;
}

async function crearZona() {
  const response = await request(app)
    .post('/zonas')
    .send({ nombre: 'Zona de prueba' });
  return response.body.id;
}

async function crearTransportista() {
  const response = await request(app)
    .post('/transportistas')
    .send({ nombre: 'Transportes Express', telefono: '1234-5678', email: 'transpExpress@gmail.com' });
  return response.body.id;
}

describe('POST /tarifas', () => {
  let idVehiculo: number;
  let idCarga: number;
  let idZona: number;
  let idTransportista: number;
  let idTipoCarga: number;

  beforeAll(async () => {
    if (process.env.NODE_ENV === 'test') {
      // Limpiar todas las tablas al inicio
      await Tarifa.destroy({ where: {}, force: true, truncate: true });
      await Vehiculo.destroy({ where: {}, force: true, truncate: true });
      await Carga.destroy({ where: {}, force: true, truncate: true });
      await Zona.destroy({ where: {}, force: true, truncate: true });
      await Transportista.destroy({ where: {}, force: true, truncate: true });
      await TipoCarga.destroy({ where: {}, force: true, truncate: true });
      
      // Crear registros necesarios para las relaciones una sola vez
      idTipoCarga = await crearTipoCarga();
      idVehiculo = await crearVehiculo();
      idCarga = await crearCarga(idTipoCarga);
      idZona = await crearZona();
      idTransportista = await crearTransportista();
    }
  });

  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
      // Solo limpiar tarifas antes de cada test
      await Tarifa.destroy({ where: {}, force: true, truncate: true });
    }
  });

  it('Debe crear una tarifa si los datos son válidos', async () => {
    const datosCompletos = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista,
    };

    const response = await request(app)
      .post('/tarifas')
      .send(datosCompletos);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.valor_base).toBe(datos.valor_base);
    expect(response.body.id_vehiculo).toBe(idVehiculo);
    expect(response.body.id_carga).toBe(idCarga);
    expect(response.body.id_zona).toBe(idZona);
    expect(response.body.id_transportista).toBe(idTransportista);
  });

  it('No debe permitir crear una tarifa duplicada si ya existe una activa', async () => {
    const datosCompletos = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista
    };

    const primeraTarifa = await request(app)
      .post('/tarifas')
      .send(datosCompletos);
    expect(primeraTarifa.statusCode).toBe(201);
    expect(primeraTarifa.body.valor_base).toBe(datos.valor_base);
    expect(primeraTarifa.body.id_vehiculo).toBe(idVehiculo);
    expect(primeraTarifa.body.id_carga).toBe(idCarga);
    expect(primeraTarifa.body.id_zona).toBe(idZona);
    expect(primeraTarifa.body.id_transportista).toBe(idTransportista);

    const segundaTarifa = await request(app)
      .post('/tarifas')
      .send(datosCompletos);
    expect(segundaTarifa.statusCode).toBe(400);
    expect(segundaTarifa.body.error).toBe('Ya existe una tarifa con esos atributos principales');
  });

  //RESTAURACION
  it('Debe restaurar una tarifa eliminada si se le pasan los mismos datos', async () => {
    const datosCompletos = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista
    };

    const crearTarifa = await request(app)
      .post('/tarifas')
      .send(datosCompletos);
    expect(crearTarifa.statusCode).toBe(201);
    const id = crearTarifa.body.id;
    
    const eliminar = await request(app)
      .delete(`/tarifas/${id}`);
    expect(eliminar.statusCode).toBe(200);

    const datosRestaurados = {
      valor_base: crearTarifa.body.valor_base,
      fecha: "2025-01-01",
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista
    };
    const restaurar = await request(app)
      .post('/tarifas')
      .send(datosRestaurados);
    expect(restaurar.statusCode).toBe(200);
    expect(restaurar.body.id).toBe(id);
    expect(restaurar.body.valor_base).toBe(datos.valor_base);
    expect(restaurar.body.id_vehiculo).toBe(idVehiculo);
    expect(restaurar.body.id_carga).toBe(idCarga);
    expect(restaurar.body.id_zona).toBe(idZona);
    expect(restaurar.body.id_transportista).toBe(idTransportista);
  });
});

describe('PUT /tarifas/:id', () => {
  let idVehiculo: number;
  let idCarga: number;
  let idZona: number;
  let idTransportista: number;
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    if (process.env.NODE_ENV === 'test') {
      // Limpiar todas las tablas al inicio
      await Tarifa.destroy({ where: {}, force: true, truncate: true });
      await Vehiculo.destroy({ where: {}, force: true, truncate: true });
      await Carga.destroy({ where: {}, force: true, truncate: true });
      await Zona.destroy({ where: {}, force: true, truncate: true });
      await Transportista.destroy({ where: {}, force: true, truncate: true });
      await TipoCarga.destroy({ where: {}, force: true, truncate: true });
      
      // Crear registros necesarios para las relaciones una sola vez
      idTipoCarga = await crearTipoCarga();
      idVehiculo = await crearVehiculo();
      idCarga = await crearCarga(idTipoCarga);
      idZona = await crearZona();
      idTransportista = await crearTransportista();

      // Crear una tarifa para usar en los tests
      const datosCompletos = {
        ...datos,
        id_vehiculo: idVehiculo,
        id_carga: idCarga,
        id_zona: idZona,
        id_transportista: idTransportista
      };
      
      const response = await request(app)
        .post('/tarifas')
        .send(datosCompletos);
      idCreado = response.body.id;
    }
  });


  it('Debe actualizar el valor base de la tarifa si los datos son válidos', async () => {
    const datoNuevo = {
      valor_base: 2500,
      fecha: "2025-01-01",
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista,
    };

    const response = await request(app)
      .put(`/tarifas/${idCreado}`)
      .send(datoNuevo);

    expect(response.statusCode).toBe(200);
    expect(response.body.valor_base).toBe(2500);
    expect(response.body.id_vehiculo).toBe(idVehiculo);
    expect(response.body.id_carga).toBe(idCarga);
    expect(response.body.id_zona).toBe(idZona);
    expect(response.body.id_transportista).toBe(idTransportista);
  });

  it('Debe actualizar el ID del vehículo si los datos son válidos', async () => {
    const nuevoVehiculo = await request(app)
      .post('/vehiculos')
      .send({
        tipo: 'Camión nuevo', 
        toneladas: 20
      });
    const nuevoIdVehiculo = nuevoVehiculo.body.id;

    const datoNuevo = {
      ...datos,
      id_vehiculo: nuevoIdVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: idTransportista
    };

    const response = await request(app)
      .put(`/tarifas/${idCreado}`)
      .send(datoNuevo);

    expect(response.statusCode).toBe(200);
    expect(response.body.valor_base).toBe(datos.valor_base);
    expect(response.body.id_vehiculo).toBe(nuevoIdVehiculo);
    expect(response.body.id_carga).toBe(idCarga);
    expect(response.body.id_zona).toBe(idZona);
    expect(response.body.id_transportista).toBe(idTransportista);
  });

  it('Debe actualizar el ID de la carga si los datos son válidos', async () => {
    const nuevaCarga = await request(app)
      .post('/cargas')
      .send({
        peso: 800,
        volumen: 40,
        requisitos_especiales: 'Frágil',
        id_tipo_carga: idTipoCarga
      });
    const nuevoIdCarga = nuevaCarga.body.id;

    const datoNuevo = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: nuevoIdCarga,
      id_zona: idZona,
      id_transportista: idTransportista
    };

    const response = await request(app)
      .put(`/tarifas/${idCreado}`)
      .send(datoNuevo);

    expect(response.statusCode).toBe(200);
    expect(response.body.valor_base).toBe(datos.valor_base);
    expect(response.body.id_vehiculo).toBe(idVehiculo);
    expect(response.body.id_carga).toBe(nuevoIdCarga);
    expect(response.body.id_zona).toBe(idZona);
    expect(response.body.id_transportista).toBe(idTransportista);
  });

  it('Debe actualizar el ID de la zona si los datos son válidos', async () => {
    const nuevaZona = await request(app)
      .post('/zonas')
      .send({
        nombre: 'Zona Nueva'
      });
    const nuevoIdZona = nuevaZona.body.id;

    const datoNuevo = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: nuevoIdZona,
      id_transportista: idTransportista
    };

    const response = await request(app)
      .put(`/tarifas/${idCreado}`)
      .send(datoNuevo);

    expect(response.statusCode).toBe(200);
    expect(response.body.valor_base).toBe(datos.valor_base);
    expect(response.body.id_vehiculo).toBe(idVehiculo);
    expect(response.body.id_carga).toBe(idCarga);
    expect(response.body.id_zona).toBe(nuevoIdZona);
    expect(response.body.id_transportista).toBe(idTransportista);
  });

  it('Debe actualizar el ID del transportista si los datos son válidos', async () => {
    const nuevoTransportista = await request(app)
      .post('/transportistas')
      .send({
        nombre: 'Transportes Nuevo', 
        telefono: '1234-5678', 
        email: 'transpNuevo@gmail.com'
      });
    const nuevoIdTransportista = nuevoTransportista.body.id;

    const datoNuevo = {
      ...datos,
      id_vehiculo: idVehiculo,
      id_carga: idCarga,
      id_zona: idZona,
      id_transportista: nuevoIdTransportista
    };

    const response = await request(app)
      .put(`/tarifas/${idCreado}`)
      .send(datoNuevo);

    expect(response.statusCode).toBe(200);
    expect(response.body.valor_base).toBe(datos.valor_base);
    expect(response.body.id_vehiculo).toBe(idVehiculo);
    expect(response.body.id_carga).toBe(idCarga);
    expect(response.body.id_zona).toBe(idZona);
    expect(response.body.id_transportista).toBe(nuevoIdTransportista);
  });


  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const datosCompletos = {
        ...datos,
        id_vehiculo: idVehiculo,
        id_carga: idCarga,
        id_zona: idZona,
        id_transportista: idTransportista
      };
      const response = await request(app)
        .put(`/tarifas/${idInvalido}`)
        .send(datosCompletos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /tarifas', () => {
  it('Debe mostrar la lista de tarifas', async () => {
    const response = await request(app)
      .get('/tarifas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /tarifas/:id', () => {
  let idVehiculo: number;
  let idCarga: number;
  let idZona: number;
  let idTransportista: number;
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    if (process.env.NODE_ENV === 'test') {
      // Limpiar todas las tablas
      await Tarifa.destroy({ where: {}, force: true, truncate: true });
      await Vehiculo.destroy({ where: {}, force: true, truncate: true });
      await Carga.destroy({ where: {}, force: true, truncate: true });
      await Zona.destroy({ where: {}, force: true, truncate: true });
      await Transportista.destroy({ where: {}, force: true, truncate: true });
      await TipoCarga.destroy({ where: {}, force: true, truncate: true });
      
      // Crear registros necesarios para las relaciones
      idTipoCarga = await crearTipoCarga();
      idVehiculo = await crearVehiculo();
      idCarga = await crearCarga(idTipoCarga);
      idZona = await crearZona();
      idTransportista = await crearTransportista();
      
      // Crear una tarifa para usar en los tests
      const datosCompletos = {
        ...datos,
        id_vehiculo: idVehiculo,
        id_carga: idCarga,
        id_zona: idZona,
        id_transportista: idTransportista
      };
      
      const response = await request(app)
        .post('/tarifas')
        .send(datosCompletos);
      idCreado = response.body.id;
    }
  });

  it('Debe mostrar la tarifa del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/tarifas/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('id_vehiculo', idVehiculo);
    expect(response.body).toHaveProperty('id_carga', idCarga);
    expect(response.body).toHaveProperty('id_zona', idZona);
    expect(response.body).toHaveProperty('id_transportista', idTransportista);
  });


  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/tarifas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /tarifas/:id', () => {
  let idVehiculo: number;
  let idCarga: number;
  let idZona: number;
  let idTransportista: number;
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    if (process.env.NODE_ENV === 'test') {
      // Limpiar todas las tablas al inicio
      await Tarifa.destroy({ where: {}, force: true, truncate: true });
      await Vehiculo.destroy({ where: {}, force: true, truncate: true });
      await Carga.destroy({ where: {}, force: true, truncate: true });
      await Zona.destroy({ where: {}, force: true, truncate: true });
      await Transportista.destroy({ where: {}, force: true, truncate: true });
      await TipoCarga.destroy({ where: {}, force: true, truncate: true });
      
      // Crear registros necesarios para las relaciones una sola vez
      idTipoCarga = await crearTipoCarga();
      idVehiculo = await crearVehiculo();
      idCarga = await crearCarga(idTipoCarga);
      idZona = await crearZona();
      idTransportista = await crearTransportista();

      // Crear una tarifa para usar en los tests
      const datosCompletos = {
        ...datos,
        id_vehiculo: idVehiculo,
        id_carga: idCarga,
        id_zona: idZona,
        id_transportista: idTransportista
      };

      const response = await request(app)
        .post('/tarifas')
        .send(datosCompletos);
      idCreado = response.body.id;
    }
  });

  it('Debe eliminar la tarifa con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/tarifas/${idCreado}`);
    
    expect(response.statusCode).toBe(200);
  });

 
  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
       .delete(`/tarifas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
   }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});