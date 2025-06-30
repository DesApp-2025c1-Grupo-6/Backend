import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface TipoCargaAttributes {
  id_tipo_carga: number;
  descripcion: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type TipoCargaCreationAttributes = Optional<TipoCargaAttributes, 'id_tipo_carga' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class TipoCarga extends BaseModel<TipoCargaAttributes, TipoCargaCreationAttributes> implements TipoCargaAttributes {
  public id_tipo_carga!: number;
  public descripcion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_tipo_carga';
  }
  protected getFieldOrder(): string[] {
    return ['descripcion'];
  }


  static initModel(sequelize: Sequelize): typeof TipoCarga {
    return TipoCarga.init({
      id_tipo_carga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'tipo_carga',
      modelName: 'TipoCarga',
      timestamps: true,
      paranoid: true
    });
  }

  static associate(models: any) {
    this.hasMany(models.Carga, {
      foreignKey: 'id_tipo_carga',
      as: 'cargas'
    });
  }
}