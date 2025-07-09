import { DataTypes, Sequelize, Optional } from "sequelize";
import { BaseModel } from "./BaseModel";

interface VehiculoAttributes {
  id_vehiculo: number;
  tipo: string;
  toneladas: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type VehiculoCreationAttributes = Optional<
  VehiculoAttributes,
  "id_vehiculo" | "createdAt" | "updatedAt" | "deletedAt"
>;

export class Vehiculo
  extends BaseModel<VehiculoAttributes, VehiculoCreationAttributes>
  implements VehiculoAttributes
{
  public id_vehiculo!: number;
  public tipo!: string;
  public toneladas!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Esto es para el Front
  get idField(): string {
    return "id_vehiculo";
  }
  protected getFieldOrder(): string[] {
    return ["tipo", "toneladas"];
  }

  static initModel(sequelize: Sequelize): typeof Vehiculo {
    return Vehiculo.init(
      {
        id_vehiculo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tipo: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        toneladas: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "vehiculo",
        modelName: "Vehiculo",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate(models: any) {
    this.hasMany(models.Tarifa, {
      foreignKey: "id_vehiculo",
    });
  }
}
