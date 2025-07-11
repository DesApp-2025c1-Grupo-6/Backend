'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('HistoricoTarifa', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idTarifa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tarifa', // nombre de la tabla original
          key: 'id_tarifa',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: DataTypes.ENUM('CREACION', 'MODIFICACION', 'ELIMINACION'),
        allowNull: false,
      },
      cambios: {
        type: DataTypes.JSON, // Solo se usa si accion = 'modificacion'
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
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('HistoricoTarifa');
  },
};