"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ItemSuppliers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Items", // nome da tabela de itens
          key: "id_item", // chave primária do Item
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Suppliers", // nome da tabela de suppliers
          key: "id", // chave primária do Supplier
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      prazo_entrega: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ItemSuppliers");
  },
};
