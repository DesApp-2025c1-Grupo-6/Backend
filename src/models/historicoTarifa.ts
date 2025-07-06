import { DataTypes, Sequelize, Optional } from 'sequelize';
import { BaseModel } from './BaseModel';

interface Cambios {
  [clave: string]: {
    anterior: any;
    nuevo: any;
  };
}

export interface HistoricoTarifaAttributes {
  id: number;
  idTarifa: number;
  fecha: Date;
  data: object;
  accion: 'CREACION' | 'MODIFICACION' | 'ELIMINACION';
  cambios?: Cambios | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type HistoricoTarifaCreationAttributes = Optional<HistoricoTarifaAttributes, 'id' | 'cambios' | 'createdAt' | 'updatedAt'>;

export class HistoricoTarifa extends BaseModel<HistoricoTarifaAttributes, HistoricoTarifaCreationAttributes> implements HistoricoTarifaAttributes {
  public id!: number;
  public idTarifa!: number;
  public fecha!: Date;
  public data!: object;
  public accion!: 'CREACION' | 'MODIFICACION' | 'ELIMINACION';
  public cambios!: Cambios | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  // Esto es para el Front
  get idField(): string {
    return 'id_adicional';
  }
  protected getFieldOrder(): string[] {
    return ['tipo', 'costo_default'];
  }


  static initModel(sequelize: Sequelize): typeof HistoricoTarifa {
    HistoricoTarifa.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idTarifa: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        data: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        accion: {
          type: DataTypes.ENUM('CREACION' , 'MODIFICACION' , 'ELIMINACION'),
          allowNull: false,
        },
        cambios: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'historicoTarifa',
        modelName: 'HistoricoTarifa',
        timestamps: true
      }
    );

    return HistoricoTarifa;
  }
}