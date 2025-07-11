import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/adicional.data';
import { casosDeErrorID } from './data/id.data';
import { Adicional } from '../src/models/adicional';
import db from '../src/models';


describe('POST /adicionales', () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
      await Adicional.destroy({ where: {}, force: true, truncate: true });
    }
  });

  // CASO EXITOSO
  it('Debe crear un adicional si los datos son válidos', async () => {
    const response = await request(app)
      .post('/adicionales')
      .send(datos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.tipo).toBe(datos.tipo);
    expect(response.body.costo_default).toBe(datos.costo_default);
  });

  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/adicionales')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear un adicional duplicado si ya existe uno activo', async () => {
    const primero = await request(app).post('/adicionales').send(datos);
    expect(primero.statusCode).toBe(201);
    expect(primero.body.tipo).toBe(datos.tipo);

    const segundo = await request(app).post('/adicionales').send(datos);
    expect(segundo.statusCode).toBe(400);
    expect(segundo.body.error).toBe('Ya existe un adicional con ese tipo');
  });

  // RESTAURACIÓN
  it('Debe restaurar un adicional eliminado si se le pasan los mismos datos', async () => {
    const crearAdicional = await request(app).post('/adicionales').send(datos);
    expect(crearAdicional.statusCode).toBe(201);
    const id = crearAdicional.body.id;

    const eliminar = await request(app).delete(`/adicionales/${id}`);
    expect(eliminar.statusCode).toBe(200); 

    const restaurar = await request(app).post('/adicionales').send(datos);
    expect(restaurar.statusCode).toBe(200); // restauración
    expect(restaurar.body.tipo).toBe(datos.tipo);
    expect(restaurar.body.costo_default).toBe(datos.costo_default);
    expect(restaurar.body.id).toBe(id); // mismo ID
  });

  it('Debe restaurar y actualizar un adicional eliminado si se le pasa el mismo tipo pero diferente costo', async () => {
    const crearAdicional = await request(app).post('/adicionales').send(datos);
    expect(crearAdicional.statusCode).toBe(201);
    const id = crearAdicional.body.id;

    const eliminar = await request(app).delete(`/adicionales/${id}`);
    expect(eliminar.statusCode).toBe(200);

    const datosDiferentes = {
      tipo: datos.tipo, // mismo tipo
      costo_default: 15000 // diferente costo
    };
    const nuevo = await request(app).post('/adicionales').send(datosDiferentes);
    expect(nuevo.statusCode).toBe(200); // restauración
    expect(nuevo.body.tipo).toBe(datos.tipo);
    expect(nuevo.body.costo_default).toBe(15000); // se actualizó
    expect(nuevo.body.id).toBe(id); // mismo ID
    await Adicional.destroy({ where: {}, force: true, truncate: true });
  });
});

describe('PUT /adicionales/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    const response = await request(app)
      .post('/adicionales')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe actualizar el tipo del adicional si los datos son válidos', async () => {
    const datoNuevo = { ...datos, tipo: 'Ayudante' };
    const response = await request(app)
      .put(`/adicionales/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.tipo).toBe('Ayudante');
    expect(response.body.costo_default).toBe(datos.costo_default);
  });

  it('Debe actualizar el costo default del adicional si los datos son válidos', async () => {
    const datoNuevo = { ...datos, costo_default: 7000 };
    const response = await request(app)
      .put(`/adicionales/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.tipo).toBe(datos.tipo);
    expect(response.body.costo_default).toBe(7000);
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/adicionales/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/adicionales/${idInvalido}`)
        .send(datos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /adicionales', () => {
  it('Debe mostrar la lista de adicionales', async () => {
    const response = await request(app)
      .get('/adicionales');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /adicionales/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Adicional.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/adicionales')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe mostrar el adicional del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/adicionales/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('tipo');
    expect(response.body).toHaveProperty('costo_default');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/adicionales/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /adicionales/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Adicional.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/adicionales')
      .send(datos);
    idCreado = response.body.id;
  });
  
  it('Debe eliminar el adicional con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/adicionales/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/adicionales/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /adicionales/reporte', () => {
  it('Debe generar un PDF con el reporte de adicionales', async () => {
    const response = await request(app)
      .get('/adicionales/reporte')
      .expect(200);

    expect(response.headers['content-type']).toBe('application/pdf');
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.headers['content-disposition']).toContain('attachment; filename=reporte-adicionales.pdf');
  });
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});