import Joi from 'joi';

export const cargaSchema = Joi.object({
  peso: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El peso debe ser un número',
    'number.positive': 'El peso debe ser un número positivo',
    'any.required': 'El peso es obligatorio',
  }),
  volumen: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El volumen debe ser un número',
    'number.positive': 'El volumen debe ser un número positivo',
    'any.required': 'El volumen es obligatorio',
  }),

  requisitos_especiales: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Los requisitos especiales deben ser texto',
    'string.empty': 'Los requisitos especiales no pueden estar vacíos',
    'string.min': 'Los requisitos especiales debe tener al menos 3 caracteres',
    'string.max': 'Los requisitos especiales no pueden superar los 50 caracteres',
    'any.required': 'Los requisitos especiales son obligatorios',
  }),
  id_tipo_carga: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_tipo_carga debe ser un número',
    'number.integer': 'El id_tipo_carga debe ser un número entero',
    'number.positive': 'El id_tipo_carga debe ser un número positivo',
    'any.required': 'El id_tipo_carga es obligatorio',
  }),
}).unknown(true);
