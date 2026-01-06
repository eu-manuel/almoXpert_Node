const Warehouse = require("../models/Warehouse");
const User = require("../models/User");

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
    const warehouse = await Warehouse.create(req.body);
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

// Deletar almoxarifado
exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) return res.status(404).json({ error: "Almoxarifado não encontrado" });
    await warehouse.destroy();
    res.json({ message: "Almoxarifado removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
