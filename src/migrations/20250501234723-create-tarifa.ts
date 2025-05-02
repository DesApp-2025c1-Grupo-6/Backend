'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('tarifa', {
      id_tarifa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      valor_base: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('tarifa');
  }
};