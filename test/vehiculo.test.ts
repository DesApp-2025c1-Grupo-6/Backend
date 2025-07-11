import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/vehiculo.data';
import { casosDeErrorID } from './data/id.data';
import { Vehiculo } from '../src/models/vehiculo';
import db from '../src/models';

describe('POST /vehiculos', () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
      await Vehiculo.destroy({ where: {}, force: true, truncate: true });
    }
  });

  // CASO EXITOSO
  it('Debe crear un tipo de vehículo si los datos son válidos', async () => {
    const response = await request(app)
      .post('/vehiculos')
      .send(datos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.tipo).toBe(datos.tipo);
    expect(response.body.toneladas).toBe(datos.toneladas);
  });

  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/vehiculos')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear un tipo de vehiculo duplicado si ya existe uno activo', async () => {
    const primero = await request(app).post('/vehiculos').send(datos);
    expect(primero.statusCode).toBe(201);
    expect(primero.body.tipo).toBe(datos.tipo);
    expect(primero.body.toneladas).toBe(datos.toneladas);

    const segundo = await request(app).post('/vehiculos').send(datos);
    expect(segundo.statusCode).toBe(400);
    expect(segundo.body.error).toBe('Ya existe un tipo de vehículo con esos datos');
  });

  // RESTAURACIÓN
  it('Debe restaurar un tipo de vehiculo eliminado si se le pasan los mismos datos', async () => {
    const crearTipoVehiculo = await request(app).post('/vehiculos').send(datos);
    expect(crearTipoVehiculo.statusCode).toBe(201);
    const id = crearTipoVehiculo.body.id;

    const eliminar = await request(app).delete(`/vehiculos/${id}`);
    expect(eliminar.statusCode).toBe(200); 

    const restaurar = await request(app).post('/vehiculos').send(datos);
    expect(restaurar.statusCode).toBe(200); // restauración
    expect(restaurar.body.tipo).toBe(datos.tipo);
    expect(restaurar.body.toneladas).toBe(datos.toneladas);
    expect(restaurar.body.id).toBe(id); // mismo ID
    await Vehiculo.destroy({ where: {}, force: true, truncate: true });
  });
});

describe('PUT /vehiculos/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    const response = await request(app)
      .post('/vehiculos')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe actualizar el tipo del vehículo si los datos son válidos', async () => {
    const datoNuevo = { ...datos, tipo: 'Camion' };
    const response = await request(app)
      .put(`/vehiculos/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.tipo).toBe('Camion');
    expect(response.body.toneladas).toBe(datos.toneladas);
  });

  it('Debe actualizar las toneladas del vehículo si los datos son válidos', async () => {
    const datoNuevo = { ...datos, toneladas: 1 };
    const response = await request(app)
      .put(`/vehiculos/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.tipo).toBe(datos.tipo);
    expect(response.body.toneladas).toBe(1);
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/vehiculos/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/vehiculos/${idInvalido}`)
        .send(datos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /vehiculos', () => {
  it('Debe mostrar la lista de tipos de vehículo', async () => {
    const response = await request(app)
      .get('/vehiculos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /vehiculos/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Vehiculo.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/vehiculos')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe mostrar el tipo de vehículo del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/vehiculos/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('tipo');
    expect(response.body).toHaveProperty('toneladas');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/vehiculos/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /vehiculos/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Vehiculo.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/vehiculos')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe eliminar el tipo de vehículo con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/vehiculos/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/vehiculos/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});