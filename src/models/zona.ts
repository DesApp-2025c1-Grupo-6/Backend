import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface ZonaAttributes {
  id_zona: number;
  nombre: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type ZonaCreationAttributes = Optional<ZonaAttributes, 'id_zona' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class Zona extends BaseModel<ZonaAttributes, ZonaCreationAttributes> implements ZonaAttributes {
  public id_zona!: number;
  public nombre!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  
  // Esto es para el Front
  get idField(): string {
    return 'id_zona';
  }
  protected getFieldOrder(): string[] {
    return ['nombre'];
  }
  

  static initModel(sequelize: Sequelize): typeof Zona {
    return Zona.init({
      id_zona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'zona',
      modelName: 'Zona',
      timestamps: true,
      paranoid: true
    });
  }
  
  static associate(models: any) {
    this.hasMany(models.Tarifa, {
      foreignKey: 'id_zona'
    });
  }
}