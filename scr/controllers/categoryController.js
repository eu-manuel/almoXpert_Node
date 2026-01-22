const Category = require('../models/Category');
const Item = require('../models/Item');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Item });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Item });
    if (!category)
      return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ error: 'Categoria não encontrada' });
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ error: 'Categoria não encontrada' });
    await category.destroy();
    res.json({ message: 'Categoria removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Relacionar um item a uma categoria
exports.addItemToCategory = async (req, res) => {
  try {
    const { itemId, categoryId } = req.body;
    const category = await Category.findByPk(categoryId);
    const item = await Item.findByPk(itemId);

    if (!category || !item) {
      return res
        .status(404)
        .json({ error: 'Item ou Categoria não encontrados' });
    }

    await category.addItem(item);
    res.json({ message: 'Item associado à categoria com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
