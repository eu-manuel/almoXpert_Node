const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Warehouse = sequelize.define("Warehouse", {
  id_almoxarifado: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  descricao: { 
    type: DataTypes.STRING 
  },
  localizacao: { 
    type: DataTypes.STRING 
  },
  capacidade_maxima: { 
    type: DataTypes.INTEGER 
  },
  responsavel: { 
    type: DataTypes.STRING 
  },
  telefone_contato: { 
    type: DataTypes.STRING 
  },
  email_contato: { 
    type: DataTypes.STRING 
  },
  status: { 
    type: DataTypes.ENUM("ativo", "inativo"), 
    defaultValue: "ativo" 
  }
});

module.exports = Warehouse;
