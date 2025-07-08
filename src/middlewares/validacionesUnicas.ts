import { ModelStatic, Model, fn, col, where } from "sequelize";

export async function existeValorUnico<M extends Model>(
  modelo: ModelStatic<M>,
  columna: keyof M["_attributes"],
  valor: string,
  incluirEliminados = true
): Promise<boolean> {
  const whereClause = where(
    fn("LOWER", col(String(columna))),
    valor.trim().toLowerCase()
  );

  const registro = await modelo.findOne({
    where: whereClause,
    ...{ paranoid: !incluirEliminados },
  });

  return !!registro;
}
