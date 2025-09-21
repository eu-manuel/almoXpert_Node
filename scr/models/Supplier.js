// models/supplier.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // ajuste o caminho do seu sequelize

const Supplier = sequelize.define("Supplier", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CNPJ: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "suppliers",
  timestamps: true, // ou true se quiser createdAt/updatedAt
});

module.exports = Supplier;
