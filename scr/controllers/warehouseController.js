const Warehouse = require("../models/Warehouse");
const User = require("../models/User");
const Movement = require("../models/Movement");
const ItemWarehouse = require("../models/ItemWarehouse");
const sequelize = require("../config/db");

// Listar almoxarifados do usuário logado (responsável)
exports.getMyWarehouses = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário extraído do token JWT
    const warehouses = await Warehouse.findAll({
      where: { responsavel_id: userId },
      include: [{ model: User, as: "responsavel", attributes: ["id_usuario", "nome", "email"] }]
    });
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar almoxarifado
exports.createWarehouse = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário extraído do token JWT
    const warehouse = await Warehouse.create({
      ...req.body,
      responsavel_id: userId // Define o usuário logado como responsável
    });
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os almoxarifados
exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar almoxarifado por ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ error: "Almoxarifado não encontrado" });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar almoxarifado
exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ error: "Almoxarifado não encontrado" });
    await warehouse.update(req.body);
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar almoxarifado (com exclusão em cascata - apenas admin)
exports.deleteWarehouse = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      await transaction.rollback();
      return res.status(404).json({ error: "Almoxarifado não encontrado" });
    }

    // Exclusão em cascata: primeiro remove os vínculos
    const movementsDeleted = await Movement.destroy({ 
      where: { id_almoxarifado: id },
      transaction 
    });
    
    const itemsDeleted = await ItemWarehouse.destroy({ 
      where: { id_almoxarifado: id },
      transaction 
    });

    // Depois remove o almoxarifado
    await warehouse.destroy({ transaction });
    
    await transaction.commit();
    
    res.json({ 
      message: "Almoxarifado removido com sucesso",
      deletedLinks: {
        movements: movementsDeleted,
        items: itemsDeleted
      }
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};

// Obter estatísticas do almoxarifado (vínculos)
exports.getWarehouseStats = async (req, res) => {
  try {
    const { id } = req.params;
    
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      return res.status(404).json({ error: "Almoxarifado não encontrado" });
    }

    const movementsCount = await Movement.count({ 
      where: { id_almoxarifado: id } 
    });
    
    const itemsCount = await ItemWarehouse.count({ 
      where: { id_almoxarifado: id } 
    });

    res.json({ 
      id_almoxarifado: id,
      nome: warehouse.nome,
      movementsCount, 
      itemsCount,
      hasLinkedData: movementsCount > 0 || itemsCount > 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
