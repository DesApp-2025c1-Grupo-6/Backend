"use strict";

import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable("adicional", {
      id_adicional: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      costo_default: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable("adicional");
  },
};
