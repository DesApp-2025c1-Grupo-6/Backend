import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface TarifaAdicionalAttributes {
  id_tarifaAdicional: number;
  costo_personalizado: number | null;
  id_tarifa: number;
  id_adicional: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TarifaAdicionalCreationAttributes = Optional<TarifaAdicionalAttributes, 'id_tarifaAdicional' | 'createdAt' | 'updatedAt'>;

export class TarifaAdicional extends BaseModel<TarifaAdicionalAttributes, TarifaAdicionalCreationAttributes> implements TarifaAdicionalAttributes {
  public id_tarifaAdicional!: number;
  public costo_personalizado!: number;
  public id_tarifa!: number;
  public id_adicional!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_tarifaAdicional';
  }
  protected getFieldOrder(): string[] {
    return ['costo_personalizado', 'id_tarifa', 'id_adicional']; 
  }


  static initModel(sequelize: Sequelize): typeof TarifaAdicional {
    return TarifaAdicional.init({
      id_tarifaAdicional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      costo_personalizado: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
      },
      id_tarifa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tarifa',
          key: 'id_tarifa'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_adicional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'adicional',
          key: 'id_adicional'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    }, {
      sequelize,
      tableName: 'tarifaAdicional',
      modelName: 'TarifaAdicional',
      timestamps: true,
      indexes: [ 
        {
          unique: true,
          fields: ['id_tarifa', 'id_adicional'],
          name: 'unique_tarifa_adicional'
        }
      ]
    });
  }

  static associate(models: any) {
    this.belongsTo(models.Tarifa, {
      foreignKey: 'id_tarifa',
      as: 'tarifa'
    });
    this.belongsTo(models.Adicional, {
        foreignKey: 'id_adicional',
        as: 'adicional'
    })
  }
}