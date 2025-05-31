import Joi from 'joi';

export const tarifaSchema = Joi.object({
  valor_base: Joi.number().positive().required().messages({
    'number.base': 'El valor base debe ser un número',
    'number.positive': 'El valor base debe ser un número positivo',
    'any.required': 'El valor base es obligatorio',
  }),

  fecha: Joi.date().required().messages({
    'date.base': 'La fecha debe ser una fecha válida',
    'any.required': 'La fecha es obligatoria',
  }),

  id_tipoVehiculo: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_tipoVehiculo debe ser un número',
    'number.integer': 'El id_tipoVehiculo debe ser un número entero',
    'number.positive': 'El id_tipoVehiculo debe ser un número positivo',
    'any.required': 'El id_tipoVehiculo es obligatorio',
  }),

  id_carga: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_carga debe ser un número',
    'number.integer': 'El id_carga debe ser un número entero',
    'number.positive': 'El id_carga debe ser un número positivo',
    'any.required': 'El id_carga es obligatorio',
  }),

  id_zona: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_zona debe ser un número',
    'number.integer': 'El id_zona debe ser un número entero',
    'number.positive': 'El id_zona debe ser un número positivo',
    'any.required': 'El id_zona es obligatorio',
  }),

  id_transportista: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_transportista debe ser un número',
    'number.integer': 'El id_transportista debe ser un número entero',
    'number.positive': 'El id_transportista debe ser un número positivo',
    'any.required': 'El id_transportista es obligatorio',
  }),
}).unknown(true);
