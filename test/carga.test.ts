import request from 'supertest';
import app from '../src/app';
import { datos, casosDeError } from './data/carga.data';
import { casosDeErrorID } from './data/id.data';
import { Carga } from '../src/models/carga';
import { TipoCarga } from '../src/models/tipocarga';
import db from '../src/models';


async function crearTipoCarga() {
  const response = await request(app)
    .post('/tipocargas')
    .send({ descripcion: 'Tipo de Carga de prueba' });
  return response.body.id;
}

describe('POST /cargas', () => {
  let idTipoCarga: number;

  beforeEach(async () => {
    if (process.env.NODE_ENV === 'test') {
        await Carga.destroy({ where: {}, force: true, truncate: true });
        
        // Solo crea el tipo si no existe
        if (!idTipoCarga) {
          await TipoCarga.destroy({ where: {}, force: true, truncate: true });
          idTipoCarga = await crearTipoCarga();
        }
    }
  });
  
  it('Debe crear una carga si los datos son válidos', async () => {
    const response = await request(app)
      .post('/cargas')
      .send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.peso).toBe(datos.peso);
    expect(response.body.volumen).toBe(datos.volumen);
    expect(response.body.requisitos_especiales).toBe(datos.requisitos_especiales);
    expect(response.body.id_tipo_carga).toBe(idTipoCarga);
  });

  // CASOS DE ERROR
  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .post('/cargas')
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  it('No debe permitir crear una carga duplicada si ya existe una activa', async () => {
    const primeraCarga = await request(app).post('/cargas').send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(primeraCarga.statusCode).toBe(201);
    expect(primeraCarga.body.peso).toBe(datos.peso);
    expect(primeraCarga.body.volumen).toBe(datos.volumen);
    expect(primeraCarga.body.requisitos_especiales).toBe(datos.requisitos_especiales);
    expect(primeraCarga.body.id_tipo_carga).toBe(idTipoCarga);

    const segundaCarga = await request(app).post('/cargas').send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(segundaCarga.statusCode).toBe(400);
    expect(segundaCarga.body.error).toBe('Ya existe una carga con esos atributos');
  });

  // RESTAURACIÓN
  it('Debe restaurar una carga eliminada si se le pasan los mismos datos', async () => {
    const crearCarga = await request(app).post('/cargas').send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(crearCarga.statusCode).toBe(201);
    const id = crearCarga.body.id;

    const eliminar = await request(app).delete(`/cargas/${id}`);
    expect(eliminar.statusCode).toBe(200); 

    const restaurar = await request(app).post('/cargas').send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(restaurar.statusCode).toBe(200);
    expect(restaurar.body.id).toBe(id);
    expect(restaurar.body.peso).toBe(datos.peso);
    expect(restaurar.body.volumen).toBe(datos.volumen);
    expect(restaurar.body.requisitos_especiales).toBe(datos.requisitos_especiales);
    expect(restaurar.body.id_tipo_carga).toBe(idTipoCarga);
  });

  it('Debe restaurar y actualizar una carga eliminada si se le pasa el mismo peso, volumen y tipo de carga pero otros requisitos especiales', async () => {
    const crearCarga = await request(app).post('/cargas').send({ ...datos, id_tipo_carga: idTipoCarga });
    expect(crearCarga.statusCode).toBe(201);
    const id = crearCarga.body.id;

    const eliminar = await request(app).delete(`/cargas/${id}`);
    expect(eliminar.statusCode).toBe(200);

    const datosDiferentes = {
      peso: datos.peso,
      volumen: datos.volumen,
      requisitos_especiales: 'Nuevo requisito especial', // diferente requisito
      id_tipo_carga: idTipoCarga
    };
    const nuevo = await request(app).post('/cargas').send(datosDiferentes);
    expect(nuevo.statusCode).toBe(200); // restauración
    expect(nuevo.body.peso).toBe(datos.peso);
    expect(nuevo.body.volumen).toBe(datos.volumen);
    expect(nuevo.body.requisitos_especiales).toBe('Nuevo requisito especial');
    expect(nuevo.body.id_tipo_carga).toBe(idTipoCarga);
    expect(nuevo.body.id).toBe(id); // mismo ID (restauración)
    Carga.destroy({ where: {}, force: true, truncate: true });
    TipoCarga.destroy({ where: {}, force: true, truncate: true });
  });
});

describe('PUT /cargas/:id', () => {
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    idTipoCarga = await crearTipoCarga();
    const response = await request(app)
      .post('/cargas')
      .send({ ...datos, id_tipo_carga: idTipoCarga });
    idCreado = response.body.id;
  });

  it('Debe actualizar el peso de la carga si los datos son válidos', async () => {
      const datoNuevo = { ...datos, id_tipo_carga: idTipoCarga, peso: 1000 };
      const response = await request(app)
        .put(`/cargas/${idCreado}`)
        .send(datoNuevo);
      expect(response.statusCode).toBe(200);
      expect(response.body.peso).toBe(1000);
      expect(response.body.volumen).toBe(datos.volumen);
      expect(response.body.requisitos_especiales).toBe(datos.requisitos_especiales);
      expect(response.body.id_tipo_carga).toBe(idTipoCarga);
  });

  it('Debe actualizar el volumen de la carga si los datos son válidos', async () => {
      const datoNuevo = { ...datos, id_tipo_carga: idTipoCarga, volumen: 12 };
      const response = await request(app)
        .put(`/cargas/${idCreado}`)
        .send(datoNuevo);
      expect(response.statusCode).toBe(200);
      expect(response.body.peso).toBe(datos.peso);
      expect(response.body.volumen).toBe(12);
      expect(response.body.requisitos_especiales).toBe(datos.requisitos_especiales);
      expect(response.body.id_tipo_carga).toBe(idTipoCarga);
  });

  it('Debe actualizar los requisitos especiales de la carga si los datos son válidos', async () => {
      const datoNuevo = { ...datos, id_tipo_carga: idTipoCarga, requisitos_especiales: 'Peligroso' };
      const response = await request(app)
        .put(`/cargas/${idCreado}`)
        .send(datoNuevo);
      expect(response.statusCode).toBe(200);
      expect(response.body.peso).toBe(datos.peso);
      expect(response.body.volumen).toBe(datos.volumen);
      expect(response.body.requisitos_especiales).toBe('Peligroso');
      expect(response.body.id_tipo_carga).toBe(idTipoCarga);
  });

  it('Debe actualizar el ID del tipo de carga si los datos son válidos', async () => {
      const nuevoTipoCarga = await request(app)
        .post('/tipocargas')
        .send({ descripcion: 'Tipo de carga Nuevo' });
      const nuevoIdTipoCarga = nuevoTipoCarga.body.id;

      const datoNuevo = { ...datos, id_tipo_carga: nuevoIdTipoCarga };
      const response = await request(app)
        .put(`/cargas/${idCreado}`)
        .send(datoNuevo);
      expect(response.statusCode).toBe(200);
      expect(response.body.peso).toBe(datos.peso);
      expect(response.body.volumen).toBe(datos.volumen);
      expect(response.body.requisitos_especiales).toBe(datos.requisitos_especiales);
      expect(response.body.id_tipo_carga).toBe(nuevoIdTipoCarga);
  });

  test.each(casosDeError)(
    '%s',
    async (_descripcion, datosEnvio, errorEsperado) => {
      const response = await request(app)
        .put(`/cargas/${idCreado}`)
        .send(datosEnvio);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .put(`/cargas/${idInvalido}`)
        .send({ ...datos, id_tipo_carga: idTipoCarga });
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /cargas', () => {
  it('Debe mostrar la lista de cargas', async () => {
    const response = await request(app)
      .get('/cargas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /cargas/:id', () => {
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    await Carga.destroy({ where: {}, force: true, truncate: true });
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    idTipoCarga = await crearTipoCarga();
    const response = await request(app)
      .post('/cargas')
      .send({ ...datos, id_tipo_carga: idTipoCarga });
    idCreado = response.body.id;
  });

  it('Debe mostrar la carga del id indicado si este es válido', async () => {
    const response = await request(app)
      .get(`/cargas/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCreado);
    expect(response.body).toHaveProperty('peso');
    expect(response.body).toHaveProperty('volumen');
    expect(response.body).toHaveProperty('requisitos_especiales');
    expect(response.body).toHaveProperty('id_tipo_carga', idTipoCarga);
    expect(response.body).toHaveProperty('tipoCarga');
    expect(response.body.tipoCarga).toHaveProperty('id', idTipoCarga);
    expect(response.body.tipoCarga).toHaveProperty('descripcion');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/cargas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('DELETE /cargas/:id', () => {
  let idTipoCarga: number;
  let idCreado: number;

  beforeAll(async () => {
    await Carga.destroy({ where: {}, force: true, truncate: true });
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    idTipoCarga = await crearTipoCarga();
    const response = await request(app)
      .post('/cargas')
      .send({ ...datos, id_tipo_carga: idTipoCarga });
    idCreado = response.body.id;
  });

  it('Debe eliminar la carga con el id indicado si este es válido', async () => {
    const response = await request(app)
      .delete(`/cargas/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .delete(`/cargas/${idInvalido}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

describe('GET /cargas/:id/tipo-carga', () => {
  let idTipoCarga: number;
  let idCarga: number;

  beforeAll(async () => {
    await Carga.destroy({ where: {}, force: true, truncate: true });
    await TipoCarga.destroy({ where: {}, force: true, truncate: true });
    idTipoCarga = await crearTipoCarga();
    const response = await request(app)
      .post('/cargas')
      .send({ ...datos, id_tipo_carga: idTipoCarga });
    idCarga = response.body.id;
  });

  it('Debe devolver el tipo de carga asociado a la carga si el id es válido', async () => {
    const response = await request(app)
      .get(`/cargas/${idCarga}/tipo-carga`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idTipoCarga);
    expect(response.body).toHaveProperty('descripcion');
  });

  test.each(casosDeErrorID)(
    '%s',
    async (_descripcion, idInvalido, errorEsperado) => {
      const response = await request(app)
        .get(`/cargas/${idInvalido}/tipo-carga`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errores).toContain(errorEsperado);
    }
  );
});

afterAll(async () => {
  // Cierra la conexión de Sequelize
  await db.sequelize.close();
});