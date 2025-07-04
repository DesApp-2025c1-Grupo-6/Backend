import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface TransportistaAttributes {
  id_transportista: number;
  nombre: string;
  telefono: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type TransportistaCreationAttributes = Optional<TransportistaAttributes, 'id_transportista' | 'email' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class Transportista extends BaseModel<TransportistaAttributes, TransportistaCreationAttributes> implements TransportistaAttributes {
  public id_transportista!: number;
  public nombre!: string;
  public telefono!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_transportista';
  }
  protected getFieldOrder(): string[] {
    return ['nombre'];
  }


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
      },
      telefono: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'transportista',
      modelName: 'Transportista',
      timestamps: true,
      paranoid: true
    });
  }

  static associate(models: any) {
    this.hasMany(models.Tarifa, {
      foreignKey: 'id_transportista'
    });
  }
}