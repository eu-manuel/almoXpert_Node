// models/UserPermission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Permission = require('./Permission');

const UserPermission = sequelize.define(
  'UserPermission',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id_usuario',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    id_permissao: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
        key: 'id_permissao',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  },
  {
    tableName: 'UserPermissions',
    timestamps: false,
  }
);

// Associações muitos-para-muitos
User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: 'id_usuario',
  otherKey: 'id_permissao',
});
Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: 'id_permissao',
  otherKey: 'id_usuario',
});

module.exports = UserPermission;
