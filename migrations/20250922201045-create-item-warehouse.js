"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ItemWarehouses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Items", // tabela referenciada
          key: "id_item",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_almoxarifado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Warehouses", // tabela referenciada
          key: "id_almoxarifado",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      data_entrada: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      data_saida: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ItemWarehouses");
  },
};
