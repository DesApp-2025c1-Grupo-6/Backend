import Joi from 'joi';

export const tarifaSchema = Joi.object({
  valor_base: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El valor base debe ser un número',
    'number.positive': 'El valor base debe ser un número positivo',
    'any.required': 'El valor base es obligatorio',
  }),

  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const [year, month, day] = value.split('-').map(Number);
      const fecha = new Date(year, month - 1, day);
      if (
        fecha.getFullYear() !== year ||
        fecha.getMonth() + 1 !== month ||
        fecha.getDate() !== day
      ) {
        return helpers.error('any.invalid');
      }
    return value;
    })
    .required()
    .messages({
      'string.pattern.base': 'La fecha debe tener el formato YYYY-MM-DD',
      'string.empty': 'La fecha no puede estar vacía',
      'any.invalid': 'La fecha debe ser una fecha válida',
      'any.required': 'La fecha es obligatoria',
    }),

  id_vehiculo: Joi.number().integer().positive().required().messages({
    'number.base': 'El id_vehiculo debe ser un número',
    'number.integer': 'El id_vehiculo debe ser un número entero',
    'number.positive': 'El id_vehiculo debe ser un número positivo',
    'any.required': 'El id_vehiculo es obligatorio',
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


  adicionales: Joi.array().items(
    Joi.object({
      id_adicional: Joi.number().integer().positive().required().messages({
        'number.base': 'El id_adicional debe ser un número',
        'number.integer': 'El id_adicional debe ser un número entero',
        'number.positive': 'El id_adicional debe ser un número positivo',
        'any.required': 'El id_adicional es obligatorio',
      }),
      costo_personalizado: Joi.number().positive().precision(2).allow(null).optional().messages({
        'number.base': 'El costo personalizado debe ser un número',
        'number.positive': 'El costo personalizado debe ser un número positivo',
      }),
    })
  ).optional(),
}).unknown(true);
