'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Itens', {
      id_item: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      codigo_interno: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      unidade_medida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estoque_minimo: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      estoque_maximo: {
        type: Sequelize.INTEGER,
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'ativo',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('itens');
  },
};
