const {
  itemSupplierCreateSchema,
  itemSupplierUpdateSchema,
} = require('../schemas/itemSupplierSchemas');

const validateItemSupplierCreate = async (req, res, next) => {
  try {
    await itemSupplierCreateSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors,
      });
    }
    next(error);
  }
};

const validateItemSupplierUpdate = async (req, res, next) => {
  try {
    await itemSupplierUpdateSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors,
      });
    }
    next(error);
  }
};

module.exports = {
  validateItemSupplierCreate,
  validateItemSupplierUpdate,
};
