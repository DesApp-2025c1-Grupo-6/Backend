export const datos = {
  peso: 3000,
  volumen: 10,
  requisitos_especiales: 'Ninguno'
};

export const casosDeError: [string, any, string][] = [
  // CAMPOS REQUERIDOS todos + id_tipo_carga:
  [
    'Debe dar error si falta el peso',
    (() => { const { peso, ...rest } = datos; return rest; })(),
    'El peso es obligatorio'
  ],
  [
    'Debe dar error si falta el volumen',
    (() => { const { volumen, ...rest } = datos; return rest; })(),
    'El volumen es obligatorio'
  ],
  [
    'Debe dar error si faltan los requisitos especiales',
    (() => { const { requisitos_especiales, ...rest } = datos; return rest; })(),
    'Los requisitos especiales son obligatorios'
  ],
  [
    'Debe dar error si falta el id_tipo_carga',
    { ...datos },
    'El id_tipo_carga es obligatorio'
  ],


  // VALIDACIONES QUE AGREGAMOS:
  //PESO
  [
    'Debe dar error si el peso no es un número',
    { ...datos, peso: 'ss' },
    'El peso debe ser un número'
  ],
  [
    'Debe dar error si el peso no es un número positivo',
    { ...datos, peso: 0 },
    'El peso debe ser un número positivo'
  ],

  //VOLUMEN
  [
    'Debe dar error si el volumen no es un número',
    { ...datos, volumen: 'ss' },
    'El volumen debe ser un número'
  ],
  [
    'Debe dar error si el volumen no es un número positivo',
    { ...datos, volumen: 0 },
    'El volumen debe ser un número positivo'
  ],

  //REQUISITOS ESPECIALES
  [
    'Debe dar error si los requisitos especiales están vacíos',
    { ...datos, requisitos_especiales: '' },
    'Los requisitos especiales no pueden estar vacíos'
  ],
  [
    'Debe dar error si los requisitos especiales no son string',
    { ...datos, requisitos_especiales: 123 },
    'Los requisitos especiales deben ser texto'
  ],
  [
    'Debe dar error si los requisitos especiales tienen menos de 3 caracteres',
    { ...datos, requisitos_especiales: 'ss' },
    'Los requisitos especiales deben tener al menos 3 caracteres'
  ],
  [
    'Debe dar error si los requisitos especiales tienen más de 50 caracteres',
    { ...datos, requisitos_especiales: 'a'.repeat(51) },
    'Los requisitos especiales no pueden superar los 50 caracteres'
  ],

  //ID_TIPO_CARGA
  [
    'Debe dar error si id_tipo_carga no es un número',
    { ...datos, id_tipo_carga: 'abc' },
    'El id_tipo_carga debe ser un número'
  ],
  [
    'Debe dar error si id_tipo_carga no es un número entero',
    { ...datos, id_tipo_carga: 1.5 },
    'El id_tipo_carga debe ser un número entero'
  ],
  [
    'Debe dar error si id_tipo_carga no es un número positivo',
    { ...datos, id_tipo_carga: 0 },
    'El id_tipo_carga debe ser un número positivo'
  ]
];