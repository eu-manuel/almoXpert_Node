// models/Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Permission = sequelize.define(
  'Permission',
  {
    id_permissao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // cada permissão deve ser única
    },
    descricao: {
      type: DataTypes.STRING, // explicação do que a permissão faz
    },
  },
  {
    tableName: 'Permissions',
    timestamps: false,
  }
);

module.exports = Permission;
