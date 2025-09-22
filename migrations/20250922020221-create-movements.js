"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movements", {
      id_movimentacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM("entrada", "saida", "transferencia", "ajuste"),
        allowNull: false
      },
      data_movimentacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      observacao: {
        type: Sequelize.STRING
      },
      id_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Items", // tabela de Item
          key: "id_item"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      id_almoxarifado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Warehouses", // tabela de Warehouse
          key: "id_almoxarifado"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // tabela de User
          key: "id_usuario"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movements");
  }
};
