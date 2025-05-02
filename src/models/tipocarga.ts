import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TipoCargaAttributes {
  id_tipo_carga: number;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TipoCargaCreationAttributes = Optional<TipoCargaAttributes, 'id_tipo_carga' | 'createdAt' | 'updatedAt'>;

export class TipoCarga extends Model<TipoCargaAttributes, TipoCargaCreationAttributes> implements TipoCargaAttributes {
  public id_tipo_carga!: number;
  public descripcion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof TipoCarga {
    return TipoCarga.init({
      id_tipo_carga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'tipo_carga',
      modelName: 'TipoCarga',
      timestamps: true
    });
  }

  static associate(models: any) {
    this.hasMany(models.Carga, {
      foreignKey: 'id_tipo_carga',
      as: 'cargas'
    });
  }
}