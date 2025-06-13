import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface AdicionalAttributes {
  id_adicional: number;
  tipo: string;
  costo_default: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdicionalCreationAttributes = Optional<AdicionalAttributes, 'id_adicional' | 'createdAt' | 'updatedAt'>;

export class Adicional extends BaseModel<AdicionalAttributes, AdicionalCreationAttributes> implements AdicionalAttributes {
  public id_adicional!: number;
  public tipo!: string;
  public costo_default!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_adicional';
  }
  protected getFieldOrder(): string[] {
    return ['tipo', 'costo_default'];
  }


  static initModel(sequelize: Sequelize): typeof Adicional {
    return Adicional.init({
      id_adicional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      costo_default: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'adicional',
      modelName: 'Adicional',
      timestamps: true
    });
  }

  static associate(models: any) {
    this.hasMany(models.TarifaAdicional, {
      foreignKey: 'id_adicional'
    });
  }
}