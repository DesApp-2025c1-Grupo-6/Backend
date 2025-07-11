import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/transportista.data';
import { casosDeErrorID } from './data/id.data';
import { Transportista } from '../src/models/transportista';
import db from '../src/models';


describe('POST /transportistas', () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
        await Transportista.destroy({ where: {}, force: true, truncate: true });
    }
  }); 

  // CASOS EXITOSOS
  it('Debe crear un transportista si los datos son válidos', async () => {
    const response = await request(app)
      .post('/transportistas')
      .send(datos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe(datos.nombre);
    expect(response.body.telefono).toBe(datos.telefono);
    expect(response.body.email).toBe(datos.email);
  });

  it('Debe permitir crear sin e-mail', async () => {
    const { email, ...datoFaltante } = datos;
    const response = await request(app)
      .post('/transportistas')
      .send(datoFaltante);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe(datoFaltante.nombre);
    expect(response.body.telefono).toBe(datoFaltante.telefono);
    expect(response.body.email === undefined || response.body.email === null).toBe(true);
  });

  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/transportistas')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear un transportista duplicado si ya existe uno activo', async () => {
    const primero = await request(app).post('/transportistas').send(datos);
    expect(primero.statusCode).toBe(201);
    expect(primero.body.nombre).toBe(datos.nombre);
  
    const segundo = await request(app).post('/transportistas').send(datos);
    expect(segundo.statusCode).toBe(400);
    expect(segundo.body.error).toBe('Ya existe un transportista con esos datos');
  });
  
  // RESTAURACIÓN
  it('Debe restaurar un transportista eliminado si se le pasa el mismo nombre y el mismo telefono', async () => {
    const crearTransportista = await request(app).post('/transportistas').send(datos);
    expect(crearTransportista.statusCode).toBe(201);
    const id = crearTransportista.body.id;
  
    const eliminar = await request(app).delete(`/transportistas/${id}`);
    expect(eliminar.statusCode).toBe(200); 
  
    const restaurar = await request(app).post('/transportistas').send(datos);
    expect(restaurar.statusCode).toBe(200); // restauración
    expect(restaurar.body.id).toBe(id); // mismo ID
    expect(restaurar.body.nombre).toBe(datos.nombre);
    expect(restaurar.body.telefono).toBe(datos.telefono);
  });

  it('Debe restaurar y actualizar un transportista eliminado si se le pasa el mismo nombre pero diferente e-mail y telefono', async () => {
      const crearTransportista = await request(app).post('/transportistas').send(datos);
      expect(crearTransportista.statusCode).toBe(201);
      const id = crearTransportista.body.id;
  
      const eliminar = await request(app).delete(`/transportistas/${id}`);
      expect(eliminar.statusCode).toBe(200);
  
      const datosDiferentes = {
        nombre: datos.nombre, // mismo nombre
        telefono: '1234-1234', // diferente telefono
        email: 'nuevo@gmail.com' // diferente e-mail
      };
      const nuevo = await request(app).post('/transportistas').send(datosDiferentes);
      expect(nuevo.statusCode).toBe(200); // restauración
      expect(nuevo.body.nombre).toBe(datos.nombre);
      expect(nuevo.body.telefono).toBe('1234-1234'); // se actualizó
      expect(nuevo.body.email).toBe('nuevo@gmail.com'); // se actualizó
      expect(nuevo.body.id).toBe(id); // mismo ID
      await Transportista.destroy({ where: {}, force: true, truncate: true });
  });
});

describe('PUT /transportistas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    const response = await request(app)
      .post('/transportistas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe actualizar el nombre del transportista si los datos son válidos', async () => {
    const datoNuevo = { ...datos, nombre: 'Transporte' };
    const response = await request(app)
      .put(`/transportistas/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe('Transporte');
    expect(response.body.telefono).toBe(datos.telefono);
    expect(response.body.email).toBe(datos.email);
  });

  it('Debe actualizar el teléfono del transportista si los datos son válidos', async () => {
    const datoNuevo = { ...datos, telefono: '1234-1234' };
    const response = await request(app)
      .put(`/transportistas/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe(datos.nombre);
    expect(response.body.telefono).toBe('1234-1234');
    expect(response.body.email).toBe(datos.email);
  });

  it('Debe actualizar el e-mail del transportista si los datos son válidos', async () => {
    const datoNuevo = { ...datos, email: 'nuevo@gmail.com' };
    const response = await request(app)
      .put(`/transportistas/${idCreado}`)
      .send(datoNuevo);
    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe(datos.nombre);
    expect(response.body.telefono).toBe(datos.telefono);
    expect(response.body.email).toBe('nuevo@gmail.com');
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/transportistas/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/transportistas/${idInvalido}`)
        .send(datos);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /transportistas', () => {
  it('Debe mostrar la lista de transportistas', async () => {
    const response = await request(app)
      .get('/transportistas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /transportistas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Transportista.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/transportistas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe mostrar al transportista del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/transportistas/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('nombre');
    expect(response.body).toHaveProperty('telefono');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/transportistas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /transportistas/:id', () => {
  let idCreado: number;

  beforeAll(async () => {
    await Transportista.destroy({ where: {}, force: true, truncate: true });
    const response = await request(app)
      .post('/transportistas')
      .send(datos);
    idCreado = response.body.id;
  });

  it('Debe eliminar el transportista con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/transportistas/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/transportistas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});