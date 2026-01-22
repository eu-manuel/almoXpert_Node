const Supplier = require('../models/Supplier');

// Criar fornecedor
exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar fornecedores
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar fornecedor por ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier)
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar fornecedor
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier)
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    await supplier.update(req.body);
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar fornecedor
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier)
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    await supplier.destroy();
    res.json({ message: 'Fornecedor removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
