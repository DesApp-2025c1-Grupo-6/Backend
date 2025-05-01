import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TransportistaAttributes {
  id_transportista: number;
  nombre: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TransportistaCreationAttributes = Optional<TransportistaAttributes, 'id_transportista' | 'createdAt' | 'updatedAt'>;

export class Transportista extends Model<TransportistaAttributes, TransportistaCreationAttributes> implements TransportistaAttributes {
  public id_transportista!: number;
  public nombre!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Transportista {
    return Transportista.init({
      id_transportista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'transportista',
      modelName: 'Transportista',
      timestamps: true
    });
  }
}