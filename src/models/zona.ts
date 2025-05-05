import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ZonaAttributes {
  id_zona: number;
  nombre: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ZonaCreationAttributes = Optional<ZonaAttributes, 'id_zona' | 'createdAt' | 'updatedAt'>;

export class Zona extends Model<ZonaAttributes, ZonaCreationAttributes> implements ZonaAttributes {
  public id_zona!: number;
  public nombre!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
      timestamps: true
    });
  }
  
  static associate(models: any) {
    this.hasMany(models.Tarifa, {
      foreignKey: 'id_zona'
    });
  }

  toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
}