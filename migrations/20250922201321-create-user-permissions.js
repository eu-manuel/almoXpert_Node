"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserPermissions", {
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users", // nome da tabela de usuários
          key: "id_usuario",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_permissao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Permissions", // nome da tabela de permissões
          key: "id_permissao",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserPermissions");
  },
};
