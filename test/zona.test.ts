import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/zona.data';
import { casosDeErrorID } from './data/id.data';
import { Zona } from '../src/models/zona';
import db from '../src/models';

describe('POST /zonas', () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
      await Zona.destroy({ where: {}, force: true, truncate: true });
    }
  });

  // CASO EXITOSO
  it('Debe crear una zona si los datos son válidos', async () => {
    const response = await request(app)
      .post('/zonas')
      .send(datos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe(datos.nombre);
  });

  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/zonas')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear una zona duplicada si ya existe una activa', async () => {
      const primeraZona = await request(app).post('/zonas').send(datos);
      expect(primeraZona.statusCode).toBe(201);
      expect(primeraZona.body.nombre).toBe(datos.nombre);
  
      const segundaZona = await request(app).post('/zonas').send(datos);
      expect(segundaZona.statusCode).toBe(400);
      expect(segundaZona.body.error).toBe('Ya existe una zona con ese nombre');
    });
  
    // RESTAURACIÓN
    it('Debe restaurar una zona eliminada si se le pasa el mismo nombre', async () => {
      const crearZona = await request(app).post('/zonas').send(datos);
      expect(crearZona.statusCode).toBe(201);
      const id = crearZona.body.id;
  
      const eliminar = await request(app).delete(`/zonas/${id}`);
      expect(eliminar.statusCode).toBe(200); 
  
      const restaurar = await request(app).post('/zonas').send(datos);
      expect(restaurar.statusCode).toBe(200); // restauración
      expect(restaurar.body.nombre).toBe(datos.nombre);
      expect(restaurar.body.id).toBe(id); // mismo ID
      await Zona.destroy({ where: {}, force: true, truncate: true });
    });
});

describe('PUT /zonas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    const response = await request(app)
      .post('/zonas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe actualizar el nombre de la zona si los datos son válidos', async () => {
    const datoNuevo = { nombre: 'GBA' };
    const response = await request(app)
      .put(`/zonas/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe('GBA');
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/zonas/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/zonas/${idInvalido}`)
        .send(datos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /zonas', () => {
  it('Debe mostrar la lista de zonas', async () => {
    const response = await request(app)
      .get('/zonas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /zonas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Zona.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/zonas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe mostrar la zona del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/zonas/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('nombre');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/zonas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /zonas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Zona.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/zonas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe eliminar la zona con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/zonas/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/zonas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});