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

  requisitos_especiales: Joi.string().max(255).optional().messages({
    'string.base': 'Los requisitos especiales deben ser texto',
    'string.max':
      'Los requisitos especiales no pueden superar los 255 caracteres',
    'any.required': 'Los requisitos especiales son obligatorios',
  }),
  id_tipo_carga: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_tipo_carga debe ser un número',
    'number.integer': 'El id_tipo_carga debe ser un número entero',
    'number.positive': 'El id_tipo_carga debe ser un número positivo',
    'any.required': 'El id_tipo_carga es obligatorio',
  }),
}).unknown(true);
