'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouses', {
      id_almoxarifado: {
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
      localizacao: {
        type: Sequelize.STRING,
      },
      capacidade_maxima: {
        type: Sequelize.INTEGER,
      },
      responsavel: {
        type: Sequelize.STRING,
      },
      /*telefone_contato: {
        type: Sequelize.STRING,
      },
      email_contato: {
        type: Sequelize.STRING,
      },*/
      status: {
        type: Sequelize.ENUM('ativo', 'inativo'),
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
    await queryInterface.dropTable('warehouses');
  },
};
