export const datos = {
  tipo: 'Camion Chico',
  toneladas: 2
};

export const casosDeError: [string, any, string][] = [
  // CAMPOS REQUERIDOS - tipo y toneladas:
  [
    'Debe dar error si falta el tipo',
    (() => { const { tipo, ...rest } = datos; return rest; })(),
    'El tipo es obligatorio'
  ],
  [
    'Debe dar error si faltan las toneladas',
    (() => { const { toneladas, ...rest } = datos; return rest; })(),
    'Las toneladas son obligatorias'
  ],


  // VALIDACIONES QUE AGREGAMOS:
  //TIPO
  [
    'Debe dar error si el tipo está vacío',
    { ...datos, tipo: '' },
    'El tipo no puede estar vacío'
  ],
  [
    'Debe dar error si el tipo no es string',
    { ...datos, tipo: 123 },
    'El tipo debe ser un texto'
  ],
  [
    'Debe dar error si el tipo tiene menos de 3 caracteres',
    { ...datos, tipo: 'ss' },
    'El tipo debe tener al menos 3 caracteres'
  ],
  [
    'Debe dar error si el tipo tiene más de 50 caracteres',
     { ...datos, tipo: 'a'.repeat(51) },
    'El tipo no puede tener más de 50 caracteres'
  ],
  
  //TONELADAS
  [
    'Debe dar error si las toneladas no son un número',
    { ...datos, toneladas: 'ss' },
    'Las toneladas deben ser un número'
  ],
  [
    'Debe dar error si las toneladas no son un número positivo',
    { ...datos, toneladas: 0 },
    'Las toneladas deben ser un número positivo'
  ]
];