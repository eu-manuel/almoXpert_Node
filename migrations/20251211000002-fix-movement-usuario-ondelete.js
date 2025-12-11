'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro remover a FK existente
    await queryInterface.sequelize.query(
      'ALTER TABLE Movements DROP FOREIGN KEY Movements_ibfk_3;'
    ).catch(() => {});
    
    // Alterar coluna para permitir NULL
    await queryInterface.changeColumn('Movements', 'id_usuario', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    // Adicionar FK com SET NULL
    await queryInterface.sequelize.query(`
      ALTER TABLE Movements 
      ADD CONSTRAINT Movements_id_usuario_fkey 
      FOREIGN KEY (id_usuario) REFERENCES Users(id_usuario) 
      ON UPDATE CASCADE ON DELETE SET NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE Movements DROP FOREIGN KEY Movements_id_usuario_fkey;'
    ).catch(() => {});
    
    await queryInterface.changeColumn('Movements', 'id_usuario', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    
    await queryInterface.sequelize.query(`
      ALTER TABLE Movements 
      ADD CONSTRAINT Movements_ibfk_3 
      FOREIGN KEY (id_usuario) REFERENCES Users(id_usuario) 
      ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
  }
};
