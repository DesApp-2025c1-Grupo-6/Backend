import { ModelStatic, Model, fn, col, where } from 'sequelize';

export async function existeValorUnico<M extends Model>(
  modelo: ModelStatic<M>,
  columna: keyof M['_attributes'], // Esto asegura que la columna es una propiedad válida del modelo
  valor: string,
  incluirEliminados = true
): Promise<boolean> {
  const whereClause = where(fn('LOWER', col(String(columna))), valor.trim().toLowerCase());

  const registro = await modelo.findOne({
    where: whereClause,
    ...(incluirEliminados ? { paranoid: false } : {}),
  });

  return !!registro;
}