import Joi from 'joi';

export const tarifaAdicionalSchema = Joi.object({
  costo_personalizado: Joi.number().positive().required().messages({
    'number.base': 'El costo personalizado debe ser un número',
    'number.positive': 'El costo personalizado debe ser un número positivo',
    'any.required': 'El costo personalizado es obligatorio',
  }),

  id_tarifa: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_tarifa debe ser un número',
    'number.integer': 'El id_tarifa debe ser un número entero',
    'number.positive': 'El id_tarifa debe ser un número positivo',
    'any.required': 'El id_tarifa es obligatorio',
  }),

  id_adicional: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_adicional debe ser un número',
    'number.integer': 'El id_adicional debe ser un número entero',
    'number.positive': 'El id_adicional debe ser un número positivo',
    'any.required': 'El id_adicional es obligatorio',
  }),
}).unknown(true);
