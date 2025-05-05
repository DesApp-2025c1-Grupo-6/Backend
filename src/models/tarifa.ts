import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface TarifaAttributes {
  id_tarifa: number;
  valor_base: number;
  fecha: Date;
  id_tipoVehiculo: number;
  id_carga: number;
  id_zona: number;
  id_transportista: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TarifaCreationAttributes = Optional<TarifaAttributes, 'id_tarifa' | 'createdAt' | 'updatedAt'>;

export class Tarifa extends BaseModel<TarifaAttributes, TarifaCreationAttributes> implements TarifaAttributes {
  public id_tarifa!: number;
  public valor_base!: number;
  public fecha!: Date;
  public id_tipoVehiculo!: number;
  public id_carga!: number;
  public id_zona!: number;
  public id_transportista!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_tarifa';
  }
  protected getFieldOrder(): string[] {
    return ['valor_base', 'fecha', 'id_tipoVehiculo', 'id_carga', 'id_zona', 'id_transportista']; 
  }


  static initModel(sequelize: Sequelize): typeof Tarifa {
    return Tarifa.init({
      id_tarifa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      valor_base: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      id_tipoVehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tipoVehiculo',
          key: 'id_tipoVehiculo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_carga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carga',
          key: 'id_carga'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_zona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'zona',
          key: 'id_zona'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_transportista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transportista',
          key: 'id_transportista'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    }, {
      sequelize,
      tableName: 'tarifa',
      modelName: 'Tarifa',
      timestamps: true
    });
  }

  static associate(models: any) {
    this.belongsTo(models.TipoVehiculo, {
      foreignKey: 'id_tipoVehiculo',
      as: 'tipoVehiculo'
    });
    this.belongsTo(models.Carga, {
        foreignKey: 'id_carga',
        as: 'carga'
    });
    this.belongsTo(models.Zona, {
        foreignKey: 'id_zona',
        as: 'zona'
    });
    this.belongsTo(models.Transportista, {
        foreignKey: 'id_transportista',
        as: 'transportista'
    });
    this.hasMany(models.TarifaAdicional, {
      foreignKey: 'id_tarifa'
    });
  }
}