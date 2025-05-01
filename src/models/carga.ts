import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface CargaAttributes {
  id: number;
  peso: number;
  volumen: number;
  requisitos_especiales: string;
  id_tipo_carga: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type CargaCreationAttributes = Optional<CargaAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Carga extends Model<CargaAttributes, CargaCreationAttributes> implements CargaAttributes {
  public id!: number;
  public peso!: number;
  public volumen!: number;
  public requisitos_especiales!: string;
  public id_tipo_carga!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Carga {
    return Carga.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      peso: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      },
      volumen: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      },
      requisitos_especiales: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      id_tipo_carga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_carga',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    }, {
      sequelize,
      tableName: 'carga',
      modelName: 'Carga',
      timestamps: true
    });
  }

  static associate(models: any) {
    this.belongsTo(models.TipoCarga, {
      foreignKey: 'id_tipo_carga',
      as: 'tipoCarga'
    });
  }
}