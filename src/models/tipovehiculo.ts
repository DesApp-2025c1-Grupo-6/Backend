import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface TipoVehiculoAttributes {
  id_tipoVehiculo: number;
  tipo: string;
  toneladas: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TipoVehiculoCreationAttributes = Optional<TipoVehiculoAttributes, 'id_tipoVehiculo' | 'createdAt' | 'updatedAt'>;

export class TipoVehiculo extends BaseModel<TipoVehiculoAttributes, TipoVehiculoCreationAttributes> implements TipoVehiculoAttributes {
  public id_tipoVehiculo!: number;
  public tipo!: string;
  public toneladas!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_tipoVehiculo';
  }
  protected getFieldOrder(): string[] {
    return ['tipo', 'toneladas']; //Preguntar a Branko que orden quiere
  }


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

  static associate(models: any) {
    this.hasMany(models.Tarifa, {
      foreignKey: 'id_tipoVehiculo'
    });
  }
}