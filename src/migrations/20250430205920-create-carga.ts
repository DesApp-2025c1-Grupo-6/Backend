'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('carga', {
      id_carga: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      peso: {
        type: DataTypes.DECIMAL
      },
      volumen: {
        type: DataTypes.DECIMAL
      },
      requisitos_especiales: {
        type: DataTypes.STRING
      },
      id_tipo_carga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'tipo_carga', 
        key: 'id_tipo_carga'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('carga');
  }
};