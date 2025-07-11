export const datos = {
  valor_base: 1500,
  fecha: "2025-01-01"
};

export const casosDeError: [string, any, string][] = [
  // CAMPOS REQUERIDOS - valor_base, fecha y los ID menos adicionales:
  [
    'Debe dar error si falta el valor_base',
    (() => { const { valor_base, ...rest } = datos; return rest; })(),
    'El valor_base es obligatorio'
  ],
  [
    'Debe dar error si falta la fecha',
    (() => { const { fecha, ...rest } = datos; return rest; })(),
    'La fecha es obligatoria'
  ],
  [
    'Debe dar error si falta el id_vehiculo',
    { ...datos },
    'El id_vehiculo es obligatorio'
  ],
  [
    'Debe dar error si falta el id_carga',
    { ...datos },
    'El id_carga es obligatorio'
  ],
  [
    'Debe dar error si falta el id_zona',
    { ...datos },
    'El id_zona es obligatorio'
  ],
  [
    'Debe dar error si falta el id_transportista',
    { ...datos },
    'El id_transportista es obligatorio'
  ],


  // VALIDACIONES QUE AGREGAMOS:
  //VALOR_BASE
  [
    'Debe dar error si el valor_base no es un número',
    { ...datos, valor_base: 'ss' },
    'El valor_base debe ser un número'
  ],
  [
    'Debe dar error si el valor_base no es un número positivo',
    { ...datos, peso: 0 },
    'El valor_base debe ser un número positivo'
  ],

  //FECHA
  [
    'Debe dar error si la fecha está vacía',
    { ...datos, fecha: '' },
    'La fecha no puede estar vacía'
  ],
  [
    'Debe dar error si la fecha no tiene el formato YYYY-MM-DD',
    { ...datos, fecha: '15-12-2024' },
    'La fecha debe tener el formato YYYY-MM-DD'
  ],
  [
    'Debe dar error si la fecha no es válida',
    { ...datos, fecha: '2024-13-35' },
    'La fecha debe ser una fecha válida'
  ],

  //ID_VEHICULO
  [
    'Debe dar error si id_vehiculo no es un número',
    { ...datos, id_vehiculo: 'abc' },
    'El id_vehiculo debe ser un número'
  ],
  [
    'Debe dar error si id_vehiculo no es un número entero',
    { ...datos, id_vehiculo: 1.5 },
    'El id_vehiculo debe ser un número entero'
  ],
  [
    'Debe dar error si id_vehiculo no es un número positivo',
    { ...datos, id_vehiculo: 0 },
    'El id_vehiculo debe ser un número positivo'
  ],

  //ID_CARGA
  [
    'Debe dar error si id_carga no es un número',
    { ...datos, id_carga: 'abc' },
    'El id_carga debe ser un número'
  ],
  [
    'Debe dar error si id_carga no es un número entero',
    { ...datos, id_carga: 1.5 },
    'El id_carga debe ser un número entero'
  ],
  [
    'Debe dar error si id_carga no es un número positivo',
    { ...datos, id_carga: 0 },
    'El id_carga debe ser un número positivo'
  ],

  //ID_ZONA
  [
    'Debe dar error si id_zona no es un número',
    { ...datos, id_zona: 'abc' },
    'El id_zona debe ser un número'
  ],
  [
    'Debe dar error si id_zona no es un número entero',
    { ...datos, id_zona: 1.5 },
    'El id_zona debe ser un número entero'
  ],
  [
    'Debe dar error si id_zona no es un número positivo',
    { ...datos, id_zona: 0 },
    'El id_zona debe ser un número positivo'
  ],

  //ID_TRANSPORTISTA
  [
    'Debe dar error si id_transportista no es un número',
    { ...datos, id_transportista: 'abc' },
    'El id_transportista debe ser un número'
  ],
  [
    'Debe dar error si id_transportista no es un número entero',
    { ...datos, id_transportista: 1.5 },
    'El id_transportista debe ser un número entero'
  ],
  [
    'Debe dar error si id_transportista no es un número positivo',
    { ...datos, id_transportista: 0 },
    'El id_transportista debe ser un número positivo'
  ],

  //ADICIONALES - ID
  [
    'Debe dar error si falta el id_adicional',
    { ...datos, adicionales: [{ costo_personalizado: 25.75 }] },
    'El id_adicional es obligatorio'
  ],
  [
    'Debe dar error si id_adicional no es un número',
    { ...datos, adicionales: [{ id_adicional: 'abc' }] },
    'El id_adicional debe ser un número'
  ],
  [
    'Debe dar error si id_adicional no es un número entero',
    { ...datos, adicionales: [{ id_adicional: 1.5 }] },
    'El id_adicional debe ser un número entero'
  ],
  [
    'Debe dar error si id_adicional no es un número positivo',
    { ...datos, adicionales: [{ id_adicional: 0 }] },
    'El id_adicional debe ser un número positivo'
  ],
  [
    'Debe dar error si el costo personalizado no es un número',
    { ...datos, adicionales: [{ id_adicional: 1, costo_personalizado: 'abc' }] },
    'El costo personalizado debe ser un número'
  ],
  [
    'Debe dar error si el costo personalizado no es un número positivo',
    { ...datos, adicionales: [{ id_adicional: 1, costo_personalizado: 0 }] },
    'El costo personalizado debe ser un número positivo'
  ]
];