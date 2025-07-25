import { DataTypes, Sequelize, Optional } from "sequelize";
import { BaseModel } from "./BaseModel";

interface CargaAttributes {
  id_carga: number;
  peso: number;
  volumen: number;
  requisitos_especiales: string;
  id_tipo_carga: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type CargaCreationAttributes = Optional<
  CargaAttributes,
  "id_carga" | "createdAt" | "updatedAt" | "deletedAt"
>;

export class Carga
  extends BaseModel<CargaAttributes, CargaCreationAttributes>
  implements CargaAttributes
{
  public id_carga!: number;
  public peso!: number;
  public volumen!: number;
  public requisitos_especiales!: string;
  public id_tipo_carga!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Esto es para el Front
  get idField(): string {
    return "id_carga";
  }
  protected getFieldOrder(): string[] {
    return ["peso", "volumen", "requisitos_especiales", "id_tipo_carga"];
  }

  static initModel(sequelize: Sequelize): typeof Carga {
    return Carga.init(
      {
        id_carga: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        peso: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        volumen: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        requisitos_especiales: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        id_tipo_carga: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "tipo_carga",
            key: "id_tipo_carga",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
      },
      {
        sequelize,
        tableName: "carga",
        modelName: "Carga",
        timestamps: true,
        paranoid: true,
      }
    );
  }

  static associate(models: any) {
    this.belongsTo(models.TipoCarga, {
      foreignKey: "id_tipo_carga",
      as: "tipoCarga",
    });
    this.hasMany(models.Tarifa, {
      foreignKey: "id_carga",
    });
  }
}
