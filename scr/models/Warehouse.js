const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Warehouse = sequelize.define(
  "Warehouse",
  {
    id_almoxarifado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    localizacao: {
      type: DataTypes.STRING,
    },
    capacidade_maxima: {
      type: DataTypes.INTEGER,
    },
    responsavel_id: { // chave estrangeira para User
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id_usuario",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo"),
      defaultValue: "ativo",
    },
  },
  {
    tableName: "Warehouses",
    timestamps: false,
  }
);

// Associação
Warehouse.belongsTo(User, {foreignKey: "responsavel_id", as: "responsavel"});

module.exports = Warehouse;
