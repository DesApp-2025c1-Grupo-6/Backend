'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('tarifaAdicional', {
      id_tarifaAdicional: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      costo_personalizado: {
        type: DataTypes.DECIMAL(8, 2)
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

    await queryInterface.addIndex('tarifaAdicional', ['id_tarifa', 'id_adicional'], {
      unique: true,
      name: 'unique_tarifa_adicional'
    });
  },
  
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('tarifaAdicional');
  }
};