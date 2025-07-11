export const datos = {
  tipo: 'Peón',
  costo_default: 8000
};

export const casosDeError: [string, any, string][] = [
  // CAMPOS REQUERIDOS - tipo y costo_default:
  [
    'Debe dar error si falta el tipo',
    (() => { const { tipo, ...rest } = datos; return rest; })(),
    'El tipo es obligatorio'
  ],
  [
    'Debe dar error si falta el costo default',
    (() => { const { costo_default, ...rest } = datos; return rest; })(),
    'El costo default es obligatorio'
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
  
  //COSTO DEFAULT
  [
    'Debe dar error si el costo default no es un número',
    { ...datos, costo_default: 'ss' },
    'El costo default debe ser un número'
  ],
  [
    'Debe dar error si el costo default no es un número positivo',
    { ...datos, costo_default: 0 },
    'El costo default debe ser un número positivo'
  ]
];