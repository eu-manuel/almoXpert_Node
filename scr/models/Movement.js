const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Item = require("./Item");
const Warehouse = require("./Warehouse");
const User = require("./User");

const Movement = sequelize.define("Movement", {
  id_movimentacao: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  tipo: { 
    type: DataTypes.ENUM("entrada", "saida", "transferencia", "ajuste"),
    allowNull: false 
  },
  data_movimentacao: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  quantidade: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  observacao: { 
    type: DataTypes.STRING 
  },
  id_item: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: "id_item"
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
  },
  id_almoxarifado: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Warehouse,
      key: "id_almoxarifado"
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
  },
  id_usuario: { 
    type: DataTypes.INTEGER,
    allowNull: true, // Permite NULL para SET NULL funcionar
    references: {
      model: User,
      key: "id_usuario"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
}, {
  tableName: "Movements",
  timestamps: false
});

// Associações
Movement.belongsTo(Item, { foreignKey: "id_item" });
Movement.belongsTo(Warehouse, { foreignKey: "id_almoxarifado" });
Movement.belongsTo(User, { foreignKey: "id_usuario" });

module.exports = Movement;
