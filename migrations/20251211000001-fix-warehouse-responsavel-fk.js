'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover coluna antiga (string)
    await queryInterface.removeColumn('Warehouses', 'responsavel');
    
    // Adicionar coluna nova (FK para User)
    await queryInterface.addColumn('Warehouses', 'responsavel_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id_usuario'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverter: remover FK e adicionar string
    await queryInterface.removeColumn('Warehouses', 'responsavel_id');
    await queryInterface.addColumn('Warehouses', 'responsavel', {
      type: Sequelize.STRING
    });
  }
};
