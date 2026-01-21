const ItemSupplier = require('../models/ItemSupplier');

// Criar associação item ↔ fornecedor
exports.createItemSupplier = async (req, res) => {
  try {
    const relation = await ItemSupplier.create(req.body);
    res.status(201).json(relation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todas as associações
exports.getItemSuppliers = async (req, res) => {
  try {
    const relations = await ItemSupplier.findAll();
    res.json(relations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar associação por ID
exports.getItemSupplierById = async (req, res) => {
  try {
    const relation = await ItemSupplier.findByPk(req.params.id);
    if (!relation)
      return res.status(404).json({ error: 'Associação não encontrada' });
    res.json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar associação
exports.updateItemSupplier = async (req, res) => {
  try {
    const relation = await ItemSupplier.findByPk(req.params.id);
    if (!relation)
      return res.status(404).json({ error: 'Associação não encontrada' });
    await relation.update(req.body);
    res.json(relation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remover associação
exports.deleteItemSupplier = async (req, res) => {
  try {
    const relation = await ItemSupplier.findByPk(req.params.id);
    if (!relation)
      return res.status(404).json({ error: 'Associação não encontrada' });
    await relation.destroy();
    res.json({ message: 'Associação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
