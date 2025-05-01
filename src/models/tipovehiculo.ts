import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TipoVehiculoAttributes {
  id_tipoVehiculo: number;
  tipo: string;
  toneladas: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ZonaCreationAttributes = Optional<TipoVehiculoAttributes, 'id_tipoVehiculo' | 'tipo' | 'toneladas' | 'createdAt' | 'updatedAt'>;

export class TipoVehiculo extends Model<TipoVehiculoAttributes, ZonaCreationAttributes> implements TipoVehiculoAttributes {
  public id_tipoVehiculo!: number;
  public tipo!: string;
  public toneladas!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof TipoVehiculo {
    return TipoVehiculo.init({
      id_tipoVehiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      toneladas: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'tipoVehiculo',
      modelName: 'TipoVehiculo',
      timestamps: true
    });
  }
}