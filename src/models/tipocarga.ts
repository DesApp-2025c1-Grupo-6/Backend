import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TipoCargaAttributes {
  id: number;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TipoCargaCreationAttributes = Optional<TipoCargaAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class TipoCarga extends Model<TipoCargaAttributes, TipoCargaCreationAttributes> implements TipoCargaAttributes {
  public id!: number;
  public descripcion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof TipoCarga {
    return TipoCarga.init({
      id: {
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