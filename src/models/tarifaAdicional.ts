import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TarifaAdicionalAttributes {
  id_tarifaAdicional: number;
  costo_personalizado: number;
  id_tarifa: number;
  id_adicional: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TarifaAdicionalCreationAttributes = Optional<TarifaAdicionalAttributes, 'id_tarifaAdicional' | 'createdAt' | 'updatedAt'>;

export class TarifaAdicional extends Model<TarifaAdicionalAttributes, TarifaAdicionalCreationAttributes> implements TarifaAdicionalAttributes {
  public id_tarifaAdicional!: number;
  public costo_personalizado!: number;
  public id_tarifa!: number;
  public id_adicional!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof TarifaAdicional {
    return TarifaAdicional.init({
      id_tarifaAdicional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      costo_personalizado: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
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
      timestamps: true
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

  toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
}