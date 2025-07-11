import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/tipocarga.data';
import { casosDeErrorID } from './data/id.data';
import { TipoCarga } from '../src/models/tipocarga';
import db from '../src/models';


describe('POST /tipocargas', () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
      await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    }
  });

  // CASO EXITOSO
  it('Debe crear un tipo de carga si los datos son válidos', async () => {
    const response = await request(app)
      .post('/tipocargas')
      .send(datos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.descripcion).toBe(datos.descripcion);
  });
  
  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/tipocargas')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear un tipo de carga duplicado si ya existe uno activo', async () => {
    const primero = await request(app).post('/tipocargas').send(datos);
    expect(primero.statusCode).toBe(201);
    expect(primero.body.descripcion).toBe(datos.descripcion);

    const segundo = await request(app).post('/tipocargas').send(datos);
    expect(segundo.statusCode).toBe(400);
    expect(segundo.body.error).toBe('Ya existe un tipo de carga con esa descripción');
  });

  // RESTAURACIÓN
  it('Debe restaurar un tipo de carga eliminado si se le pasa la misma descripcion', async () => {
    const crearTipoCarga = await request(app).post('/tipocargas').send(datos);
    expect(crearTipoCarga.statusCode).toBe(201);
    const id = crearTipoCarga.body.id;

    const eliminar = await request(app).delete(`/tipocargas/${id}`);
    expect(eliminar.statusCode).toBe(200); 

    const restaurar = await request(app).post('/tipocargas').send(datos);
    expect(restaurar.statusCode).toBe(200); // restauración
    expect(restaurar.body.descripcion).toBe(datos.descripcion);
    expect(restaurar.body.id).toBe(id); // mismo ID
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
  });
});

describe('PUT /tipocargas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    const response = await request(app)
      .post('/tipocargas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe actualizar la descripción del tipo de carga si los datos son válidos', async () => {
    const datoNuevo = { descripcion: 'Especial' };
    const response = await request(app)
      .put(`/tipocargas/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.descripcion).toBe('Especial');
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/tipocargas/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/tipocargas/${idInvalido}`)
        .send(datos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /tipocargas', () => {
  it('Debe mostrar la lista de tipos de carga', async () => {
    const response = await request(app)
      .get('/tipocargas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /tipocargas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/tipocargas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe mostrar el tipo de carga del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/tipocargas/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('descripcion');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/tipocargas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /tipocargas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/tipocargas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe eliminar el tipo de carga con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/tipocargas/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/tipocargas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});